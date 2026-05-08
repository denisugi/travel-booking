import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'laravel',
      enforce: 'pre',
      handleHotUpdate({ server, file, modules }) {
        server.ws.send({ type: 'full-reload' })
        return modules
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'public/build',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'resources/js/app.tsx'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})
