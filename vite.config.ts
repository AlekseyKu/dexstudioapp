import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,  // Автоматически откроет браузер
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    'process.env.DEBUG': true, // Включаем отладку
  },
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000
//   },
//   resolve: {
//     alias: {
//       '@': '/src'
//     }
//   }
// });
