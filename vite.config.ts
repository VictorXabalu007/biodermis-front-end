import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Limita o número de processos de build paralelos
    brotliSize: false, // Desativa o cálculo de brotli
    cssCodeSplit: false, // Agrupa todo CSS em um único arquivo
    rollupOptions: {
      output: {
        manualChunks: undefined, // Desativa a divisão de chunks
      }
    }
  }
})
