window.__mainAnimationsInit = function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  document.body.dataset.reducedMotion = prefersReducedMotion ? "true" : "false";

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  function finishIntro() {
    document.documentElement.classList.remove("is-loading");
    document.documentElement.classList.add("is-loaded");
    const loader = document.getElementById("page-loader");
    if (loader) loader.setAttribute("aria-busy", "false");
  }

  function whenIntroReady(callback) {
    const fire = () => {
      const fonts = document.fonts?.ready ?? Promise.resolve();
      Promise.race([
        fonts,
        new Promise((resolve) => {
          setTimeout(resolve, 4500);
        }),
      ]).finally(() => {
        requestAnimationFrame(callback);
      });
    };
    if (document.readyState === "complete") fire();
    else window.addEventListener("load", fire, { once: true });
  }

  function revealHeroStatic() {
    document
      .querySelectorAll(".js-hero-word, .js-hero-runners, .hero .js-reveal")
      .forEach((el) => {
        el.style.opacity = "1";
      });
    const runners = document.querySelector(".js-hero-runners");
    if (runners) runners.style.clipPath = "none";

    const lead = document.querySelector(".js-hero-lead");
    if (lead && lead.querySelector(".lead__wi")) {
      lead.querySelectorAll(".lead__wi").forEach((w) => {
        w.style.opacity = "1";
        w.style.transform = "none";
      });
    }
  }

  function splitHeroLead() {
    const lead = document.querySelector(".js-hero-lead");
    if (!lead || prefersReducedMotion) return;
    const raw = lead.textContent.trim();
    const words = raw.split(/\s+/);
    lead.innerHTML = words
      .map(
        (w) =>
          `<span class="lead__w"><span class="lead__wi">${w}</span></span>`
      )
      .join(" ");
  }

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    splitHeroLead();
    revealHeroStatic();
    whenIntroReady(finishIntro);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  if (window.__mainAnimationsHasRun) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
  }
  document.querySelectorAll(".pin-spacer > .doc-strip").forEach((section) => {
    const spacer = section.parentElement;
    if (!spacer || !spacer.classList.contains("pin-spacer")) return;
    spacer.parentElement?.insertBefore(section, spacer);
    spacer.remove();
  });
  document.querySelectorAll(".pin-spacer").forEach((spacer) => {
    if (spacer.childElementCount === 0) spacer.remove();
  });

  if (prefersReducedMotion) {
    revealHeroStatic();
    document.querySelectorAll(".js-vibe-slide").forEach((el, i) => {
      el.style.position = "relative";
      el.style.inset = "auto";
      el.style.opacity = i === 0 ? "1" : "0.35";
      el.style.filter = "none";
      el.style.transform = "none";
      el.style.pointerEvents = "auto";
      el.style.fontSize = "clamp(2rem, 8vw, 3.5rem)";
    });
    const stage = document.querySelector(".vibe__stage");
    if (stage) {
      stage.style.height = "auto";
      stage.style.display = "flex";
      stage.style.flexDirection = "column";
      stage.style.gap = "0.5rem";
    }
    whenIntroReady(finishIntro);
    return;
  }

  splitHeroLead();

  const cursor = document.getElementById("cursor");
  if (cursor && finePointer) {
    cursor.dataset.active = "true";
    const dot = cursor.querySelector(".cursor__dot");
    const ring = cursor.querySelector(".cursor__ring");
    if (dot && ring) {
      const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
      const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
      const xRing = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
      const yRing = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
      window.addEventListener(
        "pointermove",
        (e) => {
          xDot(e.clientX);
          yDot(e.clientY);
          xRing(e.clientX);
          yRing(e.clientY);
        },
        { passive: true }
      );
    }
  }

  const runLane = document.querySelector(".js-run-lane");
  const distanceHud = document.querySelector(".js-distance-hud");
  const distanceValue = document.querySelector(".js-distance-value");
  const distanceStatus = document.querySelector(".js-distance-status");
  const distanceReset = document.querySelector(".js-distance-reset");
  const hrProgress = document.querySelector(".js-hr-progress");
  const hrPulse = document.querySelector(".js-hr-pulse");
  let laneOffset = 0;
  let laneVelocity = 0;
  let lastY = window.scrollY;
  let isFinishingRun = false;

  const updateMotionHud = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

    if (distanceValue) {
      const km = (progress * 10).toFixed(1);
      distanceValue.textContent = `${km} KM`;
    }

    if (hrProgress) {
      hrProgress.style.width = `${progress * 100}%`;
    }

    if (hrPulse && hrProgress) {
      hrPulse.style.left = `${progress * 100}%`;
    }

    if (progress >= 0.999 && !isFinishingRun) {
      isFinishingRun = true;
      if (distanceHud) distanceHud.classList.add("is-finish");
      if (distanceStatus) distanceStatus.textContent = "Next training starts now.";
    }
  };

  if (distanceReset) {
    distanceReset.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (distanceHud) distanceHud.classList.remove("is-finish");
      if (distanceStatus) distanceStatus.textContent = "Keep the pace.";
      isFinishingRun = false;
      setTimeout(updateMotionHud, 250);
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      laneVelocity = Math.max(-35, Math.min(35, delta * 0.22));
      updateMotionHud();
    },
    { passive: true }
  );

  gsap.ticker.add(() => {
    laneVelocity *= 0.9;
    laneOffset += laneVelocity;
    if (runLane) {
      runLane.style.backgroundPosition = `${laneOffset}px 0`;
    }
  });

  gsap.utils.toArray("section").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        if (!hrPulse) return;
        hrPulse.classList.remove("is-hit");
        requestAnimationFrame(() => hrPulse.classList.add("is-hit"));
      },
    });
  });

  updateMotionHud();

  const hero = document.querySelector(".hero");
  const water = document.querySelector(".js-hero-parallax");
  if (hero && water) {
    hero.addEventListener(
      "pointermove",
      (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 48;
        const y = (e.clientY / window.innerHeight - 0.5) * 36;
        gsap.to(water, {
          x,
          y,
          duration: 1.1,
          ease: "power3.out",
          overwrite: "auto",
        });
      },
      { passive: true }
    );
  }

  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      gsap.to(el, {
        x: mx * 0.18,
        y: my * 0.18,
        duration: 0.35,
        ease: "power2.out",
      });
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: "elastic.out(1, 0.45)",
      });
    });
  });

  gsap.utils.toArray(".js-marquee .marquee__track").forEach((track) => {
    gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 26,
      repeat: -1,
    });
  });

  const revTrack = document.querySelector(".js-marquee-rev .marquee__track");
  if (revTrack) {
    gsap.fromTo(
      revTrack,
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: "none",
        duration: 26,
        repeat: -1,
      }
    );
  }

  let headerTween = null;
  let heroTl = null;

  if (document.querySelector(".hero")) {
    heroTl = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true,
    });
    heroTl
      .from(
        ".js-hero-word",
        { y: 100, opacity: 0, rotate: -3, stagger: 0.11, duration: 0.78 },
        "-=0.2"
      )
      .from(
        ".js-hero-runners",
        {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.95,
          ease: "power4.inOut",
        },
        "-=0.38"
      )
      .from(".hero .js-reveal", { y: 32, opacity: 0, stagger: 0.08, duration: 0.55 }, "-=0.45");
  }

  const leadWords = document.querySelectorAll(".lead__wi");
  if (leadWords.length && heroTl) {
    heroTl.from(
      leadWords,
      {
        yPercent: 120,
        opacity: 0,
        stagger: 0.035,
        duration: 0.45,
        ease: "power3.out",
      },
      "-=0.25"
    );
  }

  const header = document.querySelector(".site-header");
  if (header) {
    headerTween = gsap.fromTo(
      header,
      { y: -28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        delay: 0.1,
        ease: "power2.out",
        paused: true,
      }
    );
  }

  gsap.utils.toArray(".js-section-title").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 84%",
        toggleActions: "play none none reverse",
      },
      y: 56,
      opacity: 0,
      rotate: -0.5,
      duration: 0.85,
      ease: "power3.out",
    });
  });

  gsap.utils
    .toArray(
      ".js-story-eyebrow, .js-gallery-eyebrow, .js-termini-eyebrow, .js-cta-eyebrow, .js-why-eyebrow, .js-doc-eyebrow"
    )
    .forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" },
        x: -20,
        opacity: 0,
        duration: 0.55,
        delay: i * 0.02,
        ease: "power2.out",
      });
    });

  if (document.querySelector(".js-schedule-intro")) {
    gsap.from(".js-schedule-intro", {
      scrollTrigger: {
        trigger: ".js-schedule-intro",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 22,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }

  if (document.querySelector(".js-schedule-brand")) {
    gsap.from(".js-schedule-brand", {
      scrollTrigger: {
        trigger: ".js-schedule-brand",
        start: "top 92%",
        toggleActions: "play none none reverse",
      },
      y: 24,
      opacity: 0,
      duration: 0.55,
      ease: "power3.out",
    });
  }

  gsap.utils.toArray(".js-schedule-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 92%",
        toggleActions: "play none none reverse",
      },
      y: 36,
      opacity: 0,
      duration: 0.55,
      delay: i * 0.08,
      ease: "power3.out",
    });
  });

  gsap.utils.toArray(".js-why-line").forEach((line, i) => {
    gsap.from(line, {
      scrollTrigger: {
        trigger: line,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      xPercent: i % 2 === 0 ? -10 : 10,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.6,
      ease: "power3.out",
    });
  });

  ScrollTrigger.getById("doc-strip-pin")?.kill(true);
  const docSection = document.querySelector(".js-doc-strip");
  const docViewport = document.querySelector(".js-doc-viewport");
  const docRail = document.querySelector(".js-doc-rail");
  if (docSection && docViewport && docRail) {
    gsap.set(docRail, { clearProps: "transform" });
    const docShift = () => Math.max(0, docRail.scrollWidth - docViewport.clientWidth);
    if (docShift() > 4) {
      const docEnd = () => `+=${docShift()}`;
      gsap.to(docRail, {
        x: () => -docShift(),
        ease: "none",
        scrollTrigger: {
          id: "doc-strip-pin",
          trigger: docSection,
          start: "top top",
          end: docEnd,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: () => gsap.set(docRail, { x: 0 }),
        },
      });

      gsap.to(".js-doc-card", {
        yPercent: (index) => (index % 2 === 0 ? -3 : 3),
        rotate: (index) => (index % 2 === 0 ? -0.35 : 0.35),
        ease: "none",
        scrollTrigger: {
          trigger: docSection,
          start: "top top",
          end: docEnd,
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });
    }
  }

  const speedTargets = document.querySelectorAll(".js-speed-text");
  if (speedTargets.length) {
    let prevY = window.scrollY;
    let raf = 0;
    let speedResetTimer = null;
    window.addEventListener(
      "scroll",
      () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const y = window.scrollY;
          const delta = Math.abs(y - prevY);
          prevY = y;
          const stretch = Math.min(1.14, 1 + delta * 0.0016);
          const blur = Math.min(7, delta * 0.045);
          speedTargets.forEach((el) => {
            el.style.transform = `scaleX(${stretch})`;
            el.style.filter = blur > 0.3 ? `blur(${blur}px)` : "none";
          });
          if (speedResetTimer) clearTimeout(speedResetTimer);
          speedResetTimer = setTimeout(() => {
            speedTargets.forEach((el) => {
              el.style.transform = "";
              el.style.filter = "";
            });
          }, 120);
          raf = 0;
        });
      },
      { passive: true }
    );
  }

  if (document.querySelector(".js-gallery-intro")) {
    gsap.from(".js-gallery-intro", {
      scrollTrigger: {
        trigger: ".js-gallery-intro",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 22,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }

  gsap.utils.toArray(".js-gallery-cell").forEach((cell, i) => {
    gsap.from(cell, {
      scrollTrigger: {
        trigger: cell,
        start: "top 92%",
        toggleActions: "play none none reverse",
      },
      y: 36,
      opacity: 0,
      duration: 0.55,
      delay: (i % 4) * 0.04,
      ease: "power3.out",
    });
  });

  gsap.utils.toArray(".js-story-line").forEach((line, i) => {
    gsap.from(line, {
      scrollTrigger: {
        trigger: line,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      filter: "blur(6px)",
      duration: 0.75,
      delay: i * 0.06,
      ease: "power3.out",
    });
  });

  const manifest = document.querySelector(".js-manifest");
  if (manifest) {
    const lines = manifest.querySelectorAll(".manifest__line");
    gsap.from(lines, {
      scrollTrigger: {
        trigger: manifest,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: -60,
      opacity: 0,
      skewX: -4,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
    });
  }

  const slides = gsap.utils.toArray(".js-vibe-slide");
  if (slides.length && document.querySelector(".vibe")) {
    gsap.set(slides, {
      opacity: 0,
      scale: 0.88,
      filter: "blur(14px)",
      y: 48,
    });
    gsap.set(slides[0], {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
    });

    const vibeTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".vibe",
        start: "top top",
        end: "+=320%",
        pin: true,
        scrub: 0.75,
        anticipatePin: 1,
      },
    });

    vibeTl.to({}, { duration: 0.65 });

    for (let i = 0; i < slides.length - 1; i += 1) {
      vibeTl
        .to(
          slides[i],
          {
            opacity: 0.06,
            scale: 1.08,
            filter: "blur(12px)",
            y: -56,
            duration: 0.72,
            ease: "power2.in",
          },
          i === 0 ? ">" : ">-0.08"
        )
        .to(
          slides[i + 1],
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.78,
            ease: "power3.out",
          },
          "<0.22"
        );
    }

    gsap.from(".js-vibe-kicker", {
      scrollTrigger: {
        trigger: ".vibe",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 16,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.from(".js-vibe-sub", {
      scrollTrigger: {
        trigger: ".vibe",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
      y: 20,
      opacity: 0,
      duration: 0.65,
      ease: "power2.out",
    });
  }

  if (document.querySelector(".js-cta-text")) {
    gsap.from(".js-cta-text", {
      scrollTrigger: {
        trigger: ".js-cta-text",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }

  if (document.querySelector(".js-cta-btn")) {
    gsap.from(".js-cta-btn", {
      scrollTrigger: {
        trigger: ".cta__links",
        start: "top 92%",
        toggleActions: "play none none reverse",
      },
      y: 24,
      opacity: 0,
      stagger: 0.12,
      duration: 0.55,
      ease: "power3.out",
    });
  }

  const mega = document.querySelector(".site-footer__mega");
  if (mega) {
    const spans = mega.querySelectorAll("span");
    gsap.from(spans, {
      scrollTrigger: {
        trigger: mega,
        start: "top 95%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      stagger: 0.06,
      duration: 0.55,
      ease: "power3.out",
    });
  }

  whenIntroReady(() => {
    finishIntro();
    if (heroTl) heroTl.play(0);
    if (headerTween) headerTween.play();
    ScrollTrigger.refresh();
  });

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  document.fonts?.ready?.then(() => ScrollTrigger.refresh());

  ScrollTrigger.refresh();
  window.__mainAnimationsHasRun = true;
};

window.__mainAnimationsInit();
