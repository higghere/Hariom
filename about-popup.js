/* ============================================================
   about-popup.js — About Us popup for Hariom Group
   Opens on "About Us" nav click, cycles 4 alternating slides
   ============================================================ */

(function () {

  var popup      = document.getElementById('aboutPopup');
  var backdrop   = popup.querySelector('.about-popup-backdrop');
  var closeBtn   = document.getElementById('aboutPopupClose');
  var prevBtn    = document.getElementById('aboutPrev');
  var nextBtn    = document.getElementById('aboutNext');
  var dotsWrap   = document.getElementById('aboutDots');
  var slideNumEl = document.getElementById('aboutSlideNum');
  var slidesWrap = document.getElementById('aboutPopupSlides');
  var slides     = Array.prototype.slice.call(
                     slidesWrap.querySelectorAll('.about-slide'));

  var total      = slides.length;
  var current    = 0;
  var dots       = [];

  document.getElementById('aboutSlideTotal').textContent = total;

  // ── Build dots ──
  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'about-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
    dots.push(dot);
  });

  // ── Slide runner ──
  function goTo(idx) {
    if (idx < 0 || idx >= total) return;

    // remove active from old slide
    slides[current].classList.remove('is-active');

    current = idx;

    // Shift all slides via translateX on the wrapper
    slidesWrap.style.transform = 'translateX(-' + (current * 100) + '%)';

    // Activate new slide (triggers CSS entrance animations)
    // small delay so the transform starts first
    setTimeout(function () {
      slides[current].classList.add('is-active');
    }, 30);

    // Update counter & dots
    slideNumEl.textContent = current + 1;
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });

    prevBtn.disabled = (current === 0);
    nextBtn.disabled = (current === total - 1);
  }

  // Make the slides wrapper work as a horizontal track
  slidesWrap.style.display       = 'flex';
  slidesWrap.style.flexDirection = 'row';
  slidesWrap.style.transition    = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  slidesWrap.style.willChange    = 'transform';

  // ── Open / Close ──
  function openPopup() {
    // Reset to first slide
    current = 0;
    slides.forEach(function (s) { s.classList.remove('is-active'); });
    slidesWrap.style.transition = 'none';
    slidesWrap.style.transform  = 'translateX(0)';

    popup.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Re-enable transitions after paint
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        slidesWrap.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        slides[0].classList.add('is-active');
      });
    });

    slideNumEl.textContent = 1;
    dots.forEach(function (d, i) { d.classList.toggle('active', i === 0); });
    prevBtn.disabled = true;
    nextBtn.disabled = (total <= 1);

    closeBtn.focus();
  }

  function closePopup() {
    popup.classList.remove('is-open');
    document.body.style.overflow = '';
    // return focus to the trigger button
    var trigger = document.getElementById('aboutNavBtn');
    if (trigger) trigger.focus();
  }

  // ── Event listeners ──
  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });
  closeBtn.addEventListener('click', closePopup);
  backdrop.addEventListener('click', closePopup);

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (!popup.classList.contains('is-open')) return;
    if (e.key === 'Escape')      closePopup();
    if (e.key === 'ArrowRight')  goTo(current + 1);
    if (e.key === 'ArrowLeft')   goTo(current - 1);
  });

  // Touch / swipe support
  var touchStartX = null;
  slidesWrap.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  slidesWrap.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goTo(current + 1);
      else        goTo(current - 1);
    }
    touchStartX = null;
  }, { passive: true });

  // ── Wire up the About Us nav button ──
  var aboutNavBtn = document.getElementById('aboutNavBtn');
  if (aboutNavBtn) {
    aboutNavBtn.addEventListener('click', function (e) {
      openPopup();
    });
  }

  // Also wire up the mobile nav "About Us" link
  var mobileAboutLink = document.querySelector('.mobile-nav-list a[href="#overview"]');
  if (mobileAboutLink) {
    mobileAboutLink.addEventListener('click', function () {
      openPopup();
    });
  }

})();
