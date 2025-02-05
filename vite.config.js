// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// filepath: /c:/Users/jeswa/Desktop/Gen Ai CLone/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // base: '/GEN-AI_Clone/', // Source path
  build: {
    outDir: 'dist'
  }
});