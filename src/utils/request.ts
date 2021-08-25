import axios from 'axios';
import { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { addPendingRequest, removePendingRequest } from './commonAxios';
const ENV = import.meta.env;
const { VITE_SERVICE_BASE_API } = ENV;
const request = axios.create({
  baseURL: `${VITE_SERVICE_BASE_API}`,
  timeout: 60000,
});

const handleCode = (code: number, msg?: string) => {
  switch (code) {
    case 400:
      ElMessage.error('请求类型错误，请检查请求参数！');
      break;
    case 404:
      ElMessage.error('请求不存在，服务器无法操作！');
      break;
    case 405:
      ElMessage.error('请求协议错误！');
      break;
    case 500:
      ElMessage.error('服务器发生错误！');
      break;
    case 502:
      ElMessage.error('服务器网关错误！');
      break;
    case 503:
      ElMessage.error('服务器暂时过载或维护！');
      break;
    case 504:
      ElMessage.error('服务器网关超时！');
      break;
    default:
      ElMessage.error(msg || '未知异常，请稍后再试！');
      break;
  }
};

// 异常拦截处理器
const errorHandler = (error: any) => {
  removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
  if (axios.isCancel(error)) {
    console.log('取消同时间内重复请求：' + error.message);
  } else {
    const { response, message } = error;
    if (response && !response.data) {
      const { status, data } = response;
      handleCode(status, data.msg || message);
      return Promise.reject(error);
    } else {
      let { message } = error;
      if (message === 'Network Error') {
        message = '网络错误，请检查网络！';
      }
      if (message.includes('timeout')) {
        message = '请求服务超时！';
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3);
        message = '服务接口' + code + '异常';
      }
      ElMessage.error(message || `服务接口未知异常`);
      return Promise.reject(error);
    }
  }
};

request.interceptors.request.use(
  (config) => {
    /**
     * removePendingRequest 检查是否存在重复请求，若存在则取消已发的请求
     * addPendingRequest 把当前请求添加到pendingRequest对象中
     */
    removePendingRequest(config);
    addPendingRequest(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use((response: AxiosResponse) => {
  removePendingRequest(response.config); // 从pendingRequest对象中移除请求
  const { data } = response;

  if (!(typeof data == 'object') && data.includes('workspaceVo')) {
    return JSON.parse(data.split('=')[1]);
  }
  if (!data.success) {
    ElMessage({
      message: data.message,
      type: 'error',
    });
    return Promise.reject(new Error(data.message || 'Error'));
  }
  return response;
}, errorHandler);

export default request;
