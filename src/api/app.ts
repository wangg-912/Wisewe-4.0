import qs from 'qs';
import request from '/@/utils/request';
import { AxiosResponse } from 'axios';

export function getWorkVo(): Promise<AxiosResponse> {
  return request({
    url: '/platform/workspace',
    method: 'get',
  });
}
/**
 * @description 获取密码权限规则
 * @returns
 */
export function verifyPwdRules(): Promise<AxiosResponse> {
  return request({
    url:
      '/platform/common/property/batch/platform.security.password.validate,platform.security.password.minLength',
    method: 'get',
  });
}
export function getMenusDate(): Promise<AxiosResponse> {
  return request({
    url: '/platform/permission/menu/tree',
    method: 'get',
  });
}

export function testget(param?: any): Promise<AxiosResponse> {
  return request({
    url: 'test/get',
    method: 'get',
    params: param,
  });
}

export function testpostform(data: any): Promise<AxiosResponse> {
  return request({
    url: 'test/posrform',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    data: qs.stringify(data),
  });
}
