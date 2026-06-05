/* ============================================================
   main.js — Hariom Group website interactions
   ============================================================ */

/* ── INTRO VIDEO — runs immediately, outside any IIFE ── */
var _introDone = false;

window.skipIntro = function () {
  if (_introDone) return;
  _introDone = true;

  var screen = document.getElementById('introScreen');
  if (!screen) return;

  screen.style.transition    = 'opacity 0.7s ease';
  screen.style.opacity       = '0';
  screen.style.pointerEvents = 'none';

  setTimeout(function () {
    if (screen && screen.parentNode) {
      screen.parentNode.removeChild(screen);
    }
    document.body.style.overflow = '';
  }, 750);
};

(function () {
  var screen = document.getElementById('introScreen');
  var video  = document.getElementById('introVideo');

  if (screen) {
    document.body.style.overflow = 'hidden';

    if (video) {
      video.addEventListener('ended', window.skipIntro);
      video.addEventListener('error', window.skipIntro);

      /* force play — required on some mobile browsers */
      var playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          /* autoplay blocked — skip immediately */
          window.skipIntro();
        });
      }
    } else {
      /* no video element found — skip immediately */
      window.skipIntro();
    }

    /* hard failsafe — nukes it after 12s no matter what */
    setTimeout(window.skipIntro, 12000);
  }
})();

/* ── REST OF INTERACTIONS ── */
(function () {

  /* STAT BOX EXPAND/COLLAPSE */
  var statBoxes = document.querySelectorAll('.stat-box');
  statBoxes.forEach(function (box) {
    box.addEventListener('click', function () {
      var isExpanded = box.classList.contains('expanded');
      statBoxes.forEach(function (b) { b.classList.remove('expanded'); });
      if (!isExpanded) box.classList.add('expanded');
    });
  });

  /* FAQ ACCORDION */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var heading = item.querySelector('h3');
    if (!heading) return;
    heading.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (fi) { fi.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* SCROLL FADE-IN for sections */
  var style = document.createElement('style');
  style.textContent =
    '.fade-section{opacity:0;transform:translateY(18px);transition:opacity .55s ease,transform .55s ease;}' +
    '.fade-section.visible{opacity:1;transform:none;}';
  document.head.appendChild(style);

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('section').forEach(function (el) {
      el.classList.add('fade-section');
      obs.observe(el);
    });
  } else {
    document.querySelectorAll('section').forEach(function (el) { el.classList.add('visible'); });
  }

})();
