/* ============================================================
   navbar.js — Pill slider navbar for Hariom Group
   Works on both desktop and mobile (horizontal scroll)
   ============================================================ */

(function () {
  var navbar     = document.getElementById('navbar');
  var slider     = document.getElementById('navSlider');
  var hoverTrack = document.getElementById('navHoverTrack');
  var idleTrack  = document.getElementById('navIdleTrack');
  var navItems   = document.querySelectorAll('.nav-item');

  if (!navbar || !slider || !navItems.length) return;

  // ── Size idle envelope to span first → last nav item exactly ──
  function positionIdleTrack() {
    if (!idleTrack || !navItems.length) return;
    var navRect   = navbar.getBoundingClientRect();
    var firstRect = navItems[0].getBoundingClientRect();
    var lastRect  = navItems[navItems.length - 1].getBoundingClientRect();

    var left  = firstRect.left - navRect.left + navbar.scrollLeft;
    var width = (lastRect.right - firstRect.left);

    idleTrack.style.left  = left + 'px';
    idleTrack.style.width = width + 'px';
  }

  // ── Position slider under a given button ──
  function positionSlider(btn) {
    var navRect = navbar.getBoundingClientRect();
    var btnRect = btn.getBoundingClientRect();
    // offset accounts for navbar's own scroll position
    slider.style.left   = (btnRect.left - navRect.left + navbar.scrollLeft) + 'px';
    slider.style.top    = (btnRect.top  - navRect.top) + 'px';
    slider.style.width  = btnRect.width + 'px';
    slider.style.height = btnRect.height + 'px';
  }

  // ── Position hover track ──
  function positionHoverTrack(btn) {
    var navRect = navbar.getBoundingClientRect();
    var btnRect = btn.getBoundingClientRect();
    hoverTrack.style.left   = (btnRect.left - navRect.left + navbar.scrollLeft) + 'px';
    hoverTrack.style.top    = (btnRect.top  - navRect.top) + 'px';
    hoverTrack.style.width  = btnRect.width + 'px';
    hoverTrack.style.height = btnRect.height + 'px';
    hoverTrack.style.opacity = '1';
  }

  // ── Scroll active pill into view on mobile ──
  function scrollActiveIntoView(btn) {
    var navRect  = navbar.getBoundingClientRect();
    var btnRect  = btn.getBoundingClientRect();
    var btnLeft  = btnRect.left - navRect.left + navbar.scrollLeft;
    var btnRight = btnLeft + btnRect.width;
    var visible  = navbar.scrollLeft + navbar.clientWidth;

    if (btnLeft < navbar.scrollLeft + 8) {
      navbar.scrollTo({ left: btnLeft - 8, behavior: 'smooth' });
    } else if (btnRight > visible - 8) {
      navbar.scrollTo({ left: btnRight - navbar.clientWidth + 8, behavior: 'smooth' });
    }
  }

  // ── Init slider on active item ──
  function init() {
    var active = navbar.querySelector('.nav-item.active');
    if (active) {
      positionSlider(active);
      scrollActiveIntoView(active);
    }
    positionIdleTrack();
  }

  // ── Click handler ──
  navItems.forEach(function (btn) {
    btn.addEventListener('click', function () {
      navbar.classList.add('nav-touched');
      navItems.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      positionSlider(btn);
      scrollActiveIntoView(btn);

      var section = document.getElementById(btn.dataset.section);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    btn.addEventListener('mouseenter', function () { positionHoverTrack(btn); });
    btn.addEventListener('mouseleave', function () { hoverTrack.style.opacity = '0'; });
  });

  // ── Re-position slider when navbar scrolls (mobile) ──
  navbar.addEventListener('scroll', function () {
    var active = navbar.querySelector('.nav-item.active');
    if (active) positionSlider(active);
    positionIdleTrack();
  }, { passive: true });

  // ── Scroll-spy: update active on page scroll ──
  var sections = [];
  navItems.forEach(function (btn) {
    var sec = document.getElementById(btn.dataset.section);
    if (sec) sections.push({ btn: btn, sec: sec });
  });

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 120;
    var current = null;
    sections.forEach(function (item) {
      if (item.sec.offsetTop <= scrollY) current = item;
    });
    if (current) {
      navItems.forEach(function (b) { b.classList.remove('active'); });
      current.btn.classList.add('active');
      positionSlider(current.btn);
    }
  }, { passive: true });

  // ── Re-init on resize ──
  window.addEventListener('resize', init);
  window.addEventListener('load', init);
  init();
})();
