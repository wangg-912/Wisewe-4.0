import { resolve, join } from 'path';
import { UserConfig } from 'vite';
import dotenv from 'dotenv';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
dotenv.config({ path: join(__dirname, '.env') });

const alias = parseAlias({
  '': 'src',
  component: 'src/components',
});

function parseAlias(config) {
  const _config = {};
  //find: /^\/@\//,replacement: pathResolve('src') + '/',
  Object.keys(config).forEach((i) => (_config[`/@${i}/`] = resolve(__dirname, config[i]) + '/'));
  return _config;
}

const config: UserConfig = {
  resolve: {
    alias,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/style/variables/variable.scss";
        @import "src/style/variables/element-variables.scss";
        @import "src/style/variables/screen.scss";`,
      },
    },
  },
  server: {
    port: +process.env.PORT,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://192.168.2.44:8018',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    hmr: {
      overlay: true,
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    sourcemap: false,
    manifest: true,
    assetsInlineLimit: 100000, // 静态资源阈值，默认：4096（4kb），小于此阈值的导入或引用资产将内联为base64 URL，以避免额外的http请求。设置为0完全禁用内联。
  },
  optimizeDeps: {
    include: ['axios', 'nprogress'],
    exclude: ['electron-is-dev'],
  },
  plugins: [vue(), vueJsx()],
}
// https://vitejs.dev/config/
export default config;
