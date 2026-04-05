function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/legal/')) return '../../';
  if (path.includes('/pages/')) return '../';
  return './';
}

async function loadComponents() {
  const basePath = getBasePath();
  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch(`${basePath}header.html`),
      fetch(`${basePath}footer.html`)
    ]);

    let headerHtml = await headerRes.text();
    let footerHtml = await footerRes.text();

    const pathRegex = /(href|src)="\.\/([^"]+)"/g;
    headerHtml = headerHtml.replace(pathRegex, `$1="${basePath}$2"`);
    footerHtml = footerHtml.replace(pathRegex, `$1="${basePath}$2"`);

    document.getElementById('header-placeholder').innerHTML = headerHtml;
    document.getElementById('footer-placeholder').innerHTML = footerHtml;

    if (typeof initMobileMenu === 'function') initMobileMenu();
    if (typeof initSearch === 'function') initSearch(basePath);
  } catch (error) {
    console.error("Component load failed:", error);
  }
}

document.addEventListener('DOMContentLoaded', loadComponents);
