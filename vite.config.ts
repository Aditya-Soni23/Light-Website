import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function productionRootSync() {
  return {
    name: 'production-root-sync',
    transformIndexHtml: {
      order: 'pre' as const,
      handler(html: string) {
        // In dev or when building, ensure Vite compiles from /src/main.tsx even if index.html references built assets
        let transformed = html;
        if (transformed.includes('assets/index-')) {
          transformed = transformed
            .replace(/<script type="module" crossorigin src=".*?assets\/index-.*?\.js"><\/script>/g, '<script type="module" src="/src/main.tsx"></script>')
            .replace(/<link rel="stylesheet" crossorigin href=".*?assets\/index-.*?\.css">/g, '');
        }
        return transformed;
      },
    },
    closeBundle() {
      // After production build completes, copy dist/index.html and dist/assets to the repository root
      // This guarantees that GitHub Pages serves the production bundle when deploying from master root
      const distHtml = path.join(__dirname, 'dist', 'index.html');
      const rootHtml = path.join(__dirname, 'index.html');
      const distAssets = path.join(__dirname, 'dist', 'assets');
      const rootAssets = path.join(__dirname, 'assets');

      if (fs.existsSync(distHtml)) {
        fs.copyFileSync(distHtml, rootHtml);
      }
      if (fs.existsSync(distAssets)) {
        fs.cpSync(distAssets, rootAssets, { recursive: true, force: true });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: process.env.BASE_PATH || './',
    plugins: [
      productionRootSync(),
      react(),
      tailwindcss(),
      {
        name: 'serve-frames-fallback',
        configureServer(server) {
          server.middlewares.use('/frames', (req, res, next) => {
            const cleanUrl = req.url ? req.url.split('?')[0].replace(/^\//, '') : '';
            const publicPath = path.join(__dirname, 'public/frames', cleanUrl);
            const rootPath = path.join(__dirname, 'frames', cleanUrl);
            const targetPath = fs.existsSync(publicPath) ? publicPath : rootPath;

            if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
              res.setHeader('Content-Type', 'image/jpeg');
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
              fs.createReadStream(targetPath).pipe(res);
            } else {
              next();
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
