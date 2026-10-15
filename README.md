# Mazatech 

2D vector graphics engines company - [Mazatech](https://www.mazatech.com)

The creators of:

* [AmanithVG](https://www.amanithvg.com): a blazing fast OpenVG 1.1 
* [AmanithSVG](https://www.amanithsvg.com): SVG rendering engine on top of OpenVG API

## AmanithVG <a class="jumptarget" name="amanithvg_section"></a>

[AmanithVG](https://www.amanithvg.com) is a 2D vector graphics library that implements [OpenVG 1.1](https://www.khronos.org/openvg/): the standard, royalty-free, cross-platform API for hardware accelerated 2D vector and raster graphics, created by [Khronos group](https://www.khronos.org); AmanithVG comes with two different rendering backends: SRE (pure software) and GLE (OpenGL\|ES aided) in order to provide the highest rendering quality at top speed on any device.  
The library is witten in ANSI C and depends on a very limited set of standard libc functions, that can be easily mapped to custom functions, to be portable even on bare metal platforms.

The AmanithVG SDK includes:

* Library (bin) for:
	* Desktop (Win, OS X, Linux) on: x86, x86\_64
	* Mobile (iOS, Android, Linux, QNX) on: arm, armv7, aarch64, ppc, mips
* Tiger example (bin+src) for:
	* Desktop (Win, OS X, Linux) on: x86, x86\_64
	* Mobile (iOS, Android, Linux, QNX) on: arm, armv7, aarch64, ppc, mips
* Documentation

Download [AmanithVG evaluation SDK](https://github.com/Mazatech/amanithvg/releases/download/v4.0.0.968/amanithvg_v4_0_0_968_eval.zip) now!

More information at [AmanithVG project page](https://www.amanithvg.com). Interested in licensing? Send us an [eMail](mailto:info@mazatech.com?subject=AmanithVG%20Licensing).

---
  
## AmanithSVG <a class="jumptarget" name="amanithsvg_section"></a>

[AmanithSVG](https://www.amanithsvg.com) is a middleware for reading and rendering [SVG](https://it.wikipedia.org/wiki/Scalable_Vector_Graphics) files, available as a standalone native library and as [Unity plugin](https://www.assetstore.unity3d.com/en/#!/content/19822); AmanithSVG is based on static features of [SVG Tiny 1.2](https://www.w3.org/TR/SVGTiny12/), plus some static features of [SVG Full 1.1](https://www.w3.org/TR/SVG/).  
The library is written in ANSI C++ and depends on AmanithVG SRE for the rendering and [PugiXML](https://pugixml.org) or [TinyXML-2](https://www.grinninglizard.com/tinyxml2/) for XML parsing.

The AmanithVG SDK includes:

* Library (bin) for:
	* Desktop (Win, OS X, Linux) on: x86, x86\_64
	* Mobile (iOS, Android, Linux, QNX) on: arm, armv7, aarch64, ppc, mips
* SVG Player example (bin+src) for:
	* Desktop (Win, OS X, Linux) on: x86, x86\_64
	* Mobile (iOS, Android, Linux, QNX) on: arm, armv7, aarch64, ppc, mips
* Documentation

Download [AmanithSVG Evaluation SDK](https://github.com/Mazatech/amanithsvg/releases/download/v1.0.0.336/amanithsvg_v1_0_0_336_eval.zip) now!

More information at [AmanithSVG project page](https://www.amanithsvg.com). Interested in licensing? Send us an [eMail](mailto:info@mazatech.com?subject=AmanithSVG%20Licensing).

---

## About Us <a class="jumptarget" name="about_section"></a>

Mazatech is an italian company founded in 2005 by a team of young professionals, who have been working together developing technologies for realtime vector graphics since 1998. The company mission is to innovate into 2D vector graphics rendering field, taking advantage also of accelerated 3D chipsets and GPUs. We believe that near future is going to hit this way at all levels: desktop, handheld, mobile. We recognize open standards as being the key, so we actively support standards like OpenVG, SVG, OpenGL, OpenGL ES, Java(FX) among others. Mazatech develops the technology for enabling fast and high quality 2Dvector graphics rendering everywhere.

---

## Contacts <a class="jumptarget" name="contacts_section"></a>

###### Office:  
via Rosario Livatino, 2  
47020 - Longiano (FC)  
Italy  

###### Phone / Fax:  
[(+39) 0547 57435](tel:+39054757435)  

###### Email:  
[info@mazatech.com](mailto:info@mazatech.com)  

###### Social:  
[https://www.facebook.com/mazatechsrl/](https://www.facebook.com/mazatechsrl/)  

## Build and local preview

Use Node.js 22 (see `.nvmrc`), npm 10 or newer, Ruby 4.0.7 and Bundler.
Ruby installations need development headers and a compiler when installing native gems.

```sh
npm ci
bundle install
npm run build
npm run serve
```

`npm run build` compiles the assets and renders Jekyll into `_site/`.
The preview binds only to `127.0.0.1:4000`, watches source files and rebuilds
automatically. Refresh the browser to see changes: inline-script-based LiveReload
is deliberately disabled so the production Content Security Policy remains active.
The existing Sass `@import` syntax emits deprecation warnings; it still builds
with the locked Sass version and does not require changing the page styles.

Individual asset commands: `npm run css`, `npm run js`, `npm run fonts`,
`npm run images`, `npm run svg`. Images and fonts are copied without changing
their source bytes. Gulp, BrowserSync, Node Sass and the Yarn lockfile have been
replaced by a small Node.js runner and a single npm lockfile.

## Security maintenance and deployment

```sh
npm audit
bundle exec bundler-audit check --update
```

Dependabot checks npm, Bundler and GitHub Actions weekly. The Pages workflow
audits both dependency sets, builds assets and Jekyll, and deploys only `master`.
Pull requests build without deployment permissions. Actions are pinned to commit
SHAs, checkout credentials are not persisted, and deployment uses GitHub OIDC.

Before publishing this migration, select **Settings → Pages → Build and deployment
→ Source → GitHub Actions**. The old branch-based GitHub Pages build cannot use
this updated Jekyll toolchain. Keep **Enforce HTTPS** enabled and restrict the
`github-pages` deployment environment to `master`. No production settings or
deployment are changed by building locally.

The pages enforce a CSP that blocks inline executable JavaScript, restricts
external resources, and disables objects, frames, forms and base-URL overrides.
Inline styles remain permitted for the existing layout and particle animation.
Particles.js 2.0.0 is served locally, with its MIT license beside the script,
rather than executing a CDN response. New-window links use `noopener noreferrer`.
Consent is matched by exact cookie name, persists with `SameSite=Lax` and
`Secure` on HTTPS, and gates the existing anonymized analytics loader.

The existing Universal Analytics property has not been migrated or replaced.
The browser smoke check verified consent gating and loader initialization, but
the external `analytics.js` request was refused in the verification environment;
successful collection of analytics is not verified.

### HTTP response headers

GitHub Pages does not support repository-defined response headers. The public
site is behind Cloudflare; configure the following response headers there before
considering infrastructure hardening complete:

```text
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none'
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

The additional CSP header complements the resource policy in the HTML.
`frame-ancestors`, HSTS and `nosniff` cannot be implemented with HTML meta tags.
Do not enable HSTS `includeSubDomains` or preload without first reviewing all
subdomains. These Cloudflare settings are outside this repository.

### Vulnerability disclosure files

The supplied policy is rendered at `/security/`; its wording is unchanged.
`/.well-known/security.txt` and `/security/pgp-key.asc` are copied unchanged,
including the signed contact file. Its expiry is **2027-10-01**: renew and sign it
before that date. Preserve `.well-known` when packaging the Pages artifact.
Build scripts, manifests, lockfiles, dependencies and repository metadata are
excluded from the public site. `_site/` is generated, not versioned.
