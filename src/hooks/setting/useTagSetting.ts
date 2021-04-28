import { computed, unref } from 'vue';
import type { TagsSetting } from '/@/type/config';
import { appStore } from '/@/store/modules/app';

const getTagsSetting = computed(() => appStore.getProjectConfig.tagsSetting);
const getTagsShow = computed(() => unref(getTagsSetting).show);
const getShowContextmenu = computed(() => unref(getTagsSetting).showContextmenu);
const getShowQuick = computed(() => unref(getTagsSetting).showQuick);

/**
 * @description 设置Tag标签配置
 * @param { TagsSetting } tagsSetting
 */
function setMenuSetting(tagsSetting: Partial<TagsSetting>): void {
  appStore.COMMITPROJECTCONFIGSTATE({ tagsSetting });
}

export function useTagSetting() {
  return {
    setMenuSetting,
    getTagsSetting,
    getTagsShow,
    getShowContextmenu,
    getShowQuick,
  };
}
