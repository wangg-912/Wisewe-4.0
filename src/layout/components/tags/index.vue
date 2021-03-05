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
              :type="tag.name !== 'home' ? 'info' : ''"
              closable
              :disable-transitions="false"
            >
              <span class="tag-dot" :class="tag.name == 'home' ? 'tag-selected' : ''"></span>
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
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'LayoutTags',
    components: {},
    setup() {
      const { prefixCls } = useDesign('layout-tags');
      function testLeftScroll() {
        
        const wrap = this.$refs.scrollPaneRef.wrap;
        this.$refs.scrollPaneRef.wrap.scrollLeft = wrap.scrollLeft + 800;
      }
      function testRightScroll() {
        this.$refs.scrollPaneRef.wrap.scrollLeft = 0;
      }
      return { prefixCls, testLeftScroll, testRightScroll };
    },
    data() {
      return {
        showScroll: true,
        visitedViews: [
          { path: '/home', name: 'home', meta: { title: '首页', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '测试1', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '地方', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '大幅答复', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '阿道夫', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '测试1', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '啊飞洒地方', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '啊打发', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '高富帅', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '测试1', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '一天', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '不错v', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '测v试1', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '但是', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '重新准备', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '的是法国', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '让他', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '面积', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '学生', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '擦拭', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '啊奉公守法', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '体验非常', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '多舒服啊', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '测试1', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '阿凡达的身份', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '阿斯蒂芬撒', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '隔一天', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '钱啊', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '我晚上', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '问问', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '任溶溶', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '儿童天天', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '她她她', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '嘎嘎嘎', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '下自成蹊', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '自行车', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '下厨房', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '吊死扶伤', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '你好', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '的风格和对方', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '恐惧', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '规划', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '龙华', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '真实的发生', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '自行车v', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '山东分公司', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '下次更新的', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '测试1', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '在吃饭vzx', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '测试1', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '出现在', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '在XC在C', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '支持vzcvcxz', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '瑟瑞特', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '二退热贴', icon: 'el-icon-home' } },
          { path: '/test1', name: 'test1', meta: { title: '饿通天塔', icon: 'el-icon-home' } },
          { path: '/404', name: '404', meta: { title: '404', icon: 'el-icon-home' } },
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
