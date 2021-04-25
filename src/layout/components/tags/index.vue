<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-wrapper`" ref="wrapper">
      <div :class="`${prefixCls}-wrapper-prev`" v-if="showScroll" @click="testLeftScroll">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div :class="`${prefixCls}-wrapper-scroll`">
        <div class="scroll-container">
          <el-scrollbar ref="scrollPaneRef" class="tags-view-wrapper" :vertical="false">
            <el-tag
              v-for="tag in getTagsState"
              :key="tag.path"
              :calss="`${prefixCls}-wrapper-scroll-tag`"
              :type="isActive(tag) ? '' : 'info'"
              :closable="!(tag && tag.meta && tag.meta.affix)"
              :disable-transitions="true"
              @click="tagClickHandler(tag)"
              @close="closeTag(tag)"
              @contextmenu.prevent="openMenu(tag, $event)"
            >
              <span class="tag-dot" :class="isActive(tag) ? 'tag-selected' : ''"></span>
              {{ tag.meta.title }}
            </el-tag>
          </el-scrollbar>
        </div>
      </div>
      <div :class="`${prefixCls}-wrapper-next`" v-if="showScroll" @click="testRightScroll">
        <i class="el-icon-arrow-right"></i>
      </div>
      <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
        <li><i class="el-icon-refresh-right"></i>&nbsp;&nbsp;刷新</li>
        <el-divider class="line" />
        <li><i class="el-icon-close"></i>&nbsp;&nbsp;关闭</li>
        <el-divider class="line" />
        <li><i class="el-icon-circle-close"></i>&nbsp;&nbsp;关闭其他</li>
        <el-divider class="line" />
        <li><i class="el-icon-close"></i>&nbsp;&nbsp;关闭全部</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, onMounted, reactive, ref, toRefs, watch, unref } from 'vue';
  import { RouteLocationNormalizedLoaded } from 'vue-router';
  import { useRouter, useRoute } from 'vue-router';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useTagSetting } from'/@/hooks/setting/useTagSetting'
  import { tagStore } from '/@/store/modules/tag';
  import { initAffixTags } from './useTag';
  export default defineComponent({
    name: 'LayoutTags',
    components: {},
    setup() {
      const { currentRoute, push } = useRouter();
      const wrapper = ref<HTMLElement | null>(null);
      const visible = ref<boolean>(false);
      const top = ref<number>(0);
      const left = ref<number>(0);
      const selectedTag = ref<any>({});
      /* console.log(router,route) */

      const affixTextList = initAffixTags();
      const activeKeyRef = ref('');
      const { prefixCls } = useDesign('layout-tags');
      const { removeTagView } = useTagSetting();
      const state = reactive({
        showScroll: false,
      });
      /**
       * @description 获取tag标签
       */
      const getTagsState = computed(() => {
        return tagStore.getTagsState.filter((item) => !item.meta?.hideTag);
      });
      //const unClose = computed(() => unref(getTagsState).length === 1);

      /* console.log(getTagsState) */

      const scrollPaneRef = ref(null);
      /**
       * @description 点击左边滑动
       */
      function testLeftScroll() {
        const { wrap } = scrollPaneRef.value;
        let _scrollLeft = wrap.scrollLeft;

        wrap.scrollLeft = _scrollLeft + 400;
      }
      /**
       * @description 点击右边滑动
       */
      function testRightScroll() {
        const { wrap } = scrollPaneRef.value;
        let _scrollLeft = wrap.scrollLeft;
        wrap.scrollLeft = _scrollLeft - 400;
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
      /**
       * @description 判断是否激活
       */
      function isActive(tag) {
        return currentRoute.value.path === tag.path;
      }

      onMounted(() => {
        const { wrap } = scrollPaneRef.value;
        state.showScroll = wrap.scrollWidth > wrap.clientWidth;
        addTags();
      });
      /**
       * @description 添加Tag标签
       */
      function addTags(): void | boolean {
        const { name, meta, path } = currentRoute.value;
        if (name) {
          tagStore.addTagAction({
            meta: meta,
            name: name,
            path: path,
          });
        }
        return false;
      }
      /**
       * @description 右键菜单功能
       */
      function openMenu(tag: RouteLocationNormalizedLoaded, e: any) {
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

      function closeTag(view: RouteLocationNormalizedLoaded) {
        removeTagView(view);
      }

      watch(
        () => currentRoute.value,
        () => {
          //TODO
          addTags();
        }
      );

      return {
        prefixCls,
        wrapper,
        visible,
        top,
        left,
        selectedTag,
        ...toRefs(state),
        scrollPaneRef,
        isActive,
        testLeftScroll,
        testRightScroll,
        tagClickHandler,
        getTagsState,
        openMenu,
        closeTag,
      };
    },
    data() {
      return {
        visitedViews: [
          { path: '/home', name: 'home', meta: { title: '首页', icon: 'el-icon-home' } },
          { path: '/error/404', name: '404', meta: { title: '404', icon: 'el-icon-home' } },
        ],
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
        width: 30px;
        height: 30px;
        /*  position: absolute;
        z-index: 2; */
        border: 0;
        text-align: center;
        cursor: pointer;
      }
      &-prev {
        left: 0;
      }
      &-next {
        right: 0;
      }
      &-scroll {
        height: 30px;
        flex: 1;
        position: relative;

        .tag-icon {
          width: 14px;
          height: 14px;
          display: inline-block;
        }
        .tag-dot {
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 8px;
          background-color: #909399;
          vertical-align: middle;
          margin-top: -4px;
        }
        .tag-selected {
          background: $--color-primary;
        }
        .scroll-container {
          white-space: nowrap;
          position: absolute;
          overflow: hidden;
          width: 100%;
          .el-scrollbar__bar {
            bottom: 0px;
          }
          .el-scrollbar__wrap {
            height: 30px;
          }
          ::v-deep(.is-horizontal) {
            height: 0;
          }
        }

        ::v-deep(.el-tag) {
          margin-left: 4px;
          border-radius: 0;
          cursor: pointer;
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
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
        li {
          margin: 0;
          padding: 0px 16px;
          cursor: pointer;
          &:hover {
            background: #eee;
          }
        }
        .line{
          margin: 0;
        }
      }
    }
  }
</style>
