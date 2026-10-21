import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    base: process.env.BASE_PATH || './',
    plugins: [
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
