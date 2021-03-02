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


```
evolution-v4
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc.js
├─ index.html
├─ LICENSE
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
│  │  └─ logo.png
│  ├─ components
│  │  ├─ Applications
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     ├─ AppLogo
│  │  │     │  └─ index.vue
│  │  │     ├─ AppProvider
│  │  │     │  └─ index.vue
│  │  │     └─ useAppContext.ts
│  │  └─ home
│  │     └─ index.vue
│  ├─ enums
│  │  └─ appEnum.ts
│  ├─ hooks
│  │  └─ core
│  │     └─ useContext.ts
│  ├─ layout
│  │  ├─ components
│  │  │  ├─ aside
│  │  │  ├─ content
│  │  │  │  └─ index.vue
│  │  │  ├─ feature
│  │  │  │  └─ index.vue
│  │  │  ├─ footer
│  │  │  ├─ header
│  │  │  │  └─ index.vue
│  │  │  ├─ logo
│  │  │  ├─ menus
│  │  │  ├─ setting
│  │  │  │  └─ index.vue
│  │  │  └─ tags
│  │  ├─ index.vue
│  │  └─ page
│  │     └─ index.vue
│  ├─ main.ts
│  ├─ router
│  │  ├─ asyncRouter.ts
│  │  ├─ index.ts
│  │  ├─ scrollBehavior.ts
│  │  └─ types.ts
│  ├─ settings
│  │  └─ designSetting.ts
│  ├─ shims-vue.d.ts
│  ├─ store
│  │  ├─ index.ts
│  │  └─ modules
│  │     └─ app.ts
│  ├─ style
│  │  ├─ common.scss
│  │  ├─ index.scss
│  │  └─ layout
│  │     ├─ index.scss
│  │     └─ variables
│  │        ├─ color.scss
│  │        ├─ easing.scss
│  │        └─ screen.scss
│  ├─ type
│  │  └─ config.ts
│  ├─ utils
│  │  ├─ factory
│  │  │  ├─ asyncComponents.ts
│  │  │  ├─ Empty.vue
│  │  │  └─ Skeleton.vue
│  │  ├─ request.ts
│  │  └─ tools.ts
│  └─ views
│     └─ error
│        └─ 404.vue
├─ stylelint.config.js
├─ tsconfig.json
├─ vite.config.ts
├─ yarn-error.log
└─ yarn.lock

```
