import { defineAsyncComponent } from 'vue';
import Skeleton from './Skeleton.vue';
import Empty from './Empty.vue';

const noop = () => {};

interface Options {
  size?: 'default' | 'small' | 'large';
  delay?: number;
  timeout?: number;
  loading?: boolean;
  retry?: boolean;
}

export function createAsyncComponent(loader: Fn, options: Options = {}) {
  const { size = 'small', delay = 650, timeout = 30000, loading = false, retry = true } = options;
  const dyCp = (loading: boolean) => {
    return loading ? Skeleton : undefined;
  };

  return defineAsyncComponent({
    loader,
    loadingComponent: dyCp(loading),
    errorComponent: Empty,
    timeout,
    // errorComponent
    //定义组件是否可疑。默认值：true。
    //suspensible:false
    delay,
    /**
     *@param {*}错误错误消息对象
     *@param {*} retry一个函数，指示加载程序承诺拒绝时异步组件是否应重试
     *@param {*}失败失败结束
     *@param {*}尝试允许的最大重试次数
     */
    onError: !retry
      ? noop
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            //重试提取错误，最多3次尝试
            retry();
          } else {
            //请注意，重试/失败类似于承诺的解决/拒绝：
            //必须调用其中之一才能继续进行错误处理。
            fail();
          }
        },
  });
}
