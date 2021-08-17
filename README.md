<div align="center"> <a href="https://gitee.com/bensen_admin/evolution-v4"> <img alt="中教智汇管理系统" width="200" height="56" src="http://cloud.wisewe.cn:8199/images/logo/logo_max.png"> </a> <br> <br>

[![license](https://img.shields.io/badge/Wisewe-V4-blue)](LICENSE)
[![Travis](https://api.travis-ci.com/wangg-912/Wisewe-4.0.svg)](Travis)

<h1>Wisewe-V4</h1>
</div>

## 简介

本项目属于中教智汇信息技术有限公司，是公司第四代前端基础框架，基础版本为V4.0.0。是一套开箱即用的中台解决方案。
本框架使用Vue3作为底层技术栈;借助于Vite2作为脚手架；主要开发语言使用TypeScript 4 | Javascript，遵循语法ES2015以上;基础UI框架使用Element-Plus，遵循Element+交互标准;客户端与服务器通讯是用Axios。

## 特性

- 最新技术栈：使用Vue3+Vite2等前端前沿技术
- Typescript：更严谨的应用程序级Javascript的超集语言
- 主题: 灵活自定义可配置的主题方案
- 组件：二次封装多个常用的组件
- 路由：使用V4.x新一代路由机制(Vue-Router/@next)
- 状态管理机制：使用V4.x新一代状态管理机制(Vuex/@next)

## 文档
  [文档地址](https://gitee.com/bensen_admin/evolution-v4/wikis/Wisewe-V4%20?sort_id=3989190)
## 准备
  - [node](http://nodejs.org/) and [git](https://git-scm.com/) - 项目开发环境
  - [Vite](https://vitejs.dev/) - 下一代前端开发与构建工具
  - [Vue3](https://v3.vuejs.org/) - 新一代Vue技术栈
  - [TypeScript](https://www.typescriptlang.org/) - TypeScript的基本语法
  - [Es6+](http://es6.ruanyifeng.com/) - ES6语法标准
  - [Vue-Router-Next](https://next.router.vuejs.org/) - 下一代服务于Vue3的路由机制
  - [Element-Plus](https://github.com/element-plus/element-plus) - UI框架
  - [Vuex-Next](https://github.com/vuejs/vuex) - 下一代服务于Vue3的状态管理机制

## 安装使用
  - 获取项目代码
  ```
  https://gitee.com/bensen_admin/evolution-v4
  ```

  - 安装依赖
  ```
  cd evolution-v4
  yarn install
  or
  yarn bootstrap
  or
  npm i
  ```

  - 运行
  ```
  yarn dev
  ```

  - 编译
  ```
  yarn build
  ```

  - 编译并预览
  ```
  yarn preview
  ```

  - 语法格式校验
  ```
  yarn lint:eslint
  ```
  
## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 相关仓库

如果这些插件对你有帮助，可以给一个 star 支持下

- [vite-plugin-html](https://github.com/anncwb/vite-plugin-html) - 用于 html 模版转换及压缩
- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) - 用于组件库样式按需引入
- [vite-plugin-imagemin](https://github.com/anncwb/vite-plugin-imagemin) - 用于打包压缩图片资源
- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression) - 用于打包输出.gz|.brotil 文件
- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons) - 用于快速生成 svg 雪碧图

## License

[MIT © Wisewe-V4](./LICENSE)
## 项目目录

```
evolution-v4
├─ .editorconfig
├─ .env
├─ .env.development
├─ .env.production
├─ .eslintignore
├─ .eslintrc.js
├─ .stylelintignore
├─ .travis.yml
├─ babel.config.js
├─ build
│  ├─ utils.ts
│  └─ vite
│     └─ proxy.ts
├─ commitlint.config.js
├─ favicon.ico
├─ index.html
├─ jest.config.js
├─ LICENSE
├─ mock
│  ├─ index.ts
│  ├─ modules
│  │  ├─ menus.ts
│  │  ├─ promission.ts
│  │  └─ system.ts
│  └─ utils.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ prettier.config.js
├─ public
│  ├─ browser.html
│  ├─ extend
│  │  ├─ esayui-1.8.6
│  │  │  ├─ easyloader.js
│  │  │  ├─ locale
│  │  │  │  └─ easyui-lang-zh_CN.js
│  │  │  ├─ plugins
│  │  │  │  ├─ jquery.dialog.js
│  │  │  │  ├─ jquery.draggable.js
│  │  │  │  ├─ jquery.droppable.js
│  │  │  │  ├─ jquery.linkbutton.js
│  │  │  │  ├─ jquery.messager.js
│  │  │  │  ├─ jquery.panel.js
│  │  │  │  ├─ jquery.parser.js
│  │  │  │  ├─ jquery.progressbar.js
│  │  │  │  ├─ jquery.resizable.js
│  │  │  │  └─ jquery.window.js
│  │  │  └─ themes
│  │  │     └─ material-teal
│  │  │        ├─ easyui.css
│  │  │        └─ images
│  │  │           ├─ layout_arrows.png
│  │  │           ├─ linkbutton_bg.png
│  │  │           ├─ loading.gif
│  │  │           ├─ messager_icons.png
│  │  │           ├─ pagination_icons.png
│  │  │           ├─ panel_tools.png
│  │  │           └─ Thumbs.db
│  │  └─ framework.extend.js
│  ├─ favicon.ico
│  └─ logo.png
├─ README.md
├─ src
│  ├─ api
│  │  └─ app.ts
│  ├─ App.vue
│  ├─ assets
│  │  ├─ fonts
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
│  │  │     ├─ search
│  │  │     │  ├─ AppSearch.vue
│  │  │     │  ├─ AppSearchFooter.vue
│  │  │     │  ├─ AppSearchModal.vue
│  │  │     │  ├─ useSearch.ts
│  │  │     │  └─ useSearchScroll.ts
│  │  │     └─ useAppContext.ts
│  │  ├─ Basic
│  │  │  ├─ BasicTitle.vue
│  │  │  └─ index.ts
│  │  ├─ CountTo
│  │  │  ├─ index.vue
│  │  │  └─ props.ts
│  │  ├─ Dialog
│  │  │  ├─ index.ts
│  │  │  ├─ src
│  │  │  │  ├─ basicDialog.vue
│  │  │  │  ├─ components
│  │  │  │  │  ├─ Dialog.tsx
│  │  │  │  │  ├─ dialogFooter.vue
│  │  │  │  │  ├─ dialogHeader.vue
│  │  │  │  │  ├─ dialogToolbar.vue
│  │  │  │  │  └─ dialogWrapper.vue
│  │  │  │  ├─ dialog.scss
│  │  │  │  ├─ hooks
│  │  │  │  │  ├─ useDialog.ts
│  │  │  │  │  ├─ useDialogContext.ts
│  │  │  │  │  ├─ useDialogDrag.ts
│  │  │  │  │  └─ useDialogFullScreen.ts
│  │  │  │  ├─ props.ts
│  │  │  │  └─ types.ts
│  │  │  └─ __tests__
│  │  ├─ Drawer
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     ├─ BasicDrawer.vue
│  │  │     ├─ props.ts
│  │  │     ├─ type.ts
│  │  │     └─ useDrawer.ts
│  │  ├─ Echart
│  │  │  ├─ index.vue
│  │  │  └─ theme.json
│  │  ├─ FontIcon
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
│  ├─ directives
│  │  └─ clickOutside.ts
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
│  │  │  ├─ useRefs.ts
│  │  │  ├─ useThrottle.ts
│  │  │  └─ useTimeout.ts
│  │  ├─ event
│  │  │  ├─ useEventListener.ts
│  │  │  └─ useKeyPress.ts
│  │  ├─ setting
│  │  │  ├─ index.ts
│  │  │  ├─ useHeaderSetting.ts
│  │  │  ├─ useMenuSetting.ts
│  │  │  ├─ useRootSetting.ts
│  │  │  ├─ useTagSetting.ts
│  │  │  └─ useTransitionSetting.ts
│  │  ├─ theme
│  │  │  ├─ useFetch.ts
│  │  │  └─ useFiles.ts
│  │  └─ web
│  │     ├─ useAppInject.ts
│  │     ├─ useDesign.ts
│  │     ├─ usePage.ts
│  │     ├─ useScrollTo.ts
│  │     ├─ useWatermark.ts
│  │     └─ useWindow.ts
│  ├─ html
│  │  ├─ extend.js
│  │  └─ test.html
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
│  │  │  ├─ mix-tabs
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
│  │     ├─ pageFrame.vue
│  │     ├─ pagePanel.vue
│  │     ├─ transition.ts
│  │     └─ useCache.ts
│  ├─ main.ts
│  ├─ router
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
│  │  ├─ types.d.ts
│  │  └─ utils.ts
│  ├─ settings
│  │  ├─ designSetting.ts
│  │  ├─ encryptionSetting.ts
│  │  └─ projectSetting.ts
│  ├─ shim.d.ts
│  ├─ store
│  │  ├─ index.ts
│  │  └─ modules
│  │     ├─ app.ts
│  │     ├─ route.ts
│  │     ├─ tag.ts
│  │     └─ user.ts
│  ├─ style
│  │  ├─ common.scss
│  │  ├─ index.scss
│  │  ├─ transition
│  │  │  ├─ base.scss
│  │  │  ├─ fade.scss
│  │  │  ├─ index.scss
│  │  │  ├─ scale.scss
│  │  │  ├─ scroll.scss
│  │  │  ├─ slide.scss
│  │  │  └─ zoom.scss
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
│  │  ├─ global.d.ts
│  │  └─ utils.ts
│  ├─ utils
│  │  ├─ animation.ts
│  │  ├─ cache
│  │  │  ├─ index.ts
│  │  │  └─ storageCache.ts
│  │  ├─ color.ts
│  │  ├─ commonAxios.ts
│  │  ├─ constant.ts
│  │  ├─ date.ts
│  │  ├─ dom.ts
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
│  │  │  ├─ treeHelper.ts
│  │  │  ├─ tsxHelper.tsx
│  │  │  ├─ vueHelper.ts
│  │  │  └─ vuexHelper.ts
│  │  ├─ log.ts
│  │  ├─ pinyin.ts
│  │  ├─ propTypes.ts
│  │  ├─ request.ts
│  │  ├─ resolve.ts
│  │  ├─ themeColor.ts
│  │  ├─ tools.ts
│  │  └─ uuid.ts
│  └─ views
│     ├─ dashboard
│     │  ├─ components
│     │  │  └─ PanelGroup.vue
│     │  ├─ echart-data.ts
│     │  └─ index.vue
│     ├─ demo
│     │  ├─ button
│     │  │  └─ index.vue
│     │  ├─ countTo
│     │  │  └─ index.vue
│     │  └─ dialog
│     │     └─ index.vue
│     ├─ error
│     │  └─ 404.vue
│     └─ system
│        ├─ iframe.vue
│        └─ redirect.vue
├─ stylelint.config.js
├─ tailwind.config.js
├─ tests
│  └─ unit
│     └─ utils
│        └─ Test.spec.ts
├─ tsconfig.json
├─ vite.config.ts
├─ windi.config.js
├─ yarn-error.log
└─ yarn.lock

```
