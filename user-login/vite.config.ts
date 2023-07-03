import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mkcert(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      resolvers: [ElementPlusResolver()],
      vueTemplate: true,
    }),
    Components({
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver()],
    }),
    WindiCSS(),
  ],
  server: {
    https: true,
    proxy: {
      '/test': {
        target: 'http://172.18.3.163:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/test/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@v': '/src/views',
      '@u': '/src/utils',
    },
  },
})
