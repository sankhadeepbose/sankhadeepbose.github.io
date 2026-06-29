/*
 * Publication metrics module.
 * Fetches citation counts from Crossref for any publication that has a DOI,
 * then fills in the matching placeholder badges on the Publications page.
 *
 * Usage:
 *   1. Render a placeholder where you want the badge:
 *        <span class="pub-metric" data-doi="10.xxxx/xxxx"></span>
 *   2. Once the list is in the DOM, call:
 *        window.PubMetrics.render(container);
 *
 * Crossref is free, needs no API key, and is CORS-enabled.
 */
window.PubMetrics = (function () {
  // Crossref "polite pool": sending a contact e-mail gives more reliable service.
  const MAILTO = 'bose.sankhadeep@pm.me';

  async function fetchCitationCount(doi) {
    const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}`
              + `?mailto=${encodeURIComponent(MAILTO)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Crossref HTTP ' + res.status);
    const data = await res.json();
    const count = data && data.message ? data.message['is-referenced-by-count'] : null;
    return typeof count === 'number' ? count : null;
  }

  function fillBadge(el, count) {
    const noun = count === 1 ? 'citation' : 'citations';
    el.innerHTML = `<i class="fas fa-quote-left" aria-hidden="true"></i> ${count} ${noun}`;
    el.title = `Cited ${count} time${count === 1 ? '' : 's'} (source: Crossref)`;
    el.classList.add('is-loaded');
    el.removeAttribute('data-metric-pending');
  }

  // Fetch sequentially — gentle on the API and fine for a handful of papers.
  async function render(root) {
    root = root || document;
    const nodes = root.querySelectorAll('.pub-metric[data-doi]');
    for (const el of nodes) {
      const doi = el.getAttribute('data-doi');
      if (!doi) { el.remove(); continue; }
      try {
        const count = await fetchCitationCount(doi);
        if (count === null) { el.remove(); continue; }
        fillBadge(el, count);
      } catch (err) {
        console.warn('Citation metrics unavailable for DOI', doi, err);
        el.remove();   // fail quietly — never show a broken badge
      }
    }
  }

  return { render, fetchCitationCount };
})();
