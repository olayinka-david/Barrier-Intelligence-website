const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("bi-theme");
const urlParams = new URLSearchParams(location.search);
const requestedTheme = urlParams.get("theme");
const isQa = urlParams.get("qa") === "1";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = typeof window.gsap !== "undefined";
const menuButton = document.querySelector(".site-menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (isQa) root.classList.add("qa-capture");

const qaSection = urlParams.get("section") || (location.hash.startsWith("#qa-") ? location.hash.slice(4) : "");
if (isQa && qaSection) {
  document.querySelector(".site-header").hidden = true;
  document.querySelector("footer").hidden = true;
  document.querySelectorAll("main > section, .trust-strip").forEach((section) => {
    section.hidden = section.id !== qaSection;
  });
}

const initialTheme = requestedTheme === "dark" || (requestedTheme !== "light" && savedTheme === "dark") ? "dark" : "light";

function setTheme(theme, animate = true) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeButton.textContent = isDark ? "Light" : "Dark";
  themeButton.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
  themeButton.setAttribute("aria-pressed", String(isDark));
  localStorage.setItem("bi-theme", theme);

  if (animate && hasGsap && !reducedMotion) {
    window.gsap.fromTo(themeButton, { scale: 0.92 }, { scale: 1, duration: 0.45, ease: "back.out(2)" });
    window.gsap.fromTo("body", { opacity: 0.94 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
  }
}

setTheme(initialTheme, false);
themeButton.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

menuButton?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close" : "Menu";
});

siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  siteNav.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) menuButton.textContent = "Menu";
}));

const tabs = [...document.querySelectorAll('[role="tab"]')];
let tabAnimating = false;

function showTab(tab, animate = true) {
  if (tabAnimating || tab.getAttribute("aria-selected") === "true") return;

  const activeTab = tabs.find((item) => item.getAttribute("aria-selected") === "true");
  const oldPanel = activeTab ? document.getElementById(activeTab.getAttribute("aria-controls")) : null;
  const newPanel = document.getElementById(tab.getAttribute("aria-controls"));

  const commit = () => {
    tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
    if (oldPanel) oldPanel.hidden = true;
    newPanel.hidden = false;
  };

  if (!animate || !hasGsap || reducedMotion) {
    commit();
    return;
  }

  tabAnimating = true;
  window.gsap.timeline({ onComplete: () => { tabAnimating = false; } })
    .to(oldPanel, { opacity: 0, y: -12, duration: 0.18, ease: "power2.in", onComplete: commit })
    .fromTo(newPanel, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", clearProps: "opacity,transform" });
}

tabs.forEach((tab) => tab.addEventListener("click", () => showTab(tab)));

const dialog = document.querySelector(".contact-dialog");
const dialogShell = dialog.querySelector(".dialog-shell");

function openDialog() {
  if (dialog.open) return;
  dialog.showModal();
  if (hasGsap && !reducedMotion) {
    window.gsap.fromTo(dialogShell, { opacity: 0, y: 28, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out", clearProps: "transform" });
  }
}

function closeDialog() {
  if (!dialog.open) return;
  if (!hasGsap || reducedMotion) {
    dialog.close();
    return;
  }
  window.gsap.to(dialogShell, { opacity: 0, y: 18, scale: 0.985, duration: 0.22, ease: "power2.in", onComplete: () => {
    dialog.close();
    window.gsap.set(dialogShell, { clearProps: "opacity,transform" });
  } });
}

document.querySelectorAll(".js-open-contact").forEach((button) => button.addEventListener("click", openDialog));
document.querySelector(".dialog-close").addEventListener("click", closeDialog);
dialog.addEventListener("cancel", (event) => { event.preventDefault(); closeDialog(); });
dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) closeDialog();
});

const form = document.getElementById("pilot-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  form.querySelector(".form-success").hidden = false;
  form.querySelectorAll("input, select").forEach((field) => { field.disabled = true; });
  event.submitter.textContent = "Enquiry recorded";
  event.submitter.disabled = true;

  if (hasGsap && !reducedMotion) {
    window.gsap.fromTo(".form-success", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
  }
});

function formatCounter(element, value) {
  const decimals = Number(element.dataset.decimals || 0);
  const pad = Number(element.dataset.pad || 0);
  const suffix = element.dataset.suffix || "";
  let output = decimals ? value.toFixed(decimals) : String(Math.round(value));
  if (pad) output = output.padStart(pad, "0");
  element.textContent = `${output}${suffix}`;
}

function initMotion() {
  const loader = document.querySelector(".site-loader");

  if (!hasGsap || reducedMotion || isQa) {
    loader.hidden = true;
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  root.classList.add("motion-enabled");

  gsap.to(".scroll-progress span", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 0.25 }
  });

  const progress = { value: 0 };
  const loaderCount = document.querySelector(".loader-count");
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

  intro
    .from(".loader-lockup", { opacity: 0, y: -10, duration: 0.45 })
    .from(".loader-sequence span", { opacity: 0.18, y: 10, stagger: 0.16, duration: 0.38 }, 0.1)
    .to(progress, { value: 100, duration: 1.45, ease: "power2.inOut", onUpdate: () => {
      loaderCount.textContent = String(Math.round(progress.value)).padStart(2, "0");
    } }, 0.1)
    .to(".loader-track span", { scaleX: 1, duration: 1.45, ease: "power2.inOut" }, 0.1)
    .to(loader, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, 1.55)
    .set(loader, { display: "none" })
    .from(".site-header", { opacity: 0, y: -18, duration: 0.65 }, 1.78)
    .from(".hero .eyebrow", { opacity: 0, y: 16, duration: 0.55 }, 1.85)
    .from(".hero h1", { opacity: 0, y: 44, duration: 0.9 }, 1.92)
    .from(".hero-lede", { opacity: 0, y: 24, duration: 0.7 }, 2.08)
    .from(".hero-actions, .supporting-note", { opacity: 0, y: 18, stagger: 0.1, duration: 0.55 }, 2.2)
    .from(".hero-visual", { opacity: 0, x: 44, scale: 0.985, duration: 1, ease: "power4.out" }, 1.98);

  gsap.to(".signal-dot", { scale: 1.28, opacity: 0.72, duration: 1.15, repeat: -1, yoyo: true, ease: "sine.inOut" });

  gsap.to(".hero-visual img", {
    yPercent: 6,
    scale: 1.045,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
  });

  gsap.from(".trust-strip span", {
    opacity: 0,
    y: 16,
    stagger: 0.07,
    duration: 0.65,
    ease: "power3.out",
    scrollTrigger: { trigger: ".trust-strip", start: "top 92%", once: true }
  });

  gsap.to(".problem-visual img", {
    yPercent: 5,
    scale: 1.045,
    ease: "none",
    scrollTrigger: { trigger: ".problem-visual", start: "top bottom", end: "bottom top", scrub: 1 }
  });

  const reveal = (targets, trigger, options = {}) => {
    const elements = gsap.utils.toArray(targets).filter((element) => !element.hidden);
    if (!elements.length) return;
    elements.forEach((element) => element.classList.add("motion-reveal"));
    gsap.from(elements, {
      opacity: 0,
      y: options.y ?? 34,
      duration: options.duration ?? 0.85,
      stagger: options.stagger ?? 0.1,
      ease: options.ease ?? "power3.out",
      clearProps: "transform,opacity",
      scrollTrigger: { trigger, start: options.start ?? "top 82%", once: true }
    });
  };

  reveal(".problem .section-intro > *", ".problem");
  reveal(".problem-evidence > *, .problem-visual", ".problem-grid", { stagger: 0.12, start: "top 76%" });
  reveal(".method .section-intro > *", ".method");
  reveal(".steps-grid article", ".steps-grid", { stagger: 0.14, start: "top 78%" });
  reveal(".register-copy > *", ".register-section", { stagger: 0.09, start: "top 72%" });
  reveal(".register-ui", ".register-section", { y: 46, start: "top 72%" });
  reveal(".products .section-intro > *", ".products");
  reveal("#panel-assure3d > *", "#panel-assure3d", { stagger: 0.14 });
  reveal(".proof .section-intro > *", ".proof");
  reveal(".proof-grid article", ".proof-grid", { stagger: 0.15, start: "top 78%" });
  reveal(".vision > *", ".vision", { stagger: 0.1 });
  reveal(".cta-section > *", ".cta-section", { stagger: 0.1, start: "top 78%" });

  gsap.from(".vision-line span", {
    opacity: 0.28,
    x: -18,
    stagger: 0.13,
    duration: 0.7,
    ease: "power3.out",
    scrollTrigger: { trigger: ".vision-line", start: "top 84%", once: true }
  });

  gsap.from(".register-table .table-row:not(.table-head)", {
    opacity: 0,
    x: 20,
    stagger: 0.09,
    duration: 0.65,
    ease: "power2.out",
    scrollTrigger: { trigger: ".register-table", start: "top 80%", once: true }
  });

  gsap.fromTo(".table-row.selected", { borderColor: "transparent" }, {
    borderColor: "#d2ac6c",
    duration: 0.8,
    repeat: 1,
    yoyo: true,
    scrollTrigger: { trigger: ".table-row.selected", start: "top 82%", once: true }
  });

  document.querySelectorAll("[data-counter]").forEach((element) => {
    const target = Number(element.dataset.counter);
    const state = { value: 0 };
    gsap.to(state, {
      value: target,
      duration: 1.35,
      ease: "power2.out",
      onUpdate: () => formatCounter(element, state.value),
      scrollTrigger: { trigger: element, start: "top 88%", once: true }
    });
  });

  if (window.matchMedia("(pointer: fine)").matches) {
    const frame = document.querySelector(".hero-visual");
    const rotateX = gsap.quickTo(frame, "rotationX", { duration: 0.55, ease: "power3.out" });
    const rotateY = gsap.quickTo(frame, "rotationY", { duration: 0.55, ease: "power3.out" });
    gsap.set(frame, { transformPerspective: 1200 });

    frame.addEventListener("pointermove", (event) => {
      const rect = frame.getBoundingClientRect();
      rotateY(((event.clientX - rect.left) / rect.width - 0.5) * 3.5);
      rotateX(((event.clientY - rect.top) / rect.height - 0.5) * -3);
    });
    frame.addEventListener("pointerleave", () => { rotateX(0); rotateY(0); });

    const register = document.querySelector(".register-ui");
    if (register) {
      register.classList.add("motion-surface");
      const registerX = gsap.quickTo(register, "rotationX", { duration: 0.65, ease: "power3.out" });
      const registerY = gsap.quickTo(register, "rotationY", { duration: 0.65, ease: "power3.out" });
      gsap.set(register, { transformPerspective: 1400 });
      register.addEventListener("pointermove", (event) => {
        const rect = register.getBoundingClientRect();
        registerY(((event.clientX - rect.left) / rect.width - 0.5) * 2.4);
        registerX(((event.clientY - rect.top) / rect.height - 0.5) * -2);
      });
      register.addEventListener("pointerleave", () => { registerX(0); registerY(0); });
    }

    document.querySelectorAll(".plain-card, .steps-grid article, .proof-grid article").forEach((surface) => {
      surface.classList.add("motion-surface");
      surface.addEventListener("pointerenter", () => gsap.to(surface, { y: -7, scale: 1.012, duration: 0.35, ease: "power3.out" }));
      surface.addEventListener("pointerleave", () => gsap.to(surface, { y: 0, scale: 1, duration: 0.45, ease: "power3.out" }));
    });
  }

  document.querySelectorAll(".button, .theme-toggle, .product-tabs button").forEach((control) => {
    control.addEventListener("pointerenter", () => gsap.to(control, { scale: 1.018, duration: 0.22, ease: "power2.out" }));
    control.addEventListener("pointermove", (event) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const rect = control.getBoundingClientRect();
      gsap.to(control, { x: (event.clientX - rect.left - rect.width / 2) * 0.08, y: (event.clientY - rect.top - rect.height / 2) * 0.1, duration: 0.35, ease: "power3.out" });
    });
    control.addEventListener("pointerleave", () => gsap.to(control, { x: 0, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }));
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}

initMotion();

if (isQa) {
  const qaAction = urlParams.get("action");
  if (qaAction === "theme") themeButton.click();
  if (qaAction === "live") showTab(document.getElementById("tab-assurelive"), false);
  if (qaAction === "contact") openDialog();
}
