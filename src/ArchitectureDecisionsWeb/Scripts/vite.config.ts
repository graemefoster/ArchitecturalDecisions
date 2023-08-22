import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../wwwroot',
        emptyOutDir: false,
        sourcemap: 'inline',
        rollupOptions: {
            output: {
                entryFileNames: 'assets/index.js',
            }
        }
    },
})