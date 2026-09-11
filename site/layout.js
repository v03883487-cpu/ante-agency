// Shared header/footer. Included synchronously where the markup should appear:
//   <script src="layout.js" data-part="header"></script>
// Pages set <body data-page="..."> ("home" for index.html).
(function () {
  var script = document.currentScript;
  var page = document.body.getAttribute('data-page') || 'home';
  var home = page === 'home';
  var H = home ? '' : 'index.html';
  var TOP = home ? '#top' : 'index.html';

  var arrow = '<svg class="i" aria-hidden="true"><use href="#i-arrow"/></svg>';
  var chev = '<svg class="i chev" aria-hidden="true"><use href="#i-chevron"/></svg>';

  var groups = [
    { id: 'services', key: 'nav.services', label: 'Services', pages: ['analytics', 'content', 'partners'], section: 'services', items: [
      { href: H + '#services', key: 'ft.s1', label: 'Influencer Campaigns' },
      { href: 'analytics.html', key: 'ft.s3', label: 'Performance Analytics' },
      { href: 'content.html', key: 'ft.s6', label: 'Creative Strategy' },
      { href: 'partners.html', key: 'nav.partners', label: 'Partner program' }
    ] },
    { id: 'creators', key: 'nav.creators', label: 'Creators', pages: ['creators'], section: 'creators', items: [
      { href: H + '#creators', key: 'nav.top', label: 'Top creators' },
      { href: 'creators.html', key: 'ft.r3', label: 'Creator Guidelines' }
    ] },
    { id: 'cases', key: 'nav.cases', label: 'Cases', href: H + '#cases', section: 'cases' },
    { id: 'about', key: 'nav.about', label: 'About', pages: ['about', 'blog'], items: [
      { href: 'about.html', key: 'nav.company', label: 'About the company' },
      { href: 'blog.html', key: 'ft.r1', label: 'Blog' },
      { href: 'blog.html#insights', key: 'ft.r2', label: 'Insights' }
    ] },
    { id: 'contact', key: 'nav.contact', label: 'Contact', href: H + '#contact', section: 'contact' }
  ];

  function langPicker(extra) {
    return '<div class="lang ' + (extra || '') + '" data-lang>' +
      '<button class="lang-pill" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Language: English">' +
      '<svg class="i" aria-hidden="true"><use href="#i-globe"/></svg><span data-lang-label>EN</span>' + chev + '</button>' +
      '<ul class="lang-menu" role="listbox" hidden>' +
      '<li role="option" data-code="en" lang="en" aria-selected="true">English</li>' +
      '<li role="option" data-code="es" lang="es">Español</li>' +
      '<li role="option" data-code="pt" lang="pt">Português</li>' +
      '<li role="option" data-code="de" lang="de">Deutsch</li>' +
      '<li role="option" data-code="ru" lang="ru">Русский</li></ul></div>';
  }

  function desktopNav() {
    return groups.map(function (g) {
      var current = g.pages && g.pages.indexOf(page) !== -1 ? ' is-current' : '';
      var sec = g.section && home ? ' data-section="' + g.section + '"' : '';
      if (!g.items) {
        return '<a class="nav-link' + current + '" href="' + g.href + '"' + sec + ' data-i18n="' + g.key + '">' + g.label + '</a>';
      }
      return '<div class="nav-item' + current + '"' + sec + '>' +
        '<button class="nav-link nav-trigger" type="button" aria-expanded="false" aria-controls="sub-' + g.id + '">' +
        '<span data-i18n="' + g.key + '">' + g.label + '</span>' + chev + '</button>' +
        '<div class="nav-sub" id="sub-' + g.id + '">' +
        g.items.map(function (it) { return '<a href="' + it.href + '" data-i18n="' + it.key + '">' + it.label + '</a>'; }).join('') +
        '</div></div>';
    }).join('');
  }

  function mobileNav() {
    return groups.map(function (g) {
      if (!g.items) return '<a class="m-link" href="' + g.href + '" data-i18n="' + g.key + '">' + g.label + '</a>';
      return '<div class="m-group"><span class="m-label" data-i18n="' + g.key + '">' + g.label + '</span>' +
        g.items.map(function (it) { return '<a href="' + it.href + '" data-i18n="' + it.key + '">' + it.label + '</a>'; }).join('') +
        '</div>';
    }).join('');
  }

  var sprite =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
    '<symbol id="i-arrow" viewBox="0 0 16 16"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-arrow-left" viewBox="0 0 16 16"><path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 16 16"><path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-globe" viewBox="0 0 20 20"><g fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="10" cy="10" r="7.5"/><path d="M2.5 10h15M10 2.5c2.2 2.1 3.2 4.6 3.2 7.5s-1 5.4-3.2 7.5c-2.2-2.1-3.2-4.6-3.2-7.5s1-5.4 3.2-7.5Z"/></g></symbol>' +
    '<symbol id="i-chevron" viewBox="0 0 12 12"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '</svg>';

  var header =
    '<a class="skip-link" href="#main" data-i18n="skip">Skip to content</a>' +
    '<div class="page-noise" aria-hidden="true"></div>' + sprite +
    '<header class="site-header" id="top"><div class="nav-shell">' +
    '<a class="brand" href="' + TOP + '" aria-label="Antefluence — back to top" data-i18n-aria="a11y.top">' +
    '<img src="assets/web/logo-mark.webp" alt="" class="brand-mark" width="247" height="256" /><span>Antefluence</span></a>' +
    '<div class="nav-center"><nav class="desktop-nav" aria-label="Primary">' + desktopNav() + '</nav>' + langPicker() + '</div>' +
    '<div class="nav-actions">' +
    '<a class="btn btn-dark btn-nav" href="' + H + '#contact"><span data-i18n="cta.work">Work With Us</span> ' + arrow + '</a>' +
    '<button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span><span></span></button>' +
    '</div></div>' +
    '<nav class="mobile-menu" id="mobile-menu" aria-label="Mobile" hidden>' + mobileNav() +
    langPicker('mobile-lang') +
    '<a class="btn btn-dark" href="' + H + '#contact"><span data-i18n="cta.work">Work With Us</span> ' + arrow + '</a>' +
    '</nav></header>';

  function col(id, key, label, links) {
    return '<nav aria-labelledby="ft-' + id + '"><h3 id="ft-' + id + '" data-i18n="' + key + '">' + label + '</h3>' +
      links.map(function (l) { return '<a href="' + l[0] + '" data-i18n="' + l[1] + '">' + l[2] + '</a>'; }).join('') + '</nav>';
  }

  var footer =
    '<footer class="site-footer"><div class="container footer-grid">' +
    '<div class="footer-brand"><a class="brand" href="' + TOP + '" aria-label="Antefluence — back to top" data-i18n-aria="a11y.top">' +
    '<img src="assets/web/logo-mark.webp" alt="" class="brand-mark" width="247" height="256" /><span>Antefluence</span></a>' +
    '<p data-i18n-html="ft.tagline.html">Creator-led growth for a bigger game.<br>Global. Strategic. Human.</p>' +
    '<div class="socials">' +
    '<a href="#" aria-label="Discord"><img src="assets/icons/social-discord.webp" alt="" /></a>' +
    '<a href="#" aria-label="X (Twitter)"><img src="assets/icons/social-x.webp" alt="" /></a>' +
    '<a href="#" aria-label="YouTube"><img src="assets/icons/social-youtube.webp" alt="" /></a>' +
    '<a href="#" aria-label="LinkedIn"><img src="assets/icons/social-linkedin.webp" alt="" /></a>' +
    '</div></div>' +
    col('services', 'ft.services', 'Services', [
      [H + '#services', 'ft.s1', 'Influencer Campaigns'],
      ['analytics.html', 'ft.s3', 'Performance Analytics'],
      ['content.html', 'ft.s6', 'Creative Strategy'],
      ['partners.html', 'nav.partners', 'Partner program']
    ]) +
    col('company', 'ft.company', 'Company', [
      ['about.html', 'ft.c1', 'About Us'],
      [H + '#creators', 'ft.c2', 'Our Creators'],
      [H + '#cases', 'ft.c3', 'Case Studies'],
      [H + '#contact', 'ft.c4', 'Careers'],
      [H + '#contact', 'ft.c5', 'Contact']
    ]) +
    col('resources', 'ft.resources', 'Resources', [
      ['blog.html', 'ft.r1', 'Blog'],
      ['blog.html#insights', 'ft.r2', 'Insights'],
      ['creators.html', 'ft.r3', 'Creator Guidelines'],
      ['privacy.html', 'ft.r5', 'Privacy Policy'],
      ['terms.html', 'ft.r6', 'Terms of Service']
    ]) +
    '<div class="footer-meta">' + langPicker('lang-up') +
    '<p>© <span data-year>2026</span> Antefluence.<br><span data-i18n="ft.rights">All rights reserved.</span></p></div>' +
    '</div></footer>';

  script.insertAdjacentHTML('beforebegin', script.getAttribute('data-part') === 'footer' ? footer : header);
})();
