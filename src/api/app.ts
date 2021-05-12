import qs from 'qs';
import request from '/@/utils/request';
import { AxiosResponse } from 'axios';

export function getWorkVo(): Promise<AxiosResponse> {
  return request({
    url: '/api/platform/workspace',
    method: 'get',
  });
}
export function getMenusDate(): Promise<AxiosResponse> {
  return request({
    url: '/api/platform/permission/menu/tree',
    method: 'get',
  });
}

export function testget(param?: any): Promise<AxiosResponse> {
  return request({
    url: '/test/get',
    method: 'get',
    params: param,
  });
}

export function testpostform(data: any): Promise<AxiosResponse> {
  return request({
    url: '/test/posrform',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    data: qs.stringify(data),
  });
}
