const fs = require('fs');
const m = { exports: {} };
new Function('module', 'exports', 'self', 'window', 'globalThis', fs.readFileSync('scripts/lucide.min.js', 'utf8'))(m, m.exports, {}, {}, {});
const L = m.exports;
const kebab = n => n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const have = new Set(Object.keys(L.icons || {}).map(kebab));
Object.keys(L.aliases || {}).forEach(a => have.add(kebab(a)));
const used = new Set();
const files = fs.readdirSync('.').filter(x => x.endsWith('.html')).concat(fs.readdirSync('js').map(x => 'js/' + x));
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  for (const mm of t.matchAll(/data-lucide=["']([a-z0-9-]+)/g)) used.add(mm[1]);
}
console.log('library icons:', have.size, '| used:', used.size);
console.log('MISSING:', [...used].filter(u => !have.has(u)).join(', ') || 'none');
