import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' 让静态资源路径相对化，仓库名任意、部署在根目录或子目录都能正常加载
export default defineConfig({
  base: './',
  plugins: [react()],
})
