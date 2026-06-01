/* ============================================================
   main.js — General interactions for Hariom Group website
   - FAQ accordion toggle
   - Scroll-reveal fade-in on sections
   ============================================================ */

(function () {

  // ── STAT BOX EXPAND/COLLAPSE ──
  var statBoxes = document.querySelectorAll('.stat-box');

  statBoxes.forEach(function (box) {
    box.addEventListener('click', function () {
      var isExpanded = box.classList.contains('expanded');
      statBoxes.forEach(function (b) { b.classList.remove('expanded'); });
      if (!isExpanded) {
        box.classList.add('expanded');
      }
    });
  });

  // ── FAQ ACCORDION ──
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var heading = item.querySelector('h3');
    if (!heading) return;

    heading.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      // close all
      faqItems.forEach(function (fi) { fi.classList.remove('open'); });

      // open clicked one if it was closed
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // ── SCROLL FADE-IN ──
  var fadeEls = document.querySelectorAll('section');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    fadeEls.forEach(function (el) {
      el.classList.add('fade-section');
      observer.observe(el);
    });
  } else {
    // fallback: just show everything
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ── ADD FADE-IN CSS DYNAMICALLY ──
  var style = document.createElement('style');
  style.textContent = [
    '.fade-section {',
    '  opacity: 0;',
    '  transform: translateY(18px);',
    '  transition: opacity 0.55s ease, transform 0.55s ease;',
    '}',
    '.fade-section.visible {',
    '  opacity: 1;',
    '  transform: none;',
    '}'
  ].join('\n');
  document.head.appendChild(style);

})();

