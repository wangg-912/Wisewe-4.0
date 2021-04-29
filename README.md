# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette 5. Search and run "Select TypeScript version" -> "Use workspace version"


# 项目目录

```
evolution-v4
├─ .editorconfig
├─ .env
├─ .eslintignore
├─ .eslintrc.js
├─ babel.config.js
├─ favicon.ico
├─ index.html
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ prettier.config.js
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ api
│  │  └─ app.ts
│  ├─ App.vue
│  ├─ assets
│  │  ├─ fonts
│  │  │  ├─ iconfont.eot
│  │  │  ├─ iconfont.ttf
│  │  │  ├─ iconfont.woff
│  │  │  └─ iconfont.woff2
│  │  ├─ icons
│  │  │  ├─ index.js
│  │  │  └─ svg
│  │  │     ├─ iconfont.json
│  │  │     └─ iconfont.svg
│  │  └─ images
│  │     ├─ 404
│  │     │  ├─ 404.png
│  │     │  └─ 404_cloud.png
│  │     └─ logo
│  │        └─ logo.png
│  ├─ components
│  │  ├─ Applications
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     ├─ AppLogo
│  │  │     │  └─ index.vue
│  │  │     ├─ AppProvider
│  │  │     │  └─ index.vue
│  │  │     └─ useAppContext.ts
│  │  ├─ Drawer
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     ├─ BasicDrawer.vue
│  │  │     ├─ props.ts
│  │  │     ├─ type.ts
│  │  │     └─ useDrawer.ts
│  │  ├─ FontIcon
│  │  │  └─ index.vue
│  │  ├─ home
│  │  │  └─ index.vue
│  │  ├─ Loading
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     ├─ createLoading.ts
│  │  │     ├─ index.vue
│  │  │     ├─ types.ts
│  │  │     └─ useLoading.ts
│  │  └─ SvgIcon
│  │     └─ index.vue
│  ├─ config
│  │  ├─ initAppConfig.ts
│  │  └─ shortName.ts
│  ├─ enums
│  │  ├─ appEnum.ts
│  │  ├─ cacheEnum.ts
│  │  ├─ menuEnum.ts
│  │  └─ windowEnum.ts
│  ├─ hooks
│  │  ├─ core
│  │  │  ├─ useAttrs.ts
│  │  │  ├─ useContext.ts
│  │  │  ├─ useDebounce.ts
│  │  │  └─ useThrottle.ts
│  │  ├─ event
│  │  │  └─ useEventListener.ts
│  │  ├─ setting
│  │  │  ├─ index.ts
│  │  │  ├─ useHeaderSetting.ts
│  │  │  ├─ useMenuSetting.ts
│  │  │  ├─ useRootSetting.ts
│  │  │  ├─ useTagSetting.ts
│  │  │  └─ useTransitionSetting.ts
│  │  └─ web
│  │     ├─ useAppInject.ts
│  │     ├─ useDesign.ts
│  │     ├─ usePage.ts
│  │     ├─ useScrollTo.ts
│  │     └─ useWindow.ts
│  ├─ layout
│  │  ├─ components
│  │  │  ├─ aside
│  │  │  │  ├─ index.vue
│  │  │  │  ├─ item.vue
│  │  │  │  ├─ menus.vue
│  │  │  │  └─ sider.vue
│  │  │  ├─ content
│  │  │  │  └─ index.vue
│  │  │  ├─ feature
│  │  │  │  └─ index.vue
│  │  │  ├─ footer
│  │  │  │  └─ index.vue
│  │  │  ├─ header
│  │  │  │  ├─ components
│  │  │  │  │  ├─ BreadCrumb.vue
│  │  │  │  │  ├─ Screenfull.vue
│  │  │  │  │  └─ Trigger.vue
│  │  │  │  ├─ enums.ts
│  │  │  │  ├─ index.scss
│  │  │  │  └─ index.vue
│  │  │  ├─ setting
│  │  │  │  ├─ components
│  │  │  │  │  ├─ AppTheme.vue
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ LayoutTypePicker.vue
│  │  │  │  │  ├─ SwitchItem.vue
│  │  │  │  │  └─ ThemePicker.vue
│  │  │  │  ├─ enums.ts
│  │  │  │  ├─ handler.ts
│  │  │  │  ├─ index.vue
│  │  │  │  └─ SettingDrawer.tsx
│  │  │  └─ tags
│  │  │     ├─ components
│  │  │     │  └─ QuickPicker.vue
│  │  │     ├─ index.vue
│  │  │     ├─ ScrollPane.vue
│  │  │     └─ useTag.ts
│  │  ├─ iframe
│  │  │  ├─ iframeView.vue
│  │  │  ├─ index.vue
│  │  │  └─ useFrameKeepAlive.ts
│  │  ├─ index.vue
│  │  └─ page
│  │     ├─ index.vue
│  │     ├─ pagePanel.vue
│  │     ├─ transition.ts
│  │     └─ useCache.ts
│  ├─ main.ts
│  ├─ router
│  │  ├─ asyncRouter.ts
│  │  ├─ constant.ts
│  │  ├─ guard
│  │  │  ├─ createPageLoadingGuard.ts
│  │  │  ├─ index.ts
│  │  │  ├─ permissionGuard.ts
│  │  │  └─ progressGuard.ts
│  │  ├─ helper
│  │  │  └─ routeHelper.ts
│  │  ├─ index.ts
│  │  ├─ scrollBehavior.ts
│  │  └─ types.ts
│  ├─ settings
│  │  ├─ designSetting.ts
│  │  ├─ encryptionSetting.ts
│  │  └─ projectSetting.ts
│  ├─ store
│  │  ├─ index.ts
│  │  └─ modules
│  │     ├─ app.ts
│  │     ├─ route.ts
│  │     └─ tag.ts
│  ├─ style
│  │  ├─ common.scss
│  │  ├─ icons.scss
│  │  ├─ index.scss
│  │  └─ variables
│  │     ├─ element-variables.scss
│  │     ├─ screen.scss
│  │     └─ variable.scss
│  ├─ theme
│  │  ├─ updateBackground.ts
│  │  ├─ updateColorWeak.ts
│  │  ├─ updateGrayMode.ts
│  │  ├─ updateTheme.ts
│  │  └─ util.ts
│  ├─ type
│  │  ├─ config.d.ts
│  │  └─ global.d.ts
│  ├─ utils
│  │  ├─ animation.ts
│  │  ├─ cache
│  │  │  ├─ index.ts
│  │  │  └─ storageCache.ts
│  │  ├─ color.ts
│  │  ├─ encryption
│  │  │  └─ aesEncryption.ts
│  │  ├─ env.ts
│  │  ├─ factory
│  │  │  ├─ asyncComponents.ts
│  │  │  ├─ Empty.vue
│  │  │  └─ Skeleton.vue
│  │  ├─ helper
│  │  │  ├─ envHelper.ts
│  │  │  ├─ persistent.ts
│  │  │  ├─ vueHelper.ts
│  │  │  └─ vuexHelper.ts
│  │  ├─ log.ts
│  │  ├─ pinyin.ts
│  │  ├─ propTypes.ts
│  │  ├─ request.ts
│  │  └─ tools.ts
│  └─ views
│     ├─ error
│     │  └─ 404.vue
│     └─ system
│        └─ redirect.vue
├─ stylelint.config.js
├─ tsconfig.json
├─ vite.config.ts
├─ yarn-error.log
└─ yarn.lock

```
