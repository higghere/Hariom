/* ============================================================
   counter.js — Trees Saved Counter for Hariom Group
   - Counts from 0 to 1200 in steps of 10
   - One step every second (so full cycle = 120 seconds)
   - Resets back to 0 and loops endlessly
   - Updates both the number display and the progress bar
   ============================================================ */

(function () {
  var MAX = 1200;
  var STEP = 10;
  var INTERVAL_MS = 1000; // 1 second per step

  var countEl = document.getElementById('treesCount');
  var barEl   = document.getElementById('treesBar');

  if (!countEl || !barEl) return;

  var current = 0;

  function updateDisplay() {
    countEl.textContent = current.toLocaleString('en-IN');
    barEl.style.width = ((current / MAX) * 100).toFixed(2) + '%';
  }

  function tick() {
    current += STEP;
    if (current > MAX) {
      current = 0;
    }
    updateDisplay();
  }

  // set initial display
  updateDisplay();

  // start the loop
  setInterval(tick, INTERVAL_MS);
})();
