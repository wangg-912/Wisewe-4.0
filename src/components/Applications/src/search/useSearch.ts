import { resolve } from 'path';
import type { Menu } from '/@/router/types';
import { ref, onBeforeMount, unref, Ref, nextTick } from 'vue';
/* import { asyncRouterMap } from '/@/router'; */
import { routeStore } from '/@/store/modules/route';
import _ from 'lodash-es';
import { filter } from '/@/utils/helper/treeHelper';
import { useDebounce } from '/@/hooks/core/useDebounce';
import { useGo } from '/@/hooks/web/usePage';
import { useKeyPress } from '/@/hooks/event/useKeyPress';
import { useSearchScroll } from './useSearchScroll';
export interface SearchResult {
  name: string;
  path: string;
  icon?: string;
}

const enum KeyCodeEnum {
  UP = 38,
  DOWN = 40,
  ENTER = 13,
  ESC = 27,
}
/**
 * @description 正则转化匹配值
 * @param c
 * @returns
 */
function transform(c: string) {
  const code: string[] = ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|'];
  return code.includes(c) ? `\\${c}` : c;
}
/**
 * @description 创建搜索正则
 * @param key
 * @returns
 */
function createSearchReg(key: string) {
  const keys = [...key].map((item) => transform(item));
  const str = ['', ...keys, ''].join('.*');
  return new RegExp(str);
}
/**
 * @description 使用搜索钩子函数
 * @param refs
 * @param scrollWrap
 * @param emit
 * @returns
 */
export function useSearch(refs: Ref<HTMLElement[]>, scrollWrap: Ref<ElRef>, emit: EmitType) {
  const searchResult = ref<SearchResult[]>([]);
  const keyword = ref('');
  const activeIndex = ref(-1);

  let menuList: Menu[] = [];
  const go = useGo();
  const [handleSearch] = useDebounce(search, 600);

  onBeforeMount(() => {
    const list = routeStore.addRouters;
    menuList = _.cloneDeep(list);
  });
  /**
   * @description 搜索私有方法入口
   * @param searchKey
   * @returns
   */
  function search(searchKey: string) {
    keyword.value = searchKey.trim();
    if (!searchKey) {
      searchResult.value = [];
      return;
    }
    const reg = createSearchReg(unref(keyword));
    const filterMenu = filter(menuList, (item) => {
      return item.meta && item.meta.title ? reg.test(item.meta.title) : false;
    });
    searchResult.value = handlerSearchResult(filterMenu, reg);
    activeIndex.value = 0;
  }
  /**
   * @description 搜索事件返回结果
   * @param filterMenu
   * @param reg
   * @param parent
   * @param basePath
   * @returns
   */
  function handlerSearchResult(filterMenu: Menu[], reg: RegExp, parent?: Menu, basePath = '') {
    const ret: SearchResult[] = [];
    filterMenu.forEach((item) => {
      const { meta, path, children } = item;
      /* debugger; */
      if (meta && meta.title && !meta.hidden) {
        const { title } = meta;
        if (reg.test(title) && !children?.length) {
          ret.push({
            name: parent?.meta.title ? `${parent.meta.title} > ${title}` : title,
            path: resolve(basePath, path),
            icon: meta.icon,
          });
        }
        if (Array.isArray(children) && children.length) {
          const bp = resolve(basePath, path);
          ret.push(...handlerSearchResult(children, reg, item, bp));
        }
      }
    });
    return ret;
  }
  /**
   * @description 滚轮监听事件
   * @param e
   */
  function handleMouseenter(e: any) {
    const index = e.target.dataset.index;
    activeIndex.value = Number(index);
  }
  /**
   * @description 监听键盘向上
   * @returns
   */
  function handleUp() {
    if (!searchResult.value.length) return;
    activeIndex.value--;
    if (activeIndex.value < 0) {
      activeIndex.value = searchResult.value.length - 1;
    }
    handleScroll();
  }
  /**
   * @description 监听键盘向下
   * @returns
   */
  function handleDown() {
    if (!searchResult.value.length) return;
    activeIndex.value++;
    if (activeIndex.value > searchResult.value.length - 1) {
      activeIndex.value = 0;
    }
    handleScroll();
  }
  /**
   * @description 处理滚动逻辑
   * @returns
   */
  function handleScroll() {
    const refList = unref(refs);
    if (!refList || !Array.isArray(refList) || refList.length === 0 || !unref(scrollWrap)) return;

    const index = unref(activeIndex);
    const currentRef = refList[index];
    if (!currentRef) return;
    const wrapEl = unref(scrollWrap);
    if (!wrapEl) return;
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight;
    const wrapHeight = wrapEl.offsetHeight;
    const { start } = useSearchScroll({
      el: wrapEl,
      duration: 100,
      to: scrollHeight - wrapHeight,
    });
    start();
  }
  /**
   * @description 处理键盘回撤事件
   * @returns
   */
  async function handleEnter() {
    if (!searchResult.value.length) return;
    const result = unref(searchResult);
    const index = unref(activeIndex);
    /* if (result.length === 0 || index < 0) {
      return;
    } */
    const to = result[index];
    handleClose();
    await nextTick();
    go(to.path);
  }
  /**
   * @description 回调关闭分发事件
   */
  function handleClose() {
    searchResult.value = [];
    emit('close');
  }
  /**
   * @description 键盘钩子函数 enter|up|down|esc
   */
  useKeyPress(['enter', 'up', 'down', 'esc'], (events) => {
    const keyCode = events.keyCode;
    switch (keyCode) {
      case KeyCodeEnum.UP:
        handleUp();
        break;
      case KeyCodeEnum.DOWN:
        handleDown();
        break;
      case KeyCodeEnum.ENTER:
        handleEnter();
        break;
      case KeyCodeEnum.ESC:
        handleClose();
        break;
    }
  });

  return { handleSearch, searchResult, keyword, activeIndex, handleMouseenter, handleEnter };
}
