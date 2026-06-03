/* ============================================================
   main.js — General interactions for Hariom Group website
   - About blob expand/collapse
   - Scroll photo strip animation
   - Stat box expand/collapse
   - FAQ accordion toggle
   - Scroll-reveal fade-in on sections
   ============================================================ */

(function () {

  // ── ABOUT BLOB TOGGLE (also callable from inline onclick) ──
  window.toggleBlob = function () {
    var full   = document.getElementById('aboutBlobFull');
    var toggle = document.getElementById('blobToggle');
    if (!full) return;
    var isOpen = full.classList.contains('open');
    full.classList.toggle('open', !isOpen);
    if (toggle) {
      toggle.innerHTML = isOpen
        ? 'Read More <i class="fa-solid fa-chevron-down"></i>'
        : 'Read Less <i class="fa-solid fa-chevron-up"></i>';
    }
  };

  // ── SCROLL PHOTO STRIP ──
  var photoItems = document.querySelectorAll('.photo-item');

  if ('IntersectionObserver' in window && photoItems.length) {
    var photoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // stagger each photo slightly
          var idx = Array.prototype.indexOf.call(photoItems, entry.target);
          setTimeout(function () {
            entry.target.classList.add('in-view');
          }, idx * 120);
          photoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    photoItems.forEach(function (el) {
      photoObserver.observe(el);
    });
  } else {
    photoItems.forEach(function (el) { el.classList.add('in-view'); });
  }

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
