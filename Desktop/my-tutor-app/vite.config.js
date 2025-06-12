import { defineConfig } from 'vite'

export default defineConfig({
  base: '/indian-language-tutors/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        home: 'home.html'
      }
    }
  }
})
