// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/dev': {
        target: 'https://fnlclp5rqe.execute-api.us-east-1.amazonaws.com/dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev/, ''),
      },
    },
  },
});
