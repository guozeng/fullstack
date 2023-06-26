import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mkcert(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      resolvers: [ElementPlusResolver()],
      dirs: ['./utils/**'],
      vueTemplate: true,
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    https: true,
  },
  resolve: {
    alias: {
      '@v': 'src/views',
    },
  },
})
