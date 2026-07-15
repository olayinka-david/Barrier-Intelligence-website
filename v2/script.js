(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const qaSection = searchParams.get('qa');
  const qaMode = Boolean(qaSection);
  if (qaSection === 'features') document.body.classList.add('qa-features');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || qaMode;
  const loader = document.querySelector('.loader');
  document.body.classList.add('is-loading');

  const releasePage = () => {
    document.body.classList.remove('is-loading');
    if (!loader) return;
    if (!window.gsap || reduced) {
      loader.remove();
      return;
    }
    gsap.to(loader, { yPercent: -100, duration: .9, ease: 'power3.inOut', onComplete: () => loader.remove() });
  };

  if (qaMode) {
    releasePage();
  } else if (window.gsap && !reduced) {
    gsap.set('.loader__mark span', { transformOrigin: '50% 50%' });
    const loadTl = gsap.timeline({ onComplete: releasePage });
    loadTl
      .from('.loader__mark span', { scale: 0, rotation: -90, stagger: .12, duration: .58, ease: 'back.out(1.7)' })
      .from('.loader p', { opacity: 0, y: 8, duration: .35 }, '-=.15')
      .to('.loader__mark span', { rotation: 90, stagger: .08, duration: .5, ease: 'power2.inOut' }, '+=.2')
      .to('.loader p', { opacity: 0, duration: .2 }, '-=.1');
  } else {
    window.addEventListener('load', releasePage, { once: true });
  }

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.desktop-nav');
  const themeToggle = document.querySelector('.theme-toggle');
  const applyTheme = (theme, persist = true) => {
    const isLight = theme === 'light';
    document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
    themeToggle?.setAttribute('aria-pressed', String(isLight));
    themeToggle?.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
    const label = themeToggle?.querySelector('.theme-toggle__label');
    const glyph = themeToggle?.querySelector('.theme-toggle__glyph');
    if (label) label.textContent = isLight ? 'Dark' : 'Light';
    if (glyph) glyph.textContent = isLight ? '◐' : '☼';
    if (persist) localStorage.setItem('barrier-theme', isLight ? 'light' : 'dark');
  };
  const requestedTheme = new URLSearchParams(window.location.search).get('theme');
  const savedTheme = localStorage.getItem('barrier-theme');
  applyTheme(requestedTheme === 'light' || (requestedTheme !== 'dark' && savedTheme === 'light') ? 'light' : 'dark', false);
  themeToggle?.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
  });
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  if (!window.gsap || reduced) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero__eyebrow', { opacity: 0, y: 16, duration: .6, delay: 1.05 });
  gsap.from('.hero h1', { opacity: 0, y: 60, duration: 1.05, ease: 'power3.out', delay: 1.15 });
  gsap.from('.hero__bottom > *', { opacity: 0, y: 24, stagger: .12, duration: .75, delay: 1.35 });
  gsap.from('.hero-visual', { clipPath: 'inset(18% 0 0 0)', opacity: .4, duration: 1.25, ease: 'power3.out', delay: 1.25 });

  gsap.utils.toArray('.reveal').forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      y: 54,
      duration: .9,
      ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 86%', once: true }
    });
  });

  gsap.utils.toArray('.feature-card').forEach((card, index) => {
    const image = card.querySelector('img');
    gsap.from(image, {
      yPercent: 12,
      opacity: .5,
      duration: 1.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 78%', once: true },
      delay: (index % 2) * .08
    });
  });

  const heroImage = document.querySelector('[data-parallax] img');
  if (heroImage) {
    gsap.to(heroImage, {
      yPercent: 7,
      ease: 'none',
      scrollTrigger: { trigger: '.hero-visual', start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }

  document.querySelectorAll('[data-count]').forEach((node) => {
    const target = Number(node.dataset.count);
    const state = { value: 0 };
    gsap.to(state, {
      value: target,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => { node.textContent = Math.round(state.value); },
      scrollTrigger: { trigger: node, start: 'top 88%', once: true }
    });
  });

  gsap.to('.status-dot', { scale: 1.7, opacity: .45, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
})();
