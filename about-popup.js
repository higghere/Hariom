/* ============================================================
   about-popup.js — Netflix-style About Us overlay
   Click card → fullscreen panel slides up
   Scroll inside panel → elements animate in from sides
   ============================================================ */

(function () {

  var popup    = document.getElementById('aboutPopup');
  var closeBtn = document.getElementById('aboutPopupClose');
  var panel    = document.getElementById('aboutPopupPanel');

  if (!popup || !panel) return;

  // ── Open ──
  function openPopup() {
    popup.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    // reset scroll inside panel
    panel.scrollTop = 0;
    // trigger scroll-reveal for items already in view
    setTimeout(checkReveal, 80);
    closeBtn.focus();
  }

  // ── Close ──
  function closePopup() {
    popup.classList.remove('is-open');
    document.body.style.overflow = '';
    // reset all reveal items so they re-animate next open
    var items = panel.querySelectorAll('.reveal-item');
    items.forEach(function (el) { el.classList.remove('revealed'); });
  }

  // ── Scroll-reveal inside the panel ──
  var revealItems = [];

  function checkReveal() {
    var panelRect = panel.getBoundingClientRect();
    var items = panel.querySelectorAll('.reveal-item:not(.revealed)');
    items.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      // visible if top of element is within the panel viewport
      if (rect.top < panelRect.bottom - 60) {
        el.classList.add('revealed');
      }
    });
  }

  panel.addEventListener('scroll', checkReveal, { passive: true });

  // ── Wire triggers ──
  // Compact card click
  var card = document.getElementById('aboutCard');
  if (card) card.addEventListener('click', openPopup);

  // Nav button click
  var aboutNavBtn = document.getElementById('aboutNavBtn');
  if (aboutNavBtn) {
    aboutNavBtn.addEventListener('click', function () {
      // only open popup, don't scroll
      openPopup();
    });
  }

  // Mobile nav link
  var mobileLink = document.querySelector('.mobile-nav-list a[href="#overview"]');
  if (mobileLink) {
    mobileLink.addEventListener('click', function (e) {
      e.preventDefault();
      openPopup();
    });
  }

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // Backdrop click
  popup.addEventListener('click', function (e) {
    if (e.target === popup) closePopup();
  });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup.classList.contains('is-open')) closePopup();
  });

})();
