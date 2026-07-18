import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (
            id.includes('react-markdown') ||
            id.includes('react-syntax-highlighter') ||
            id.includes('remark-') ||
            id.includes('rehype-') ||
            id.includes('highlight.js') ||
            id.includes('hast-') ||
            id.includes('mdast-') ||
            id.includes('micromark') ||
            id.includes('unified')
          ) {
            return 'markdown'
          }

          if (id.includes('socket.io-client') || id.includes('engine.io-client')) {
            return 'realtime'
          }

          if (
            id.includes('three') ||
            id.includes('ogl') ||
            id.includes('postprocessing') ||
            id.includes('@react-three')
          ) {
            return 'graphics'
          }

          if (id.includes('@reduxjs') || id.includes('react-redux')) {
            return 'state'
          }

          if (id.includes('react-router')) {
            return 'router'
          }

          if (id.includes('react') || id.includes('react-dom')) {
            return 'react'
          }
        }
      }
    }
  },
})
