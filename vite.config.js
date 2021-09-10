import {defineConfig} from 'vite';

export default defineConfig({
    base:'/portfolio/',
    server: {
      open: '/dist/index.html'
    }
  })