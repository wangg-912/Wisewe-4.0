// 参考 https://github.com/vuejs/vue-router-next/blob/master/playground/scrollWaiter.ts
import type { RouteLocationNormalized } from 'vue-router';
/**
 *处理路由导航上的滚动行为
 *
 *@param {object}路由下一页的对象
 *@param {object}来自上一页的Route对象
 *@param {object} savedPosition由popstate导航使用
 *@returns {（object | boolean）}滚动位置或`false`
 */
// @ts-ignore
export async function scrollBehavior(to, from, savedPosition) {
  //等待scrollWaiter.wait（）;
  //使用预定义的滚动行为（如果已定义），默认为无滚动行为
  const behavior = 'smooth';
  //返回`savedPosition`（如果可用）将导致类似本机的结果
  //使用后退/前进按钮浏览时的行为
  if (savedPosition) {
    return { ...savedPosition, behavior };
  }

  //通过返回选择器滚动到锚点
  if (to.hash) {
    return { el: decodeURI(to.hash), behavior };
  }

  //检查是否有匹配的路由配置包含阻止滚动到顶部的元数据
  if (to.matched.some((m: RouteLocationNormalized) => m.meta.scrollToTop === false)) {
    //保持滚动不变
    return false;
  }

  //始终滚动到顶部
  return { left: 0, top: 0, behavior };
}
