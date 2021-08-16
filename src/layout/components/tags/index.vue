<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-wrapper`" ref="wrapper">
      <div :class="`${prefixCls}-wrapper-prev`" v-if="showScroll" @click="move(-200)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <scroll-pane ref="scrollPane" :class="`${prefixCls}-wrapper-scroll`">
        <div class="scroll-container">
          <router-link
            class="tag-item el-tag"
            v-for="tag in getTagsState"
            :ref="setTagRef"
            :key="tag.path"
            :class="isActive(tag) ? 'el-tag--dark selected' : 'el-tag--info'"
            :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
            @contextmenu.prevent="openMenu(tag, $event)"
          >
            <span>{{ tag.meta.title }}</span>
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
      <QuickPicker v-if="getShowQuick" @move="moveToCurrentTag" />
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

  import { useDesign } from '/@/hooks/web/useDesign';
  import { useTagSetting } from '/@/hooks/setting/useTagSetting';
  import { tagStore } from '/@/store/modules/tag';
  import { initAffixTags } from './useTag';
  import QuickPicker from './components/QuickPicker.vue';
  import { useRouter } from 'vue-router';
  import { RouteLocationNormalizedLoaded } from 'vue-router';
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
      function isActive(route: RouteLocationNormalizedLoaded): boolean {
        return currentRoute.value.path === route.path;
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
          tagStore.addTagAction({
            meta: meta,
            name: meta,
            path: path,
          });
        }
        return false;
      }
      /**
       * @description 右键菜单功能
       */
      function openMenu(tag: RouteLocationNormalizedLoaded, e: any) {
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
      async function closeTag(tag: RouteLocationNormalizedLoaded) {
        const tags: any = await tagStore.deleteTag(tag);
        if (isActive(tag)) {
          toLastTag(tags.tagsState);
        }
      }
      /**
       * @description 回到上一次标签
       */
      function toLastTag(tags: RouteLocationNormalizedLoaded) {
        const latestView = tags.slice(-1)[0];
        latestView ? push(latestView.path) : push('/');
      }
      /**
       * @description 刷新指定标签页面
       */
      async function refreshTag(tag: RouteLocationNormalizedLoaded) {
        await tagStore.deleteCacheTag();
        const { fullPath } = tag;
        //debugger;
        nextTick(() => {
          replace({
            path: '/redirect' + fullPath,
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

      /* overflow: hidden; */
      display: flex;
      height: inherit;
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
        text-align: center;
        cursor: pointer;

        /*  position: absolute;
        z-index: 2; */
        border: 0;
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
        position: relative;
        height: 30px;
        flex: 1;

        .scroll-container {
          height: 30px;
          line-height: 30px;

          .tag-item {
            position: relative;
            display: inline-block;
            height: 24px;

            /* color: #495060;
            background: #fff; */
            padding: 0 6px;
            margin-left: 4px;
            font-size: 12px;
            line-height: 22px;
            text-decoration: 0;
            cursor: pointer;
            border: 1px solid #d8dce5;
            border-radius: 0;
            outline: none;

            &:last-of-type {
              margin-right: 8px;
            }

            &.selected {
              &::before {
                position: relative;
                display: inline-block;
                width: 8px;
                height: 8px;
                margin-right: 5px;
                background: #fff;
                border-radius: 50%;
                content: '';
              }
            }

            .icon-close {
              right: -2px;
              width: 14px;
              height: 14px;
              line-height: 14px;
              text-align: center;
              border-radius: 50%;
              transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              transform-origin: 100% 50%;

              &::before {
                display: inline-block;
              }

              &:hover {
                color: #fff;
                background-color: #fc0202;
              }
            }
          }
        }
      }

      .contextmenu {
        position: absolute;
        z-index: 200;
        padding: 5px 0;
        margin: 0;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        list-style-type: none;
        background: #fff;
        border-radius: 4px;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

        li {
          padding: 0 16px;
          margin: 0;
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
