import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-userscript',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/Crack-Bridge.user.js' || req.url === '/Crack-Bridge') {
            try {
              const filePath = path.resolve(__dirname, 'Crack-Bridge');
              const content = fs.readFileSync(filePath, 'utf-8');
              res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(content);
              return;
            } catch (err) {
              next(err);
              return;
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true
  }
});
