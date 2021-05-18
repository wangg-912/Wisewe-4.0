import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createGuard } from './guard/';
/* import { basicRoutes } from './routes/'; */
import { scrollBehavior } from './scrollBehavior';
import { IMenubarList, AppRouteRecordRaw } from './types';

const components: IObject<() => Promise<typeof import('*.vue')>> = {
  Layout: ((() => import('/@/layout/index.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  PagePanel: ((() => import('/@/layout/page/pagePanel.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  Home: ((() => import('/@/components/home/index.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  Redirect: ((() => import('/@/views/system/redirect.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  404: ((() => import('/@/views/error/404.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
};

// 静态路由页面
export const constantRouterMap: Array<IMenubarList> = [
  {
    path: '/redirect',
    component: components['Layout'],
    children: [
      {
        path: '/redirect/:path*',
        component: components['Redirect'],
        meta: {},
      },
    ],
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    component: components['Layout'],
    name: 'PageError',
    redirect: '/404/noFind',
    meta: {
      hidden: true,
      title: '404',
      hideTag: true,
    },
    children: [
      {
        path: 'noFind',
        component: components['404'],
        name: 'NoFind',
        meta: {},
      },
    ]
  },
  {
    path: '/',
    component: components['Layout'],
    redirect: '/home',
    name: 'Root',
    meta: {
      hidden:true,
    },
    children: [
      {
        path: 'home',
        component: components['Home'],
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'el-icon-s-home',
          affix: true,
          hidden:true,
        },
      },
    ],
  },
];

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    name: 'DangWuXiTong',
    path: '/dangwuxitong',
    redirect: '/dangwuxitong/dangzuzhiguanli',
    meta: {
      icon: 'iconfont icon-hrrenshirenshiguanli380',
      title: '党务系统',
      noCache: false,
      hidden: false,
    },
    component: components['Layout'],
    children: [
      {
        name: 'DangZuZhiGuanLi',
        path: 'dangzuzhiguanli',
        component: components['PagePanel'],
        redirect: '/dangwuxitong/dangzuzhiguanli/dangzuzhiguanli3',
        meta: {
          icon: 'iconfont icon-yewutubiaoyanbaofuwu',
          title: '党组织管理',
          noCache: false,
          hidden: false,
        },
        children: [
          {
            name: 'DangZuZhiGuanLi',
            path: 'dangzuzhiguanli3',
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
            name: 'DangNaZhiWuWeiHu',
            path: 'dangnazhiwuweihu',
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
        name: 'DangYuanDangAnGuanLi',
        path: 'dangyuandanganguanli',
        component: components['PagePanel'],
        redirect: '/dangwuxitong/dangyuandanganguanli/dangyuandangan',
        meta: {
          icon: 'iconfont icon-shujuku',
          title: '党员档案管理',
          noCache: false,
          hidden: false,
        },
        children: [
          {
            name: 'DangYuanDangAn',
            path: 'dangyuandangan',
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
            name: 'LiShiDangYuanDangAn',
            path: 'lishidangyuandangan',
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
        path: 'dangyuanyidongguanli',
        redirect: '/dangwuxitong/dangyuanyidongguanli/dangzuzhiguanxizhuanru',
        meta: {
          icon: 'iconfont icon-renwufenpei',
          title: '党员异动管理',
          noCache: false,
          hidden: false,
        },
        component: components['PagePanel'],
        children: [
          {
            name: 'DangZuZhiGuanXiZhuanRu',
            path: 'dangzuzhiguanxizhuanru',
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
            name: 'DangYuanNaBuDiaoDong',
            path: 'dangyuanneibudiaodong',
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
            name: 'DangZuZhiGuanXiZhuanChu',
            path: 'dangzuzhiguanxizhuanchu',
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
            name: 'ChuDangGuanLi',
            path: 'chudangguanli',
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
        name: 'DangFeiGuanLi',
        path: 'dangfeiguanli',
        redirect: '/dangwuxitong/dangfeiguanli/dangfeijiaonachaxun',
        meta: {
          icon: 'iconfont icon-qian1',
          title: '党费管理',
          noCache: false,
          hidden: false,
        },
        component: components['PagePanel'],
        children: [
          {
            name: 'DangFeiJiaoNaChaXun',
            path: 'dangfeijiaonachaxun',
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
            name: 'ShouZhiDengJi',
            path: 'shouzhiguanli',
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
            name: 'DangFeiJiaoNaDengJi',
            path: 'dangfeijiaonadengji',
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
            name: 'YueBiaoZhunSheDing',
            path: 'yuebiaozhunsheding',
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

const router = createRouter({
  history: createWebHashHistory(), // createWebHistory
  routes: (constantRouterMap as unknown) as RouteRecordRaw[],
  strict: true,
  scrollBehavior: scrollBehavior,
});
export function resetRouter(): void {
  const resetWhiteNameList = ['RedirectRoot', 'Redirect', 'Root', 'Home', 'Page404'];
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
export function setupRouter(app: App<Element>) {
  app.use(router);
  createGuard(router);
}
export default router;
