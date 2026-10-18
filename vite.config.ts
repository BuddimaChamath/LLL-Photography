import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            // React changes rarely — keep it in its own long-cached chunk.
            manualChunks: { react: ['react', 'react-dom'] },
          },
        },
  },
}))
