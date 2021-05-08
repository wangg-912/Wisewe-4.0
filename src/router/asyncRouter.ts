import { RouteRecordRaw } from 'vue-router';
import { routeStore } from '/@/store/modules/route';
import { IMenubarList } from './types';
import { transPinYin } from '/@/utils/pinyin';
import router from '/@/router';

/* import { store } from '/@/store/index' */
// 引入动态路由页面
const components: IObject<() => Promise<typeof import('*.vue')>> = {
  Layout: ((() => import('/@/layout/index.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  PagePanel: ((() => import('/@/layout/page/pagePanel.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  404: ((() => import('/@/views/error/404.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
};
/**
 * list结构转tree
 * @param data list原始数据
 * @param pid 最外层pid
 */

/* id?: number | string;
   name?: string;
   path: string;
   meta?: {
     icon: string;
     title: string;
     frameSrc?: string;
     activeMenu?: string;
     noCache?: boolean;
     hidden?: boolean;
   };
   component?: (() => Promise<typeof import('*.vue')>) | string;
   children?: Array<IMenubarList>; */

export function listToTree(data: Array<IMenubarList>, fullPath = '/'): Array<IMenubarList> {
  const d: Array<IMenubarList> = [];
  data.forEach((val) => {
    const { id, text, iconCls, children, attributes } = val;
    /* console.log(transPinYin(text)) */
    const obj = {
      id,
      name: transPinYin(text),
      fullPath: `${fullPath}${transPinYin(text)}`,
      path: `/${transPinYin(text)}`,
      meta: {
        icon: iconCls,
        title: text,
        noCache: false,
        hidden: false,
      },
    };
    const isFrame = attributes && attributes.url && attributes.url.indexOf('html') > -1;
    if (isFrame) {
      obj.meta.frameSrc = attributes.url;
      obj.component = components['PagePanel'];
    } else {
      obj.component = ((() => import(`${attributes.url}`)) as unknown) as () => Promise<
        typeof import('*.vue')
      >;
    }
    if (val.children && val.children.length) {
      obj.children = listToTree(val.children, `${fullPath}${transPinYin(text)}/`);
    }
    d.push(obj);
  });
  return d;
}
const asyncRouter: Array<IMenubarList> = [];

export const generatorDynamicRouter = (data: Array<IMenubarList>): void => {
  /* const routerList: Array<IMenubarList> = listToTree(data); */
  const routerList: Array<IMenubarList> = [
    {
      id: '107455581442277376',
      name: 'DangWuXiTong',
      fullPath: '/DangWuXiTong',
      path: '/DangWuXiTong',
      meta: {
        icon: 'iconfont icon-hrrenshirenshiguanli380',
        title: '党务系统',
        noCache: false,
        hidden: false,
      },
      component: components['Layout'],
      children: [
        {
          id: '107455581513580544',
          name: 'DangZuZhiGuanLi',
          fullPath: '/DangWuXiTong/DangZuZhiGuanLi',
          path: '/DangZuZhiGuanLi',
          component: components['PagePanel'],
          meta: {
            icon: 'iconfont icon-yewutubiaoyanbaofuwu',
            title: '党组织管理',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '107455581622632448',
              name: 'DangZuZhiGuanLi',
              fullPath: '/DangWuXiTong/DangZuZhiGuanLi/DangZuZhiGuanLi',
              path: '/DangZuZhiGuanLi',
              component: components['PagePanel'],
              meta: {
                icon: 'iconfont icon-weiquanzhong',
                title: '党组织管理',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/alteration/ori_manage/ori_manage.html',
              },
            },
            {
              id: '107455581702324224',
              name: 'DangNaZhiWuWeiHu',
              fullPath: '/DangWuXiTong/DangZuZhiGuanLi/DangNaZhiWuWeiHu',
              path: '/DangNaZhiWuWeiHu',
              component: components['PagePanel'],
              meta: {
                icon: 'iconfont icon-pan_icon',
                title: '党内职务维护',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/alteration/job_maintenance/job_maintenance.html',
              },
            },
          ],
        },
        {
          id: '107455581748461568',
          name: 'DangYuanDangAnGuanLi',
          fullPath: '/DangWuXiTong/DangYuanDangAnGuanLi',
          path: '/DangYuanDangAnGuanLi',
          component: components['PagePanel'],
          meta: {
            icon: 'iconfont icon-shujuku',
            title: '党员档案管理',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '107455581844930560',
              name: 'DangYuanDangAn',
              fullPath: '/DangWuXiTong/DangYuanDangAnGuanLi/DangYuanDangAn',
              path: '/DangYuanDangAn',
              component: components['PagePanel'],
              meta: {
                icon: 'iconfont icon-xiangqing2',
                title: '党员档案',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/cost/cost_manage/cost_manage.html',
              },
            },
            {
              id: '107455581941399552',
              name: 'LiShiDangYuanDangAn',
              fullPath: '/DangWuXiTong/DangYuanDangAnGuanLi/LiShiDangYuanDangAn',
              path: '/LiShiDangYuanDangAn',
              component: components['PagePanel'],
              meta: {
                icon: 'iconfont icon-renwujihua',
                title: '历史党员档案',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/cost/history_cost_manage/history_cost_manage.html',
              },
            },
          ],
        },
        {
          id: '107455581991731200',
          name: 'DangYuanYiDongGuanLi',
          fullPath: '/DangWuXiTong/DangYuanYiDongGuanLi',
          path: '/DangYuanYiDongGuanLi',
          meta: {
            icon: 'iconfont icon-renwufenpei',
            title: '党员异动管理',
            noCache: false,
            hidden: false,
          },
          component: components['PagePanel'],
          children: [
            {
              id: '107455582088200192',
              name: 'DangZuZhiGuanXiZhuanRu',
              fullPath: '/DangWuXiTong/DangYuanYiDongGuanLi/DangZuZhiGuanXiZhuanRu',
              path: '/DangZuZhiGuanXiZhuanRu',
              component: components['PagePanel'],
              meta: {
                icon: 'iconfont icon-guanbiquanping',
                title: '党组织关系转入',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/organization/transfer_relations/transfer_relations.html',
              },
            },
            {
              id: '107455582172086272',
              name: 'DangYuanNaBuDiaoDong',
              fullPath: '/DangWuXiTong/DangYuanYiDongGuanLi/DangYuanNaBuDiaoDong',
              path: '/DangYuanNaBuDiaoDong',
              meta: {
                icon: 'iconfont icon-chushihualiuchengshitu',
                title: '党员内部调动',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/organization/inner_transfer/inner_transfer.html',
              },
              component: components['PagePanel'],
            },
            {
              id: '107455582251778048',
              name: 'DangZuZhiGuanXiZhuanChu',
              fullPath: '/DangWuXiTong/DangYuanYiDongGuanLi/DangZuZhiGuanXiZhuanChu',
              path: '/DangZuZhiGuanXiZhuanChu',
              meta: {
                icon: 'iconfont icon-return2fanhuiyou',
                title: '党组织关系转出',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/organization/ori_out_transfer/ori_out_transfer.html',
              },
              component: components['PagePanel'],
            },
            {
              id: '107455582331469824',
              name: 'ChuDangGuanLi',
              fullPath: '/DangWuXiTong/DangYuanYiDongGuanLi/ChuDangGuanLi',
              path: '/ChuDangGuanLi',
              meta: {
                icon: 'iconfont icon-quxiao',
                title: '出党管理',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/organization/out_party/out_party.html',
              },
              component: components['PagePanel'],
            },
          ],
        },
        {
          id: '107455582377607168',
          name: 'DangFeiGuanLi',
          fullPath: '/DangWuXiTong/DangFeiGuanLi',
          path: '/DangFeiGuanLi',
          meta: {
            icon: 'iconfont icon-qian1',
            title: '党费管理',
            noCache: false,
            hidden: false,
          },
          component: components['PagePanel'],
          children: [
            {
              id: '107455582461493248',
              name: 'DangFeiJiaoNaChaXun',
              fullPath: '/DangWuXiTong/DangFeiGuanLi/DangFeiJiaoNaChaXun',
              path: '/DangFeiJiaoNaChaXun',
              meta: {
                icon: 'iconfont icon-chakansousuodingdan',
                title: '党费缴纳查询',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/record/money_inquire/money_inquire.html',
              },
              component: components['PagePanel'],
            },
            {
              id: '107455582541185024',
              name: 'ShouZhiDengJi',
              fullPath: '/DangWuXiTong/DangFeiGuanLi/ShouZhiDengJi',
              path: '/ShouZhiDengJi',
              meta: {
                icon: 'iconfont icon-icon-project',
                title: '收支登记',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/record/money_register/money_register.html',
              },
              component: components['PagePanel'],
            },
            {
              id: '107455582625071104',
              name: 'DangFeiJiaoNaDengJi',
              fullPath: '/DangWuXiTong/DangFeiGuanLi/DangFeiJiaoNaDengJi',
              path: '/DangFeiJiaoNaDengJi',
              meta: {
                icon: 'iconfont icon-pan_icon',
                title: '党费缴纳登记',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/record/party_money_register/party_money_register.html',
              },
              component: components['PagePanel'],
            },
            {
              id: '107877698763751424',
              name: 'YueBiaoZhunSheDing',
              fullPath: '/DangWuXiTong/DangFeiGuanLi/YueBiaoZhunSheDing',
              path: '/YueBiaoZhunSheDing',
              meta: {
                icon: 'iconfont icon-nav-system-set',
                title: '月标准设定',
                noCache: false,
                hidden: false,
                frameSrc: '/pa/record/standard_setup/standard_setup.html',
              },
              component: components['PagePanel'],
            },
          ],
        },
      ],
    },
  ];
  const finallyRoutes = [...routerList, ...asyncRouter];
  finallyRoutes.forEach((item) => {
    router.addRoute('Layout', item as RouteRecordRaw);
  });
  routeStore.setRoutes(finallyRoutes);
};
