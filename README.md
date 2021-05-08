<div align="center"> <a href="https://gitee.com/bensen_admin/evolution-v4"> <img alt="中教智汇管理系统" width="200" height="200" src="https://img.shields.io/badge/Wisewe-V4-blue"> </a> <br> <br>

[![license](https://img.shields.io/badge/Wisewe-V4-blue)](LICENSE)

<h1>Wisewe-V4</h1>
</div>
# 简介

本项目属于中教智汇信息技术有限公司，是公司第四代前端基础框架，基础版本为V4.0.0。是一套开箱即用的中台解决方案。
本框架使用Vue3作为底层技术栈;借助于Vite2作为脚手架；主要开发语言使用TypeScript 4 | Javascript，遵循语法ES2015以上;基础UI框架使用Element-Plus，遵循Element+交互标准;客户端与服务器通讯是用Axios。

# 特性

- 最新技术栈：使用Vue3+Vite2等前端前沿技术
- Typescript：更严谨的应用程序级Javascript的超集语言
- 主题: 灵活自定义可配置的主题方案
- 组件：二次封装多个常用的组件
- 路由：使用V4.x新一代路由机制(Vue-Router/@next)
- 状态管理机制：使用V4.x新一代状态管理机制(Vuex/@next)

# 准备



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
