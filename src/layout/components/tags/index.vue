<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-wrapper`">
      <div :class="`${prefixCls}-wrapper-prev`" v-if="showScroll" @click="testLeftScroll">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div :class="`${prefixCls}-wrapper-scroll`">
        <div class="scroll-container">
          <el-scrollbar ref="scrollPaneRef" class="tags-view-wrapper" :vertical="false">
            <el-tag
              v-for="tag in visitedViews"
              :key="tag.path"
              :calss="`${prefixCls}-wrapper-scroll-tag`"
              :type="isActive(tag)?'' : 'info'"
              closable
              :disable-transitions="true"
              @click="tagClickHandler(tag)"
            >
              <span class="tag-dot" :class="isActive(tag)? 'tag-selected' : ''"></span>
              {{ tag.meta.title }}
            </el-tag>
          </el-scrollbar>
        </div>
      </div>
      <div :class="`${prefixCls}-wrapper-next`" v-if="showScroll" @click="testRightScroll">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
  import { useRouter, useRoute } from "vue-router";
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'LayoutTags',
    components: {},
    setup() {
      const router = useRouter();
      const route = useRoute();
      console.log(router,route)
      const { prefixCls } = useDesign('layout-tags');
      const state = reactive({
        showScroll: false,
      });
      const scrollPaneRef = ref(null);

      function testLeftScroll() {
        /* debugger; */
        const { wrap } = scrollPaneRef.value;
        let _scrollLeft = wrap.scrollLeft;

        wrap.scrollLeft = _scrollLeft + 400;
      }
      function testRightScroll() {
        const { wrap } = scrollPaneRef.value;
        let _scrollLeft = wrap.scrollLeft;
        wrap.scrollLeft = _scrollLeft - 400;
      }
      function tagClickHandler(tag) {
        /* console.log(tag.path); */
        const {path} = tag;
        router.push({ path: path}).catch(err => {
            console.warn(err)
          })
      }
      function isActive(tag){
        return route.path === tag.path
      }
      onMounted(() => {
        const { wrap } = scrollPaneRef.value;
        state.showScroll = wrap.scrollWidth > wrap.clientWidth;
      });
      return {
        prefixCls,
        ...toRefs(state),
        scrollPaneRef,
        isActive,
        testLeftScroll,
        testRightScroll,
        tagClickHandler,
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
      overflow: hidden;
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
    }
  }
</style>
