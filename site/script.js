// Set to your CRM / form-backend URL (e.g. Formspree, HubSpot, own API) to deliver leads.
const FORM_ENDPOINT = '';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- i18n ---------- */
const DICT = window.I18N || { en: {} };
const SUPPORTED = Object.keys(DICT);
const LANG_KEY = 'antefluence-lang';
let current = 'en';
const t = key => (DICT[current] && DICT[current][key]) || DICT.en[key] || '';

function detectLang() {
  const param = new URLSearchParams(location.search).get('lang');
  if (param && SUPPORTED.includes(param)) return param;
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch {}
  for (const l of navigator.languages || [navigator.language]) {
    const code = String(l || '').slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(code)) return code;
  }
  return 'en';
}

// English copy for inner pages lives in the HTML itself; it's snapshotted on first run
// and used whenever the current language has no entry for a key.
function translatePage() {
  const apply = (attr, get, set) => $$(`[${attr}]`).forEach(el => {
    const key = el.getAttribute(attr);
    const store = `en_${attr}`;
    if (!(store in el)) el[store] = get(el);
    set(el, t(key) || el[store]);
  });
  apply('data-i18n', el => el.textContent, (el, v) => { el.textContent = v; });
  apply('data-i18n-html', el => el.innerHTML, (el, v) => { el.innerHTML = v; });
  apply('data-i18n-ph', el => el.placeholder, (el, v) => { el.placeholder = v; });
  apply('data-i18n-aria', el => el.getAttribute('aria-label') || '', (el, v) => { el.setAttribute('aria-label', v); });
  $$('.creator-card').forEach(card => {
    const arrow = $('.card-arrow', card);
    if (!arrow) return;
    const name = $('h3', card).textContent;
    arrow.setAttribute('aria-label', arrow.hasAttribute('data-channel') ? `${t('a11y.channel')}: ${name}` : `${t('a11y.book')} ${name}`);
  });
  const pageKey = document.body.dataset.page && document.body.dataset.page !== 'home' ? document.body.dataset.page : '';
  const desc = $('meta[name="description"]');
  if (!('enTitle' in document)) { document.enTitle = document.title; document.enDesc = desc ? desc.content : ''; }
  document.title = (pageKey ? t(`${pageKey}.meta.title`) : t('meta.title')) || document.enTitle;
  if (desc) desc.setAttribute('content', (pageKey ? t(`${pageKey}.meta.desc`) : t('meta.desc')) || document.enDesc);
  document.documentElement.lang = current;
}

/* ---------- Mobile menu ---------- */
const menuButton = $('.menu-button');
const mobileMenu = $('#mobile-menu');
function setMenu(open) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', t(open ? 'a11y.menuClose' : 'a11y.menuOpen'));
  mobileMenu.hidden = !open;
}
if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  $$('a', mobileMenu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', e => {
    if (!mobileMenu.hidden && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) setMenu(false);
  });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
}

/* ---------- Reveal on scroll ---------- */
const revealEls = $$('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

/* ---------- Desktop dropdowns ---------- */
const navItems = $$('.nav-item');
function closeNav(except) {
  navItems.forEach(item => {
    if (item === except) return;
    item.classList.remove('is-open');
    $('.nav-trigger', item).setAttribute('aria-expanded', 'false');
  });
}
navItems.forEach(item => {
  const trigger = $('.nav-trigger', item);
  trigger.addEventListener('click', () => {
    const open = !item.classList.contains('is-open');
    closeNav(item);
    item.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  });
  item.addEventListener('mouseleave', () => {
    if (!item.contains(document.activeElement)) closeNav();
  });
  item.addEventListener('focusout', e => {
    if (!item.contains(e.relatedTarget)) {
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
  $$('.nav-sub a', item).forEach(a => a.addEventListener('click', () => closeNav()));
});
document.addEventListener('click', e => { if (!e.target.closest('.nav-item')) closeNav(); });

/* ---------- Active nav item (home page scrollspy) ---------- */
const spyItems = $$('.desktop-nav [data-section]');
const spySections = spyItems.map(el => document.getElementById(el.dataset.section)).filter(Boolean);
if (spySections.length && 'IntersectionObserver' in window) {
  const setActive = id => spyItems.forEach(el => el.classList.toggle('is-active', el.dataset.section === id));
  const navIo = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  spySections.forEach(s => navIo.observe(s));
  const firstTop = () => Math.min(...spySections.map(s => s.offsetTop));
  const clearAtTop = () => { if (window.scrollY < firstTop() - window.innerHeight / 2) setActive(null); };
  window.addEventListener('scroll', clearAtTop, { passive: true });
  clearAtTop();
}

/* ---------- Creator carousel ---------- */
const track = $('#creator-track');
const [prevBtn, nextBtn] = $$('.carousel-controls button');
function updateCarousel() {
  if (!track || !prevBtn || !nextBtn) return;
  const max = track.scrollWidth - track.clientWidth;
  prevBtn.parentElement.hidden = max <= 2;
  prevBtn.disabled = track.scrollLeft <= 2;
  nextBtn.disabled = track.scrollLeft >= max - 2;
}
if (track && prevBtn && nextBtn) {
  [prevBtn, nextBtn].forEach(btn => btn.addEventListener('click', () => {
    const card = $('.creator-card', track);
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : 300;
    track.scrollBy({ left: Number(btn.dataset.dir) * step, behavior: 'smooth' });
  }));
  track.addEventListener('scroll', updateCarousel, { passive: true });
  window.addEventListener('resize', updateCarousel);
}


/* ---------- Language menu ---------- */
const langs = $$('[data-lang]');
const forms = $$('form.lead-form');

function applyLang(code, { save = false } = {}) {
  if (!SUPPORTED.includes(code)) code = 'en';
  current = code;
  langs.forEach(root => {
    const option = $(`[data-code="${code}"]`, root);
    $$('[role="option"]', root).forEach(o => o.setAttribute('aria-selected', String(o === option)));
    $('[data-lang-label]', root).textContent = code.toUpperCase();
    $('.lang-pill', root).setAttribute('aria-label', `${t('a11y.lang')}: ${option ? option.textContent : code}`);
  });
  translatePage();
  if (menuButton) menuButton.setAttribute('aria-label', t(menuButton.getAttribute('aria-expanded') === 'true' ? 'a11y.menuClose' : 'a11y.menuOpen'));
  forms.forEach(f => {
    if (f.elements.language) f.elements.language.value = code;
    const st = $('.form-status', f);
    if (st && st.dataset.key) st.textContent = t(st.dataset.key);
  });
  if (save) { try { localStorage.setItem(LANG_KEY, code); } catch {} }
  updateCarousel();
  document.dispatchEvent(new CustomEvent('af:lang', { detail: code }));
}
// shared helpers for page-specific scripts (partners.js, apa.js)
window.AF = { t: key => t(key), lang: () => current };

function closeLang(root, focusButton) {
  const btn = $('.lang-pill', root);
  $('.lang-menu', root).hidden = true;
  btn.setAttribute('aria-expanded', 'false');
  if (focusButton) btn.focus();
}

langs.forEach(root => {
  const btn = $('.lang-pill', root);
  const menu = $('.lang-menu', root);
  const options = $$('[role="option"]', menu);
  let focusIndex = 0;
  const setFocus = i => {
    focusIndex = (i + options.length) % options.length;
    options.forEach((o, n) => o.classList.toggle('is-focus', n === focusIndex));
  };
  const choose = option => {
    applyLang(option.dataset.code, { save: true });
    closeLang(root, true);
  };
  btn.addEventListener('click', () => {
    const open = menu.hidden;
    langs.forEach(r => r !== root && closeLang(r));
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    if (open) setFocus(Math.max(0, options.findIndex(o => o.getAttribute('aria-selected') === 'true')));
  });
  btn.addEventListener('keydown', e => {
    if (menu.hidden && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { e.preventDefault(); btn.click(); return; }
    if (menu.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocus(focusIndex + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocus(focusIndex - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(options[focusIndex]); }
    else if (e.key === 'Escape') { e.stopPropagation(); closeLang(root, true); }
    else if (e.key === 'Tab') { closeLang(root); }
  });
  options.forEach((o, n) => {
    o.addEventListener('click', () => choose(o));
    o.addEventListener('mouseenter', () => setFocus(n));
  });
});
document.addEventListener('click', e => langs.forEach(root => { if (!root.contains(e.target)) closeLang(root); }));
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const openItem = navItems.find(i => i.classList.contains('is-open'));
  if (openItem) { closeNav(); $('.nav-trigger', openItem).focus(); return; }
  if (mobileMenu && !mobileMenu.hidden) { setMenu(false); menuButton.focus(); }
});

applyLang(detectLang());

/* ---------- Placeholder links ---------- */
$$('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

/* ---------- Footer year ---------- */
const year = $('[data-year]');
if (year) year.textContent = new Date().getFullYear();

/* ---------- Lead forms ---------- */
forms.forEach(form => {
  const status = $('.form-status', form);
  const button = $('button[type="submit"]', form);
  const fields = $$('input:not([type="hidden"]), textarea', form);
  const setStatus = (key, isError = false) => {
    status.dataset.key = key;
    status.textContent = t(key);
    status.classList.toggle('is-error', isError);
  };
  fields.forEach(f => f.addEventListener('input', () => {
    if (f.checkValidity()) f.removeAttribute('aria-invalid');
  }));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    fields.forEach(f => f.toggleAttribute('aria-invalid', !f.checkValidity()));
    const firstInvalid = fields.find(f => !f.checkValidity());
    if (firstInvalid) {
      setStatus('form.invalid', true);
      firstInvalid.focus();
      return;
    }

    const original = button.innerHTML;
    button.disabled = true;
    button.textContent = t('form.sending');
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      }
      form.reset();
      if (form.elements.language) form.elements.language.value = current;
      button.textContent = t('form.sent');
      setStatus('form.thanks');
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = original;
        const label = $('[data-i18n]', button);
        const v = label && t(label.dataset.i18n);
        if (v) label.textContent = v;
      }, 2600);
    } catch {
      button.disabled = false;
      button.innerHTML = original;
      setStatus('form.error', true);
    }
  });
});

/* ---------- Section exit: the section leaving at the top drifts up-right and blurs ---------- */
const exitSections = $$('main > section:not([data-no-exit])');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let exitTicking = false;
function renderExit() {
  exitTicking = false;
  const vh = window.innerHeight;
  const small = window.innerWidth < 720;
  const dx = small ? 24 : 64, dy = small ? 28 : 44, blur = small ? 4 : 7;
  const y = window.scrollY;
  exitSections.forEach(sec => {
    // Scroll-based progress: starts when the section's bottom passes mid-screen
    // (or immediately for sections that already end above it), ends when it leaves the top.
    // Measured without the current transform so the effect doesn't feed back into itself.
    const bottom = sec.offsetTop + sec.offsetHeight;
    const start = Math.max(0, bottom - vh * 0.5);
    const p = Math.min(1, Math.max(0, (y - start) / Math.max(1, bottom - start)));
    if (p <= 0 || reduceMotion.matches) {
      if (sec.style.transform) { sec.style.transform = ''; sec.style.filter = ''; sec.style.opacity = ''; sec.style.willChange = ''; }
      return;
    }
    const e = p * p * (3 - 2 * p);
    sec.style.willChange = 'transform, filter, opacity';
    sec.style.transform = `translate3d(${(e * dx).toFixed(1)}px, ${(-e * dy).toFixed(1)}px, 0)`;
    sec.style.filter = `blur(${(e * blur).toFixed(2)}px)`;
    sec.style.opacity = (1 - e * 0.6).toFixed(3);
  });
}
function requestExit() {
  if (!exitTicking) { exitTicking = true; requestAnimationFrame(renderExit); }
}
window.addEventListener('scroll', requestExit, { passive: true });
window.addEventListener('resize', requestExit);
requestExit();
