import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find: "@", replacement: "/src/*"},
      {find: "@modal", replacement: "/src/components/modal/index.jsx"},
      {find: "@ui", replacement: "/src/components/ui/index.jsx"},
      {find: "@upload", replacement: "/src/components/uploades/index.jsx"},
      {find: "@pages", replacement: "/src/pages/index.jsx"},
      {find: "@routes", replacement: "/src/router/routes.jsx"},
      {find: "@notification", replacement: "/src/utils/notification.js"},
      {find: "@validation", replacement: "/src/utils/validation.js"},
      {find: "@service", replacement: "/src/service/index.js"},
    ]
  }
})
