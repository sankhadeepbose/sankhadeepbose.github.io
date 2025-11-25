/*
 * Dynamic component loader for the academic website.
 *
 * This script fetches reusable HTML fragments (e.g. sidebar and header)
 * from separate files and injects them into the page. This approach
 * keeps the page templates clean and avoids duplicating markup across
 * multiple pages. When new components are added (e.g. footer or
 * additional panels), simply add another call to loadComponent() in
 * the DOMContentLoaded handler below.
 */

async function loadComponent(id, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load component from ${url}: ${response.status}`);
    }
    const html = await response.text();
    const container = document.getElementById(id);
    if (container) {
      container.innerHTML = html;
    } else {
      console.warn(`Container with id '${id}' not found in the document.`);
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Load the left sidebar into the sidebar-container
  loadComponent('sidebar-container', 'sidebar.html');
  // Load the page header into the header-container
  loadComponent('header-container', 'header.html');
});