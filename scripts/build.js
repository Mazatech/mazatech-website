'use strict';

const fs = require('node:fs');
const { copyFile, mkdir, readdir, readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');
const { spawn } = require('node:child_process');
const sass = require('sass');
const csso = require('csso');
const terser = require('terser');

process.chdir(path.resolve(__dirname, '..'));

async function sourceFiles(directory, extensions) {
  const entries = await readdir(directory, { recursive: true, withFileTypes: true });
  return entries
    .filter(entry => entry.isFile() && extensions.includes(path.extname(entry.name)))
    .map(entry => path.join(entry.parentPath, entry.name))
    .sort();
}

async function writeAsset(filename, contents) {
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, contents);
}

async function css() {
  const files = await sourceFiles('src/styles', ['.scss']);
  for (const filename of files.filter(file => !path.basename(file).startsWith('_'))) {
    const compiled = await sass.compileAsync(filename);
    const destination = path.join('assets/css', path.relative('src/styles', filename))
      .replace(/\.scss$/, '.css');
    await writeAsset(destination, csso.minify(compiled.css).css);
  }
}

async function js() {
  const files = await sourceFiles('src/js', ['.js']);
  const sources = Object.fromEntries(await Promise.all(files.map(async filename =>
    [filename, await readFile(filename, 'utf8')]
  )));
  const minified = await terser.minify(sources);
  await writeAsset('assets/js/main.js', minified.code);
}

async function copyAssets(source, destination, extensions) {
  for (const filename of await sourceFiles(source, extensions)) {
    const target = path.join(destination, path.relative(source, filename));
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(filename, target);
  }
}

function fonts() {
  return copyAssets('src/fonts', 'assets/fonts', ['.ttf', '.woff', '.woff2']);
}

// Copy image bytes unchanged; native image optimizers are not needed for this site.
function images() {
  return copyAssets('src/img', 'assets/images', ['.jpg', '.png', '.gif']);
}

function svg() {
  return copyAssets('src/img', 'assets/images', ['.svg']);
}

function buildNoimg() {
  return Promise.all([css(), js(), fonts()]);
}

function build() {
  return Promise.all([buildNoimg(), images(), svg()]);
}

function jekyll(args) {
  return new Promise((resolve, reject) => {
    const child = spawn('bundle', ['exec', 'jekyll', ...args], { stdio: 'inherit' });
    const interrupt = () => child.kill('SIGINT');
    const terminate = () => child.kill('SIGTERM');
    process.once('SIGINT', interrupt);
    process.once('SIGTERM', terminate);
    child.once('error', reject);
    child.once('close', (code, signal) => {
      process.removeListener('SIGINT', interrupt);
      process.removeListener('SIGTERM', terminate);
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Jekyll failed (${signal || `exit ${code}`})`));
      }
    });
  });
}

async function serve() {
  await buildNoimg();

  // Serialize asset rebuilds; Jekyll watches the generated assets and rebuilds pages.
  let pending = Promise.resolve();
  let timer;
  const changed = new Set();
  const assetTasks = { styles: css, js, fonts, img: async () => {
    await images();
    await svg();
  } };
  const watcher = fs.watch('src', { recursive: true }, (event, filename) => {
    const directory = filename && filename.toString().split(path.sep)[0];
    if (!assetTasks[directory]) return;
    changed.add(directory);
    clearTimeout(timer);
    timer = setTimeout(() => {
      const tasks = [...changed].map(name => assetTasks[name]);
      changed.clear();
      pending = pending.then(async () => {
        for (const task of tasks) await task();
      }).catch(error => console.error('Asset rebuild failed:', error));
    }, 75);
  });

  try {
    // Keep the production CSP in previews: Jekyll LiveReload injects inline scripts.
    await jekyll(['serve', '--watch', '--host', '127.0.0.1']);
  } finally {
    watcher.close();
    clearTimeout(timer);
    await pending;
  }
}

const tasks = { build, buildNoimg, css, js, fonts, images, svg, serve };
const task = process.argv[2] || 'serve';
if (!Object.hasOwn(tasks, task)) {
  console.error(`Unknown task: ${task}`);
  process.exitCode = 1;
} else {
  tasks[task]().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
