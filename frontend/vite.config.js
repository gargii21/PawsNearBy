
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'your-repo-name' with your GitHub repo name
export default defineConfig({
  base: '/PawsNearBy/',
  plugins: [react()],
})
