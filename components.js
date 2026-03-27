/*
 * Dynamic component loader + theme toggle for the academic website.
 */

/* ── Theme: apply saved or system preference immediately ── */
(function () {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();

async function loadComponent(id, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
    const container = document.getElementById(id);
    if (container) container.innerHTML = await response.text();
  } catch (err) {
    console.error(err);
  }
}

function isDarkActive() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark') return true;
  if (attr === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function syncToggleIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  icon.className = isDarkActive() ? 'fas fa-sun' : 'fas fa-moon';
}

function toggleTheme() {
  const next = isDarkActive() ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  syncToggleIcon();
}

async function init() {
  await loadComponent('header-container', 'header.html');

  /* Mark active nav link */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === page || (!page && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* Wire up toggle button */
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', toggleTheme);
  syncToggleIcon();

  loadComponent('sidebar-container', 'sidebar.html');
}

document.addEventListener('DOMContentLoaded', init);
