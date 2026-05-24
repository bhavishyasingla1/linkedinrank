const fs = require('fs');
const path = require('path');

const seoConfigContent = fs.readFileSync(path.join(__dirname, 'lib/seoConfig.ts'), 'utf-8');
const seoSlugs = [...seoConfigContent.matchAll(/slug: '([^']+)'/g)].map(m => m[1]);

const blogContent = fs.readFileSync(path.join(__dirname, 'lib/blogData.ts'), 'utf-8');
const blogSlugs = [...blogContent.matchAll(/slug: '([^']+)'/g)].map(m => m[1]).map(slug => 'blogs/' + slug);

const toolsConfig = fs.readFileSync(path.join(__dirname, 'lib/toolsConfig.ts'), 'utf-8');
const toolSlugs = [...toolsConfig.matchAll(/slug: '([^']+)'/g)].map(m => m[1]).map(slug => 'tools/' + slug);

const corePages = ['about', 'methodology', 'faq', 'how-linkedin-rank-works', 'story', 'contact', 'privacy', 'terms', 'disclaimer', 'cookie-policy', 'data-security', 'score', 'rank', 'linkedin', 'tools', 'blogs', ''];

const allValidPaths = new Set([...seoSlugs, ...blogSlugs, ...toolSlugs, ...corePages].map(p => '/' + p));

// Also read redirects
const nextConfigStr = fs.readFileSync(path.join(__dirname, 'next.config.js'), 'utf-8');
const redirects = [...nextConfigStr.matchAll(/source:\s*'([^']+)'/g)].map(m => m[1]);
redirects.forEach(r => allValidPaths.add(r));

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (!dirPath.includes('node_modules') && !dirPath.includes('.git') && !dirPath.includes('.next')) {
                walkDir(dirPath, callback);
            }
        } else {
            if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts') || dirPath.endsWith('.js') || dirPath.endsWith('.md')) {
                callback(path.join(dir, f));
            }
        }
    });
}

let brokenLinks = [];

walkDir(__dirname, function(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    // find href="/..." or href='/...' or Link href="..."
    const regex = /href=(["'])(?:\/)([^"']*)(["'])/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        let linkPath = '/' + match[2];
        if (linkPath.includes('?')) linkPath = linkPath.split('?')[0];
        if (linkPath.includes('#')) linkPath = linkPath.split('#')[0];
        if (linkPath.endsWith('/') && linkPath.length > 1) linkPath = linkPath.slice(0, -1);
        
        // Skip external or special paths
        if (linkPath.startsWith('/api') || linkPath.startsWith('/_next') || linkPath.includes(':')) continue;
        
        if (!allValidPaths.has(linkPath)) {
            brokenLinks.push({ file: filePath, link: linkPath });
        }
    }
});

console.log('Broken Links Found:');
const uniqueBroken = [...new Set(brokenLinks.map(b => b.link))];
uniqueBroken.forEach(link => {
    console.log(link);
    brokenLinks.filter(b => b.link === link).forEach(b => console.log('  in', b.file));
});
