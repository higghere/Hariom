/* ============================================================
   navbar.js — Pill slider navbar for Hariom Group
   Ported from AtlanticAxis Studios template
   ============================================================ */

(function () {
  const navbar = document.getElementById('navbar');
  const slider = document.getElementById('navSlider');
  const hoverTrack = document.getElementById('navHoverTrack');
  const navItems = document.querySelectorAll('.nav-item');

  if (!navbar || !slider || !navItems.length) return;

  // ── position slider under a given button ──
  function positionSlider(btn) {
    const navRect = navbar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    slider.style.left = (btnRect.left - navRect.left) + 'px';
    slider.style.top = (btnRect.top - navRect.top) + 'px';
    slider.style.width = btnRect.width + 'px';
    slider.style.height = btnRect.height + 'px';
  }

  // ── position hover track under a given button ──
  function positionHoverTrack(btn) {
    const navRect = navbar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    hoverTrack.style.left = (btnRect.left - navRect.left) + 'px';
    hoverTrack.style.top = (btnRect.top - navRect.top) + 'px';
    hoverTrack.style.width = btnRect.width + 'px';
    hoverTrack.style.height = btnRect.height + 'px';
    hoverTrack.style.opacity = '1';
  }

  // ── initialise to the active item ──
  function init() {
    const active = navbar.querySelector('.nav-item.active');
    if (active) positionSlider(active);
  }

  // ── click: move slider, update active, scroll to section ──
  navItems.forEach(function (btn) {
    btn.addEventListener('click', function () {
      navItems.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      positionSlider(btn);

      const section = document.getElementById(btn.dataset.section);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // hover track
    btn.addEventListener('mouseenter', function () {
      positionHoverTrack(btn);
    });

    btn.addEventListener('mouseleave', function () {
      hoverTrack.style.opacity = '0';
    });
  });

  // ── update active nav item on scroll ──
  const sections = [];
  navItems.forEach(function (btn) {
    const sec = document.getElementById(btn.dataset.section);
    if (sec) sections.push({ btn: btn, sec: sec });
  });

  window.addEventListener('scroll', function () {
    let current = null;
    const scrollY = window.scrollY + 120;

    sections.forEach(function (item) {
      if (item.sec.offsetTop <= scrollY) {
        current = item;
      }
    });

    if (current) {
      navItems.forEach(function (b) { b.classList.remove('active'); });
      current.btn.classList.add('active');
      positionSlider(current.btn);
    }
  }, { passive: true });

  // ── re-init on resize ──
  window.addEventListener('resize', init);

  // ── run init after fonts/layout settle ──
  window.addEventListener('load', init);
  init();
})();
