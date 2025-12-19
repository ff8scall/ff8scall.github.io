import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const toolsPath = path.resolve(__dirname, 'src/data/tools.js');

console.log('--- Checking vite-plugin-prerender ---');
try {
    // Try to mimic vite.config.js
    const plugin = require('vite-plugin-prerender');
    console.log('Type of plugin:', typeof plugin);
    console.log('Is function?', typeof plugin === 'function');
    if (plugin && typeof plugin === 'object') {
        console.log('Keys:', Object.keys(plugin));
    }
} catch (e) {
    console.error('Failed to require plugin:', e.message);
}

console.log('--- Checking Route Extraction ---');
try {
    const toolsContent = fs.readFileSync(toolsPath, 'utf-8');
    const regex = /path:\s*'([^']+)'/g;
    const matches = toolsContent.matchAll(regex);
    const routes = ['/'];
    for (const match of matches) {
        routes.push(match[1]);
    }
    console.log('Extracted routes count:', routes.length);
    if (routes.length > 1) {
        console.log('Sample routes:', routes.slice(0, 5));
    } else {
        console.log('WARNING: Only root route extracted!');
        // Debug regex failure - check specific snippet
        const index = toolsContent.indexOf('path:');
        if (index !== -1) {
            console.log('Snippet around first path:', toolsContent.substring(index, index + 30));
        }
    }
} catch (e) {
    console.error('Failed to read tools.js:', e.message);
    console.error('Looking at path:', toolsPath);
}
