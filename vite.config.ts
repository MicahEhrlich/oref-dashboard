import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // exposes on local network (0.0.0.0)
    port: 5173,
    proxy: {
      '/api/alerts': {
        target: 'https://www.oref.org.il',
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          '/warningMessages/alert/History/AlertsHistory.json',
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('X-Requested-With', 'XMLHttpRequest')
            proxyReq.setHeader('Referer', 'https://www.oref.org.il/')
          })
        },
      },
    },
  },
})
