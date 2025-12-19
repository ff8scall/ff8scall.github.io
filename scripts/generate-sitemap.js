import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import tools data setup
// Since tools.js is an ES module, we read it as text to avoid import issues in this script context
// or we can try to import it if we are sure about the environment. 
// For robustness against environmental differences (CJS vs ESM), we'll read and regex like the verify script,
// BUT for a production build script, importing is cleaner if it works. 
// Given the project is "type": "module", we should be able to import it.
// However, the verify script used 'createRequire'. Let's stick to the robust regex method 
// matching the verify script which we know works, to avoid transitive dependency issues (Lucide icons etc)
// when running this script in Node environment without a bundler.

const toolsPath = path.resolve(__dirname, '../src/data/tools.js');
const distPath = path.resolve(__dirname, '../dist');
const sitemapPath = path.join(distPath, 'sitemap.xml');

// Base URL - ensuring it matches the user's domain
const BASE_URL = 'https://ff8scall.github.io';

function generateSitemap() {
    console.log('Generating sitemap...');

    if (!fs.existsSync(toolsPath)) {
        console.error(`Error: tools.js not found at ${toolsPath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(toolsPath, 'utf-8');
    const matches = content.matchAll(/path:\s*'([^']+)'/g);

    const urls = [];

    // Add home page
    urls.push({
        loc: `${BASE_URL}/`,
        changefreq: 'weekly',
        priority: '1.0'
    });

    // Add tool pages
    for (const match of matches) {
        const routePath = match[1];
        if (routePath === '/') continue; // Already added

        // Ensure clean URL joining
        const url = `${BASE_URL}${routePath}/`; // Add trailing slash for folder structure
        urls.push({
            loc: url,
            changefreq: 'monthly',
            priority: '0.8'
        });
    }

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
    }

    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log(`Sitemap generated at ${sitemapPath} with ${urls.length} URLs.`);
}

generateSitemap();
