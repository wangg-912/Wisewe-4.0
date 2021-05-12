import { loadEnv, defineConfig } from 'vite';
import { resolve, join } from 'path';
import { UserConfig } from 'vite';
import dotenv from 'dotenv';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import html from 'vite-plugin-html';
import viteImagemin from 'vite-plugin-imagemin';
import resolveExternalsPlugin from 'vite-plugin-resolve-externals';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';

dotenv.config({ path: join(__dirname, '.env') });

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

export default ({ command, mode }): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    define: {
      'process.env': {},
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
      port: VITE_PORT,
      open: true,
      https: false,
      proxy: createProxy(VITE_PROXY),
      hmr: {
        overlay: true,
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      polyfillDynamicImport: VITE_LEGACY,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
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
      resolveExternalsPlugin({
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
      }),
    ],
  };
};
