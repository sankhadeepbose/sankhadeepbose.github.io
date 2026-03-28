(function () {
  let n = parseInt(localStorage.getItem('entropy') || '0', 10);

  function msg(n) {
    if (n === 0)    return 'The universe awaits.';
    if (n === 1)    return '1 J·K⁻¹ — the Second Law approves.';
    if (n < 10)     return n + ' J·K⁻¹ — disorder is building.';
    if (n === 10)   return '10 J·K⁻¹ — Boltzmann nods approvingly.';
    if (n < 42)     return n + ' J·K⁻¹ — irreversibility in progress.';
    if (n === 42)   return '42 J·K⁻¹ — the thermodynamic answer to everything.';
    if (n < 100)    return n + ' J·K⁻¹ — you\'re on a roll.';
    if (n === 100)  return '100 J·K⁻¹ — practically a spontaneous process.';
    if (n < 1000)   return n + ' J·K⁻¹ — deep in the irreversible regime.';
    if (n === 1000) return '1000 J·K⁻¹ — heat death, one click at a time.';
    return n + ' J·K⁻¹ — at this rate, you\'ll outlast the cosmos.';
  }

  function updateDisplay() {
    const el = document.getElementById('entropy-msg');
    if (el) el.textContent = msg(n);
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateDisplay();
    const btn = document.getElementById('entropy-btn');
    if (btn) btn.addEventListener('click', function () {
      n++;
      localStorage.setItem('entropy', n);
      updateDisplay();
    });
  });
})();
