// Set to your CRM / form-backend URL (e.g. Formspree, HubSpot, own API) to deliver leads.
const FORM_ENDPOINT = '';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- Mobile menu ---------- */
const menuButton = $('.menu-button');
const mobileMenu = $('#mobile-menu');
function setMenu(open) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
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

/* ---------- Active nav link ---------- */
const navLinks = $$('.desktop-nav a');
const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
if (sections.length && 'IntersectionObserver' in window) {
  const navIo = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navIo.observe(s));
  const clearAtTop = () => {
    if (window.scrollY < sections[0].offsetTop - window.innerHeight / 2) navLinks.forEach(a => a.classList.remove('is-active'));
  };
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
  updateCarousel();
}

/* ---------- Language menu ---------- */
const LANG_KEY = 'antefluence-lang';
const langs = $$('[data-lang]');
function applyLang(code) {
  langs.forEach(root => {
    const option = $(`[data-code="${code}"]`, root);
    if (!option) return;
    $$('[role="option"]', root).forEach(o => o.setAttribute('aria-selected', String(o === option)));
    $('[data-lang-label]', root).textContent = code.toUpperCase();
    $('.lang-pill', root).setAttribute('aria-label', `Language: ${option.textContent}`);
  });
}
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
    const code = option.dataset.code;
    applyLang(code);
    try { localStorage.setItem(LANG_KEY, code); } catch {}
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
    else if (e.key === 'Escape') { closeLang(root, true); }
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
  if (mobileMenu && !mobileMenu.hidden) { setMenu(false); menuButton.focus(); }
});
try {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved) applyLang(saved);
} catch {}

/* ---------- Placeholder links ---------- */
$$('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

/* ---------- Footer year ---------- */
const year = $('[data-year]');
if (year) year.textContent = new Date().getFullYear();

/* ---------- Lead form ---------- */
const form = $('#lead-form');
if (form) {
  const status = $('.form-status', form);
  const button = $('button[type="submit"]', form);
  const fields = $$('input, textarea', form);
  fields.forEach(f => f.addEventListener('input', () => {
    if (f.checkValidity()) f.removeAttribute('aria-invalid');
  }));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.classList.remove('is-error');
    fields.forEach(f => f.toggleAttribute('aria-invalid', !f.checkValidity()));
    const firstInvalid = fields.find(f => !f.checkValidity());
    if (firstInvalid) {
      status.textContent = 'Please fill in all fields with a valid business email.';
      status.classList.add('is-error');
      firstInvalid.focus();
      return;
    }

    const original = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Sending…';
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
      button.textContent = 'Sent ✓';
      status.textContent = 'Thanks! Our team will get back to you shortly.';
      setTimeout(() => { button.disabled = false; button.innerHTML = original; }, 2600);
    } catch {
      button.disabled = false;
      button.innerHTML = original;
      status.textContent = 'Something went wrong. Please try again in a moment.';
      status.classList.add('is-error');
    }
  });
}
