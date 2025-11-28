import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // ВАЖНО: Это делает пути относительными, чтобы сайт работал на Cloud.ru
})