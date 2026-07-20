const root = document.documentElement;
const params = new URLSearchParams(location.search);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const qaMode = params.has('qa');
const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.site-menu-toggle');
const siteNav = document.querySelector('.site-nav');
const savedTheme = localStorage.getItem('bi-theme');
const requestedTheme = params.get('theme');
const initialTheme = requestedTheme === 'dark' || (requestedTheme !== 'light' && savedTheme === 'dark') ? 'dark' : 'light';

if (qaMode && params.get('view') === 'footer') {
  document.querySelector('.site-header').hidden = true;
  document.querySelector('main').hidden = true;
  const footerPreview = document.querySelector('.site-footer');
  if (footerPreview) footerPreview.style.marginTop = '24px';
}

if (qaMode && params.get('view') === 'symbols') {
  document.querySelector('.site-header').hidden = true;
  document.querySelector('.site-footer').hidden = true;
  const main = document.querySelector('main');
  main?.querySelectorAll(':scope > section').forEach((section) => {
    section.hidden = !section.classList.contains('symbol-section');
  });
  const symbolSection = main?.querySelector('.symbol-section');
  if (symbolSection) {
    symbolSection.style.paddingBlock = symbolSection.classList.contains('page-band') ? '0' : '52px';
    const nestedSection = symbolSection.querySelector(':scope > .page-section');
    if (nestedSection) nestedSection.style.paddingBlock = '52px';
  }
}

function setTheme(theme, animate = true) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  if (themeButton) {
    themeButton.textContent = dark ? 'Light' : 'Dark';
    themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeButton.setAttribute('title', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeButton.setAttribute('aria-pressed', String(dark));
  }
  localStorage.setItem('bi-theme', theme);
  if (animate && window.gsap && !reducedMotion) {
    gsap.fromTo('body', { opacity: .9 }, { opacity: 1, duration: .38, ease: 'power2.out' });
  }
}

setTheme(initialTheme, false);
themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.textContent = open ? 'Menu' : 'Close';
  siteNav?.classList.toggle('is-open', !open);
});
siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  siteNav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = 'Menu';
}));

const form = document.querySelector('.pilot-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const success = form.querySelector('.pilot-success');
  success.hidden = false;
  form.querySelectorAll('input, select, textarea, button').forEach((field) => { field.disabled = true; });
  if (window.gsap && !reducedMotion) gsap.fromTo(success, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .45, ease: 'power2.out' });
});

function initMotion() {
  const loader = document.querySelector('.site-loader');
  if (!window.gsap || reducedMotion || qaMode) {
    if (loader) loader.hidden = true;
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.to('.scroll-progress span', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .25 } });

  const progress = { value: 0 };
  const count = document.querySelector('.loader-count');
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from('.loader-lockup', { opacity: 0, y: -10, duration: .4 })
    .from('.loader-sequence span', { opacity: .2, y: 9, stagger: .12, duration: .3 }, .08)
    .to(progress, { value: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: () => { if (count) count.textContent = String(Math.round(progress.value)).padStart(2, '0'); } }, .08)
    .to('.loader-track span', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, .08)
    .to(loader, { yPercent: -100, duration: .72, ease: 'power4.inOut' }, 1.2)
    .set(loader, { display: 'none' })
    .from('.site-header > *', { opacity: 0, y: -14, stagger: .06, duration: .5 }, 1.45)
    .from('.inner-hero .eyebrow', { opacity: 0, y: 14, duration: .45 }, 1.55)
    .from('.inner-hero h1', { opacity: 0, y: 45, duration: .85, ease: 'power4.out' }, 1.62)
    .from('.inner-hero .hero-lede, .inner-hero .hero-actions', { opacity: 0, y: 20, stagger: .1, duration: .55 }, 1.78)
    .from('.inner-hero-visual, .inner-hero > .data-sheet', { opacity: 0, x: 35, scale: .985, duration: .9, ease: 'power4.out' }, 1.66);

  gsap.utils.toArray('[data-reveal]').forEach((section) => {
    const children = section.matches('[data-reveal="self"]') ? [section] : [...section.children];
    gsap.from(children, {
      opacity: 0,
      y: 34,
      stagger: .09,
      duration: .78,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: section, start: 'top 84%', once: true }
    });
  });

  gsap.utils.toArray('.technical-visual img, .inner-hero-visual img, .application-symbol-media img').forEach((image) => {
    gsap.to(image, { yPercent: 4, scale: 1.025, ease: 'none', scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });

  const footerScene = document.querySelector('.site-footer-scene');
  if (footerScene) {
    gsap.fromTo(footerScene, { yPercent: -2, scale: 1.045 }, { yPercent: 2, scale: 1.025, ease: 'none', scrollTrigger: { trigger: '.site-footer', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.content-card, .standard, .method-symbol, .evidence-symbol-card, .application-symbol-card').forEach((card) => {
      card.classList.add('motion-surface');
      card.addEventListener('pointerenter', () => gsap.to(card, { y: -7, scale: 1.01, duration: .35, ease: 'power3.out' }));
      card.addEventListener('pointerleave', () => gsap.to(card, { y: 0, scale: 1, duration: .42, ease: 'power3.out' }));
    });
    document.querySelectorAll('.button, .theme-toggle').forEach((control) => {
      control.addEventListener('pointermove', (event) => {
        const rect = control.getBoundingClientRect();
        gsap.to(control, { x: (event.clientX - rect.left - rect.width / 2) * .07, y: (event.clientY - rect.top - rect.height / 2) * .09, duration: .3, ease: 'power3.out' });
      });
      control.addEventListener('pointerleave', () => gsap.to(control, { x: 0, y: 0, duration: .38, ease: 'power3.out' }));
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

initMotion();
