import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

const alias = parseAlias({
  '': 'src',
  'component': 'src/components'
});

function parseAlias(config) {
  const _config = {};
  //find: /^\/@\//,replacement: pathResolve('src') + '/',
  Object.keys(config).forEach(i => _config[`/@${i}/`] = resolve(__dirname, config[i]) + '/');
  return _config;
}


// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias
  },
  server: {
    host: '192.168.2.44',
    port: 9404,
    open: true,
    https: false,
    proxy: {
        '/api': {
            target: '/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    },
    hmr: {
      overlay: true,
    },
  },
  build:{
    sourcemap:false,
    assetsInlineLimit:100000 // 静态资源阈值，默认：4096（4kb），小于此阈值的导入或引用资产将内联为base64 URL，以避免额外的http请求。设置为0完全禁用内联。

  },
  optimizeDeps:{
    include:['axios', 'nprogress']
  },
  plugins: [vue()]
})
