// Simple site validator using Node.js and jsdom
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const siteRoot = path.resolve(__dirname, '..');
const htmlFiles = ['index.html','services.html','pricing.html','integrations.html','resources.html','about.html','contact.html','login.html','portal.html'];

let issues = [];

function fileExists(p) {
  try { return fs.statSync(p).isFile(); } catch { return false; }
}

htmlFiles.forEach(file => {
  const fullPath = path.join(siteRoot, file);
  if (!fileExists(fullPath)) { issues.push(`${file} not found`); return; }
  const html = fs.readFileSync(fullPath, 'utf-8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Check images
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http')) {
      const imgPath = path.join(siteRoot, src);
      if (!fileExists(imgPath)) {
        issues.push(`Broken image src '${src}' in ${file}`);
      }
    }
  });

  // Check link hrefs (internal)
  document.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && href.trim() !== '') {
      const targetPath = path.join(siteRoot, href.split('#')[0]);
      if (!fileExists(targetPath)) {
        issues.push(`Broken link href '${href}' in ${file}`);
      }
    }
  });

  // Check script src
  document.querySelectorAll('script[src]').forEach(s => {
    const src = s.getAttribute('src');
    if (src && !src.startsWith('http')) {
      const scriptPath = path.join(siteRoot, src);
      if (!fileExists(scriptPath)) {
        issues.push(`Missing script src '${src}' in ${file}`);
      }
    }
  });

  // Check stylesheet links
  document.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
    const href = l.getAttribute('href');
    if (href && !href.startsWith('http')) {
      const cssPath = path.join(siteRoot, href);
      if (!fileExists(cssPath)) {
        issues.push(`Missing stylesheet href '${href}' in ${file}`);
      }
    }
  });
});

if (issues.length === 0) {
  console.log('All checks passed. No missing assets or broken links.');
} else {
  console.log('Detected issues:');
  issues.forEach(i => console.log('- ' + i));
}

