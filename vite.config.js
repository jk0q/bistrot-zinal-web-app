import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bistrot-zinal-web-app/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
