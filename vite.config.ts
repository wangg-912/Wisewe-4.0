import { loadEnv } from 'vite';
import { resolve, join } from 'path';
import { UserConfigExport, ConfigEnv } from 'vite';
import dotenv from 'dotenv';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import vueJsx from '@vitejs/plugin-vue-jsx';
import html from 'vite-plugin-html';
import viteImagemin from 'vite-plugin-imagemin';
import WindiCSS from 'vite-plugin-windicss';
import resolveExternalsPlugin from 'vite-plugin-resolve-externals';
import { visualizer } from 'rollup-plugin-visualizer';
import { viteMockServe } from 'vite-plugin-mock';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';

dotenv.config({ path: join(__dirname, '.env') });

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_PROXY,
    VITE_DROP_CONSOLE,
    VITE_LEGACY,
    VITE_GLOB_APP_TITLE,
  } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    define: {
      'process.platform': null,
    },
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
      /* host: '192.168.2.44', */
      port: VITE_PORT,
      open: true,
      https: false,
      proxy: createProxy(VITE_PROXY),
      hmr: {
        overlay: true,
      },
    },
    build: {
      assetsDir: './',
      polyfillDynamicImport: VITE_LEGACY,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_debugger: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      rollupOptions: {
        output: { manualChunks: { 'element-plus': ['element-plus'] } },
      },
      chunkSizeWarningLimit: 1900,
    },
    optimizeDeps: {
      include: ['axios', 'nprogress'],
      exclude: ['vue-demi'],
    },
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      html({
        inject: {
          injectData: {
            title: VITE_GLOB_APP_TITLE,
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
      resolveExternalsPlugin({
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
      }),
      viteMockServe({
        mockPath: 'mock',
        supportTs: true,
        logger: true,
      }),
      visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        template: 'treemap', //sunburst, treemap, network
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  };
};
