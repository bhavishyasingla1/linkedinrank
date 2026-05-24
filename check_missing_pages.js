const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const seoConfigContent = fs.readFileSync(path.join(__dirname, 'lib/seoConfig.ts'), 'utf-8');
const slugs = [...seoConfigContent.matchAll(/slug: '([^']+)'/g)].map(m => m[1]);

const appDirs = fs.readdirSync(path.join(__dirname, 'app'), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

console.log('Slugs in seoConfig.ts not in app/:');
const missing = slugs.filter(slug => !appDirs.includes(slug));
console.log(missing);

const blogContent = fs.readFileSync(path.join(__dirname, 'lib/blogData.ts'), 'utf-8');
const blogSlugs = [...blogContent.matchAll(/slug: '([^']+)'/g)].map(m => m[1]);
console.log('Total Blog Posts in blogData.ts:', blogSlugs.length);

const toolsConfig = fs.readFileSync(path.join(__dirname, 'lib/toolsConfig.ts'), 'utf-8');
const toolSlugs = [...toolsConfig.matchAll(/slug: '([^']+)'/g)].map(m => m[1]);
console.log('Total Tools in toolsConfig.ts:', toolSlugs.length);

