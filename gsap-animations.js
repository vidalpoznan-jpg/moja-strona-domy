// =============================================
// GSAP ScrollTrigger — Apple-style scroll zoom
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // --- Selectors for scroll-driven reveal ---
  var revealTargets = [
    // Images
    '.about-image img',
    '.proj-card .proj-img img',
    '.factory-thumb img',
    // Feature blocks
    '.offer-type',
    '.kvh-feature',
    '.factory-feature',
    // Section content blocks
    '.process-step',
    // KVH badge
    '.kvh-badge',
    // Map
    '.reach-frame',
    // Tech u-value
    '.tech-u-value',
    // Contact form
    '.contact-form',
  ];

  // Apply gsap-reveal class for will-change optimization
  revealTargets.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(el) {
      el.classList.add('gsap-reveal');
    });
  });

  // --- Image zoom-in from scale(0.88) ---
  gsap.utils.toArray('.about-image img, .proj-img img, .reach-frame').forEach(function(el) {
    gsap.fromTo(el,
      { scale: 0.88, opacity: 0.1 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'center 50%',
          scrub: 1,
        }
      }
    );
  });

  // --- Feature cards: rise + scale ---
  gsap.utils.toArray('.offer-type, .kvh-feature, .process-step').forEach(function(el, i) {
    gsap.fromTo(el,
      { y: 50, scale: 0.94, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'top 55%',
          scrub: 0.8,
        }
      }
    );
  });

  // --- Factory features: blur materialise ---
  gsap.utils.toArray('.factory-feature').forEach(function(el) {
    gsap.fromTo(el,
      { y: 30, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 55%',
          scrub: 0.7,
        }
      }
    );
  });

  // --- Section titles: soft fade up ---
  gsap.utils.toArray('.section-title, .section-label').forEach(function(el) {
    gsap.fromTo(el,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          end: 'top 68%',
          scrub: 0.6,
        }
      }
    );
  });

  // --- Gold dividers: width grow ---
  gsap.utils.toArray('.gold-divider').forEach(function(el) {
    gsap.fromTo(el,
      { width: 0 },
      {
        width: 60,
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 65%',
          scrub: 0.5,
        }
      }
    );
  });

  // --- KVH badge: dramatic zoom ---
  gsap.utils.toArray('.kvh-badge').forEach(function(el) {
    gsap.fromTo(el,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'center 55%',
          scrub: 0.8,
        }
      }
    );
  });

  // --- Gallery cards: staggered zoom ---
  gsap.utils.toArray('.proj-card').forEach(function(el, i) {
    gsap.fromTo(el,
      { y: 60, scale: 0.92, opacity: 0, filter: 'blur(3px)' },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          end: 'top 58%',
          scrub: 0.8,
        }
      }
    );
  });

  // --- Contact items: slide from left ---
  gsap.utils.toArray('.contact-item').forEach(function(el, i) {
    gsap.fromTo(el,
      { x: -35, opacity: 0, filter: 'blur(2px)' },
      {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 65%',
          scrub: 0.6,
        }
      }
    );
  });

  // --- Testimonial cards: staggered rise ---
  gsap.utils.toArray('.testimonial-card').forEach(function(el, i) {
    gsap.fromTo(el,
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 0.7,
        }
      }
    );
  });

  // --- Hero parallax (continuous, not scrub) ---
  gsap.to('.hero-bg', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });

});