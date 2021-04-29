<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-wrapper`" ref="wrapper">
      <div :class="`${prefixCls}-wrapper-prev`" v-if="showScroll" @click="move(-200)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <scroll-pane ref="scrollPane" :class="`${prefixCls}-wrapper-scroll`">
        <div class="scroll-container">
          <router-link
            class="tag-item"
            v-for="tag in getTagsState"
            :ref="setTagRef"
            :key="tag.path"
            :class="isActive(tag) ? 'selected' : ''"
            :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
            @contextmenu.prevent="openMenu(tag, $event)"
          >
            {{ tag.meta.title }}
            <i
              v-if="!(tag && tag.meta && tag.meta.affix)"
              class="el-icon-close icon-close"
              @click.prevent.stop="closeTag(tag)"
            ></i>
          </router-link>
        </div>
      </scroll-pane>
      <div :class="`${prefixCls}-wrapper-next`" v-if="showScroll" @click="move(200)">
        <i class="el-icon-arrow-right"></i>
      </div>
      <QuickPicker v-if="getShowQuick"  @move="moveToCurrentTag"/>
      <ul
        v-if="getShowContextmenu"
        v-show="visible"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
      >
        <li @click="refreshTag(selectedTag)">
          <i class="el-icon-refresh-right"></i>&nbsp;&nbsp;刷新
          <el-divider class="line" />
        </li>
        <li v-if="!isActive(selectedTag)" @click="closeTag(selectedTag)">
          <i class="el-icon-close"></i>&nbsp;&nbsp;关闭
          <el-divider class="line" />
        </li>
        <li @click="closeOtherTags">
          <i class="el-icon-circle-close"></i>&nbsp;&nbsp;关闭其他
          <el-divider class="line" />
        </li>
        <li @click="closeAllTags"><i class="el-icon-error"></i>&nbsp;&nbsp;关闭全部</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    computed,
    onMounted,
    reactive,
    ref,
    watch,
    unref,
    toRefs,
    nextTick,
  } from 'vue';
  import ScrollPane from './ScrollPane.vue';
  import { RouteLocationNormalized } from 'vue-router';
  import { useRouter } from 'vue-router';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useTagSetting } from '/@/hooks/setting/useTagSetting';
  import { tagStore } from '/@/store/modules/tag';
  import { initAffixTags } from './useTag';
  import QuickPicker from './components/QuickPicker.vue';
  export default defineComponent({
    name: 'LayoutTags',
    components: { ScrollPane, QuickPicker },
    setup() {
      const { currentRoute, push, replace } = useRouter();
      const wrapper = ref<HTMLElement | null>(null);
      const scrollPane = ref<HTMLElement | null>(null);
      const visible = ref<boolean>(false);
      const top = ref<number>(0);
      const left = ref<number>(0);
      const selectedTag = ref<any>({});
      const tagRefs = ref<any[]>([]);

      function setTagRef(el: any): void {
        tagRefs.value.push(el);
      }
      /* console.log(router,route) */
      const { prefixCls } = useDesign('layout-tags');
      const { getShowContextmenu, getShowQuick } = useTagSetting();
      const state = reactive({
        showScroll: false,
      });
      initAffixTags();
      /**
       * @description 获取tag标签
       */
      const getTagsState = computed(() => {
        return tagStore.getTagsState.filter((item) => !item.meta?.hideTag);
      });
      //const unClose = computed(() => unref(getTagsState).length === 1);

      /* console.log(getTagsState) */
      /**
       * @description 点击左右滑动
       */
      function move(to: number) {
        (unref(scrollPane) as any).moveTo(to);
      }
      /**
       * @description 判断是否激活
       */
      function isActive(tag) {
        return currentRoute.value.path === tag.path;
      }
      /**
       * @description 点击每个标签
       */
      function tagClickHandler(tag) {
        /* console.log(tag.path); */
        const { path } = tag;
        push({ path: path }).catch((err) => {
          console.warn(err);
        });
      }

      onMounted(() => {
        addTags();
      });
      /**
       * @description 设置滚动条点击按钮
       */
      function setScorll() {
        const { scrollContainer } = scrollPane.value;
        const { wrap } = scrollContainer;
        state.showScroll = wrap.scrollWidth > wrap.clientWidth;
      }
      /**
       * @description 跟随滚动条视图
       */
      function moveToCurrentTag() {
        tagRefs.value = [];
        const tags = unref(tagRefs);
        nextTick(() => {
          for (const tag of tags) {
            /*   debugger; */
            if (tag && tag.to.path === currentRoute.value.path) {
              (unref(scrollPane) as any).moveToTarget(tag);
              // when query is different then update
              if (tag.to.fullPath !== currentRoute.value.fullPath) {
                tagStore.updateVisitedTags(currentRoute.value);
              }
              break;
            }
          }
        });
      }
      /**
       * @description 添加Tag标签
       */
      function addTags() {
        const { name, meta, path } = currentRoute.value;
        if (name) {
          tagStore.addTagAction(({
            meta: meta,
            name: meta,
            path: path,
          } as unknown) as RouteLocationNormalized);
        }
        return false;
      }
      /**
       * @description 右键菜单功能
       */
      function openMenu(tag: RouteLocationNormalized, e: any) {
        if (!getShowContextmenu) return;
        const { path } = tag;
        if (path == '/home') {
          return false;
        }
        const menuMinWidth = 105;
        const offsetLeft: number = (unref(wrapper) as any).getBoundingClientRect().left; // container margin left
        const offsetWidth: number = (unref(wrapper) as any).offsetWidth; // container width
        const maxLeft: number = offsetWidth - menuMinWidth; // left boundary
        const itemLeft: number = e.clientX - offsetLeft + 4;

        if (itemLeft > maxLeft) {
          left.value = maxLeft;
        } else {
          left.value = itemLeft;
        }
        top.value = e.offsetY;
        visible.value = true;
        selectedTag.value = tag;
      }
      /**
       * @description 关闭tag标签
       */
      async function closeTag(tag: RouteLocationNormalized) {
        const tags: any = await tagStore.deleteTag(tag);
        if (isActive(tag)) {
          toLastTag(tags.tagsState);
        }
      }
      /**
       * @description 回到上一次标签
       */
      function toLastTag(tags: RouteLocationNormalized) {
        const latestView = tags.slice(-1)[0];
        latestView ? push(latestView.path) : push('/');
      }
      /**
       * @description 刷新指定标签页面
       */
      async function refreshTag(tag: RouteLocationNormalized) {
        await tagStore.deleteCacheTag();
        const { path } = tag;
        nextTick(() => {
          replace({
            path: '/redirect' + path,
          });
        });
      }
      /**
       * @description 关闭其他
       */
      async function closeOtherTags() {
        const { path } = selectedTag.value;
        push(path);
        tagStore.deleteOtherTags(selectedTag.value).then(() => {
          //TODO 跳至不关闭的标签
          moveToCurrentTag();
        });
      }
      /**
       * @description 全部关闭
       */
      async function closeAllTags() {
        const tags: any = await tagStore.deleteAllTags();
        toLastTag(tags);
      }
      /**
       * @description 关闭右键菜单；
       */
      function closeMenu() {
        visible.value = false;
      }

      watch(
        () => currentRoute.value,
        () => {
          addTags();
          setScorll();
          moveToCurrentTag();
        }
      );
      watch(
        () => visible.value,
        (visible: boolean) => {
          if (visible) {
            document.body.addEventListener('click', closeMenu);
          } else {
            document.body.removeEventListener('click', closeMenu);
          }
        }
      );

      return {
        ...toRefs(state),
        tagRefs,
        setTagRef,
        prefixCls,
        wrapper,
        scrollPane,
        visible,
        top,
        left,
        selectedTag,
        isActive,
        tagClickHandler,
        move,
        moveToCurrentTag,
        getTagsState,
        openMenu,
        closeTag,
        refreshTag,
        closeOtherTags,
        closeAllTags,
        getShowContextmenu,
        getShowQuick,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-layout-tags {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    &-wrapper {
      position: relative;
      height: inherit;
      /* overflow: hidden; */
      display: flex;
      flex-direction: row;
      &::before,
      &::after {
        display: table;
        content: '';
      }
      &-prev,
      &-next {
        width: 20px;
        height: 30px;
        /*  position: absolute;
        z-index: 2; */
        border: 0;
        text-align: center;
        cursor: pointer;
      }
      &-prev {
        left: 0;
        border-right: 1px solid #eee;
      }
      &-next {
        right: 0;
        border-left: 1px solid #eee;
      }
      &-scroll {
        height: 30px;
        flex: 1;
        position: relative;
        .tag-selected {
          background: $--color-primary;
        }
        .scroll-container {
          height: 30px;
          line-height: 30px;
          .tag-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 22px;
            line-height: 22px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 6px;
            font-size: 12px;
            margin-left: 4px;
            outline: none;
            text-decoration: 0;
            &:last-of-type {
              margin-right: 8px;
            }
            &.selected {
              background-color: $--color-primary !important;
              color: #fff;
              border-color: $--color-primary !important;
              &::before {
                content: '';
                background: #fff;
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                position: relative;
                margin-right: 5px;
              }
            }
            .icon-close {
              width: 14px;
              height: 14px;
              border-radius: 50%;
              text-align: center;
              line-height: 14px;
              transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              transform-origin: 100% 50%;
              &:before {
                display: inline-block;
              }
              &:hover {
                background-color: $base-color-danger;
                color: #fff;
              }
            }
          }
        }
      }
      .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 200;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
          margin: 0;
          padding: 0px 16px;
          cursor: pointer;
          &:hover {
            background: #eee;
          }
        }
        .line {
          margin: 0;
        }
      }
    }
  }
</style>
