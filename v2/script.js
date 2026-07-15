(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const qaSection = searchParams.get('qa');
  const qaMode = Boolean(qaSection);
  if (qaSection === 'features') document.body.classList.add('qa-features');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || qaMode;
  const loader = document.querySelector('.loader');
  document.body.classList.add('is-loading');
  const announceReady = () => document.dispatchEvent(new CustomEvent('barrier:ready'));

  const releasePage = () => {
    document.body.classList.remove('is-loading');
    if (!loader) {
      announceReady();
      return;
    }
    if (!window.gsap || reduced) {
      loader.remove();
      announceReady();
      return;
    }
    gsap.to(loader, { yPercent: -100, duration: .9, ease: 'power3.inOut', onComplete: () => {
      loader.remove();
      announceReady();
    } });
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
    if (persist && window.gsap && !reduced) {
      gsap.fromTo('body', { opacity: .88 }, { opacity: 1, duration: .4, ease: 'power2.out' });
      gsap.fromTo(themeToggle, { rotation: -8, scale: .92 }, { rotation: 0, scale: 1, duration: .5, ease: 'back.out(2)' });
    }
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

  gsap.to('.scroll-progress span', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: .25 }
  });

  const runHeroIntro = () => {
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .from('.site-header > *', { opacity: 0, y: -14, stagger: .07, duration: .55 })
      .from('.hero__eyebrow', { opacity: 0, y: 16, duration: .55 }, '-=.25')
      .from('.hero-line > *', { yPercent: 112, stagger: .11, duration: 1.05, ease: 'power4.out' }, '-=.2')
      .from('.hero__bottom > *', { opacity: 0, y: 24, stagger: .12, duration: .7 }, '-=.6')
      .from('.hero-visual', { clipPath: 'inset(18% 0 0 0)', opacity: .35, scale: .985, duration: 1.2, ease: 'power4.out' }, '-=.55')
      .from('.hero-readout span, .hero-index', { opacity: 0, y: 8, stagger: .06, duration: .4 }, '-=.35');
  };
  if (loader) document.addEventListener('barrier:ready', runHeroIntro, { once: true });
  else runHeroIntro();

  gsap.utils.toArray('.reveal').forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      y: 54,
      duration: .9,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
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

  gsap.from('.model-flow__arrow', {
    opacity: .2,
    x: -10,
    stagger: .16,
    duration: .75,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.model-flow', start: 'top 78%', once: true }
  });

  gsap.from('.register__row, .register__header', {
    opacity: 0,
    x: 18,
    stagger: .07,
    duration: .58,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.register', start: 'top 82%', once: true }
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

  if (window.matchMedia('(pointer: fine)').matches) {
    gsap.utils.toArray('.feature-card').forEach((card) => {
      card.classList.add('motion-surface');
      const image = card.querySelector('img');
      const rotateX = gsap.quickTo(card, 'rotationX', { duration: .55, ease: 'power3.out' });
      const rotateY = gsap.quickTo(card, 'rotationY', { duration: .55, ease: 'power3.out' });
      const imageX = gsap.quickTo(image, 'xPercent', { duration: .7, ease: 'power3.out' });
      const imageY = gsap.quickTo(image, 'yPercent', { duration: .7, ease: 'power3.out' });
      gsap.set(card, { transformPerspective: 1200 });
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        rotateY(x * 2.8);
        rotateX(y * -2.2);
        imageX(x * 1.4);
        imageY(y * 1.1);
      });
      card.addEventListener('pointerleave', () => {
        rotateX(0); rotateY(0); imageX(0); imageY(0);
      });
    });

    document.querySelectorAll('.product-row').forEach((row) => {
      const copy = row.querySelector('div:nth-child(2)');
      const action = row.querySelector(':scope > a');
      row.addEventListener('pointerenter', () => {
        gsap.to(copy, { x: 8, duration: .4, ease: 'power3.out' });
        if (action) gsap.to(action, { rotation: 45, duration: .4, ease: 'power3.out' });
      });
      row.addEventListener('pointerleave', () => {
        gsap.to(copy, { x: 0, duration: .45, ease: 'power3.out' });
        if (action) gsap.to(action, { rotation: 0, duration: .45, ease: 'power3.out' });
      });
    });

    document.querySelectorAll('.theme-toggle, .header-cta, .closing__cta').forEach((control) => {
      control.addEventListener('pointermove', (event) => {
        const rect = control.getBoundingClientRect();
        gsap.to(control, { x: (event.clientX - rect.left - rect.width / 2) * .06, y: (event.clientY - rect.top - rect.height / 2) * .08, duration: .35, ease: 'power3.out' });
      });
      control.addEventListener('pointerleave', () => gsap.to(control, { x: 0, y: 0, duration: .4, ease: 'power3.out' }));
    });
  }

  gsap.to('.status-dot', { scale: 1.7, opacity: .45, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
})();
