/*
 * Dynamic component loader for the academic website.
 * Fetches the shared header and sidebar HTML fragments and injects them
 * into the page, then marks the current page's nav link as active.
 */

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

async function init() {
  // Load header first so we can set the active nav link immediately after
  await loadComponent('header-container', 'header.html');

  // Mark the active nav link based on the current page filename
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (!page && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Sidebar can load in parallel (no dependencies)
  loadComponent('sidebar-container', 'sidebar.html');
}

document.addEventListener('DOMContentLoaded', init);
