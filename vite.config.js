import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = env.VITE_SITE_URL?.trim();
  if (!siteUrl) throw new Error('VITE_SITE_URL must be configured in .env before starting or building the site.');
  const parsedSiteUrl = new URL(siteUrl);
  if (parsedSiteUrl.protocol !== 'https:' || ['localhost', '127.0.0.1'].includes(parsedSiteUrl.hostname)) {
    throw new Error('VITE_SITE_URL must be a public HTTPS URL, never localhost.');
  }
  return {
    plugins: [
      react(),
      {
        name: 'hide-private-notes',
        configureServer(server) {
          server.middlewares.use((request, response, next) => {
            let requestPath = '';
            try {
              requestPath = decodeURIComponent(request.url?.split('?')[0] || '').toLowerCase();
            } catch {
              next();
              return;
            }
            if (requestPath.endsWith('/private_notes.md')) {
              response.statusCode = 404;
              response.end();
              return;
            }
            next();
          });
        },
      },
    ],
  };
});
