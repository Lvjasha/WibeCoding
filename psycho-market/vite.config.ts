import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // относительные пути ресурсов: сборка одинаково работает на localhost
  // и на GitHub Pages, где сайт лежит в подпапке /WibeCoding/
  base: './',
  server: { port: 5173 },
})
