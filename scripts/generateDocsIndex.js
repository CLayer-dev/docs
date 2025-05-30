const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '../docs');
const OUTPUT_FILE = path.join(__dirname, '../static/docs-index.json');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(filePath);
    }
  });
  return results;
}

function extractDocData(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);
  const title = data.title || path.basename(filePath, path.extname(filePath));
  // Get relative path for linking
  const relPath = filePath.replace(DOCS_DIR, '').replace(/\\/g, '/').replace(/\.(md|mdx)$/, '');
  return {
    title,
    body: body.replace(/\n/g, ' ').slice(0, 1000), // limit for performance
    url: '/docs' + relPath,
  };
}

function main() {
  const files = walk(DOCS_DIR);
  const docs = files.map(extractDocData);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(docs, null, 2));
  console.log(`Indexed ${docs.length} docs to ${OUTPUT_FILE}`);
}

main(); 