import menus from './menus';
import promission from './promission';
import { resultSuccess } from '../utils';
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/platform/workspace',
    method: 'get',
    response: () => {
      return resultSuccess(promission);
    },
  },
  {
    url: '/api/platform/permission/menu/tree',
    method: 'get',
    response: () => {
      return resultSuccess(menus);
    },
  },
] as MockMethod[];
