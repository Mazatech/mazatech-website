document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('cookies-eu-banner');
  const consent = document.cookie.split(';').map(function (cookie) {
    return cookie.trim();
  }).find(function (cookie) {
    return cookie.startsWith('hasConsent=');
  });
  const cookieOptions = '; Path=/; SameSite=Lax' +
    (window.location.protocol === 'https:' ? '; Secure' : '');

  function saveConsent(value) {
    document.cookie = 'hasConsent=' + value + '; Max-Age=33696000' + cookieOptions;
  }

  function launchAnalytics() {
    const script = document.querySelector('script[data-analytics-id]');
    if (!script || !script.dataset.analyticsId) return;

    window.GoogleAnalyticsObject = 'ga';
    window.ga = window.ga || function () {
      (window.ga.q = window.ga.q || []).push(arguments);
    };
    window.ga.l = Date.now();
    window.ga('create', script.dataset.analyticsId, 'auto', {
      cookieFlags: 'SameSite=Lax' + (window.location.protocol === 'https:' ? ';Secure' : '')
    });
    window.ga('set', 'anonymizeIp', true);
    window.ga('send', 'pageview');
    const analytics = document.createElement('script');
    analytics.async = true;
    analytics.src = 'https://www.google-analytics.com/analytics.js';
    document.head.appendChild(analytics);
  }

  if (/bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)) return;
  if (consent === 'hasConsent=false') return;
  if (consent === 'hasConsent=true') {
    launchAnalytics();
    return;
  }

  banner.style.display = 'block';
  document.getElementById('cookies-eu-more').addEventListener('click', function () {
    document.cookie = 'hasConsent=; Max-Age=0' + cookieOptions;
  });
  document.getElementById('cookies-eu-accept').addEventListener('click', function () {
    saveConsent(true);
    banner.remove();
    launchAnalytics();
  });
  document.getElementById('cookies-eu-reject').addEventListener('click', function () {
    saveConsent(false);
    banner.remove();
    const hostname = window.location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (cookie) {
      const name = cookie.trim().split('=')[0];
      if (!/^(?:__utm[a-z]+|_ga(?:_[\w-]+)?|_gat(?:_[\w-]+)?|_gid)$/.test(name)) return;
      document.cookie = name + '=; Max-Age=0' + cookieOptions;
      document.cookie = name + '=; Max-Age=0' + cookieOptions + '; Domain=' + window.location.hostname;
      document.cookie = name + '=; Max-Age=0' + cookieOptions + '; Domain=' + hostname;
    });
  });
});
