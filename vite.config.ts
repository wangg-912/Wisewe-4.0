import { resolve, join } from 'path';
import { UserConfig } from 'vite';
import dotenv from 'dotenv';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import html from 'vite-plugin-html';
import viteImagemin from 'vite-plugin-imagemin';

dotenv.config({ path: join(__dirname, '.env') });

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

const config: UserConfig = {
  resolve: {
    alias: [
      {
        find: /^\/@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
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
  assetsInclude: ['png', 'jpe?g', 'gif', 'svg', 'ico', 'woff2?', 'eot', 'ttf', 'otf'],
  server: {
    port: +process.env.PORT,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://192.168.2.44:8018',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: {
      overlay: true,
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
      },
    },
    brotliSize: false,
    rollupOptions: {
      output: { manualChunks: { 'element-plus': ['element-plus'] } },
    },
    chunkSizeWarningLimit: 1500,
  },
  optimizeDeps: {
    include: ['axios', 'nprogress'],
  },
  plugins: [
    vue(),
    vueJsx(),
    html({
      inject: {
        injectData: {
          title: `${process.env.VITE_GLOB_APP_TITLE}`,
        },
      },
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      webp: {
        quality: 75,
      },
      mozjpeg: {
        quality: 65,
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            removeViewBox: false,
          },
          {
            removeEmptyAttrs: false,
          },
        ],
      },
    }),
  ],
};
// https://vitejs.dev/config/
export default config;
