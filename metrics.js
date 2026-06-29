/*
 * Publication metrics module.
 * Live citation count from Crossref for any publication with a DOI.
 * No API key, no caching on our side. Fails safe: if Crossref is down,
 * slow, or unreachable, the badge simply disappears — the page is unaffected.
 *
 * Usage:
 *   1. Placeholder: <span class="pub-metric" data-doi="10.x/x" data-metric-pending></span>
 *   2. After list renders: window.PubMetrics.render(container);
 */
window.PubMetrics = (function () {
  const CROSSREF = 'https://api.crossref.org/works/';
  const MAILTO   = 'bose.sankhadeep@pm.me';   // Crossref "polite pool"
  const TIMEOUT  = 8000;                       // give up after 8 s

  async function fetchCitationCount(doi) {
    const url = `${CROSSREF}${encodeURIComponent(doi)}?mailto=${encodeURIComponent(MAILTO)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);
    try {
      const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
      if (!res.ok) throw new Error('Crossref HTTP ' + res.status);
      const data = await res.json();
      const count = data && data.message ? data.message['is-referenced-by-count'] : null;
      return typeof count === 'number' ? count : null;
    } finally {
      clearTimeout(timer);
    }
  }

  function fillBadge(el, count) {
    const noun = count === 1 ? 'citation' : 'citations';
    el.innerHTML = `<i class="fas fa-quote-left" aria-hidden="true"></i> ${count} ${noun}`;
    el.title = `Cited ${count} time${count === 1 ? '' : 's'} (source: Crossref)`;
    el.classList.add('is-loaded');
    el.removeAttribute('data-metric-pending');
  }

  // Each badge resolves independently — one slow/failed DOI never blocks the rest.
  function render(root) {
    root = root || document;
    root.querySelectorAll('.pub-metric[data-doi]').forEach(el => {
      const doi = el.getAttribute('data-doi');
      if (!doi) { el.remove(); return; }
      fetchCitationCount(doi)
        .then(count => { count === null ? el.remove() : fillBadge(el, count); })
        .catch(err => {
          console.warn('Citation metrics unavailable for DOI', doi, err);
          el.remove();   // fail quietly
        });
    });
  }

  return { render, fetchCitationCount };
})();
