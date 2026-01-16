import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/api-tasks-frontend/', // ⬅️ nome do repositório
  plugins: [
    react(),
    tailwindcss(),
  ],
})
