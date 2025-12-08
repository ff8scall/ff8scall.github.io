import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const vitePrerender = require('vite-plugin-prerender')

// Helper to extract paths from tools.js without importing it
const getRoutes = () => {
  try {
    const toolsContent = fs.readFileSync(path.resolve(__dirname, 'src/data/tools.js'), 'utf-8');
    const matches = toolsContent.matchAll(/path:\s*'([^']+)'/g);
    const routes = ['/']; // Add root
    for (const match of matches) {
      routes.push(match[1]);
    }
    return routes;
  } catch (e) {
    console.warn('Failed to read tools.js for prerendering:', e);
    return ['/'];
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: getRoutes(),
      renderer: new vitePrerender.PuppeteerRenderer({
        maxConcurrentRoutes: 1,
        renderAfterTime: 1000, // Wait a bit for content to load
      }),
    }),
  ],
  base: '/',
})
