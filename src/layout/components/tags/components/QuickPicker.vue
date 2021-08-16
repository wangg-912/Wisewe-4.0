<template>
  <div :class="`${prefixCls}`">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            icon="el-icon-refresh-right"
            :class="`${prefixCls}--item`"
            @click="refreshTag"
            >刷新</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-close" :class="`${prefixCls}--item`" @click="closeTag"
            >关闭</el-dropdown-item
          >
          <el-dropdown-item
            icon="el-icon-circle-close"
            :class="`${prefixCls}--item`"
            @click="closeOtherTags"
            >关闭其他</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-error" :class="`${prefixCls}--item`" @click="closeAllTags"
            >关闭全部</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick } from 'vue';
  import { RouteLocationNormalized } from 'vue-router';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRouter } from 'vue-router';
  import { tagStore } from '/@/store/modules/tag';
  export default defineComponent({
    name: 'QuickPicker',
    emits: ['move'],
    setup(_, { emit }) {
      const { prefixCls } = useDesign('quick-menu');
      const { currentRoute, push, replace } = useRouter();
      /**
       * @description 关闭tag标签
       */
      async function closeTag() {
        const tags: any = await tagStore.deleteTag(currentRoute.value);
        toLastTag(tags.tagsState);
      }
      /**
       * @description 回到上一次标签
       */
      function toLastTag(tags: RouteLocationNormalized) {
        const latestView = tags.slice(-1)[0];
        latestView ? push(latestView.path) : push('/');
      }
      /**
       * @description 刷新
       */
      async function refreshTag() {
        await tagStore.deleteCacheTag();
        const { path } = currentRoute.value;
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
        const { path } = currentRoute.value;
        push(path);
        tagStore.deleteOtherTags(currentRoute.value).then(() => {
          emit('move');
        });
      }
      /**
       * @description 全部关闭
       */
      async function closeAllTags() {
        const tags: any = await tagStore.deleteAllTags();
        toLastTag(tags);
      }
      return {
        prefixCls,
        refreshTag,
        closeTag,
        closeOtherTags,
        closeAllTags,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-quick-menu {
    display: flex;
    width: 30px;
    height: 30px;
    border-left: 1px solid #eee;
    align-items: center;
    justify-content: center;

    .el-icon-arrow-down.el-icon--right {
      margin-left: 0;
      cursor: pointer;
    }

    &--item {
      font-size: 12px;
    }
  }
</style>
