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
    let obj = {
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
    let isFrame = attributes && attributes.url && attributes.url.indexOf('html') > -1;
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
const asyncRouter: Array<IMenubarList> = [{ path: '/:pathMatch(.*)*', redirect: '/' }];

export const generatorDynamicRouter = (data: Array<IMenubarList>): void => {
  /* const routerList: Array<IMenubarList> = listToTree(data); */
  const routerList: Array<IMenubarList> = [
    {
      id: '74090838891696128',
      name: 'GeRenShiWuDaTing',
      fullPath: '/GeRenShiWuDaTing',
      path: '/GeRenShiWuDaTing',
      meta: {
        icon: 'iconfont icon-yonghuicon',
        title: '个人事务大厅',
        noCache: false,
        hidden: false,
      },
      children: [
        {
          id: '74090838904279040',
          name: 'DaiBanShiXiang',
          fullPath: '/GeRenShiWuDaTing/DaiBanShiXiang',
          path: '/DaiBanShiXiang',
          meta: {
            icon: 'iconfont icon-warningo',
            title: '待办事项',
            noCache: false,
            hidden: false,
            frameSrc: '/platform/agency_new/agency.html',
          },
        },
        {
          id: '219860400756228096',
          name: 'XueShengZongSuPingJiaRenWu',
          fullPath: '/GeRenShiWuDaTing/XueShengZongSuPingJiaRenWu',
          path: '/XueShengZongSuPingJiaRenWu',
          meta: {
            icon: '',
            title: '学生综素评价任务',
            noCache: false,
            hidden: false,
            frameSrc: '/se/student_mission/student_mission.html',
          },
        },
        {
          id: '74090838912667648',
          name: 'YiBanShiXiang',
          fullPath: '/GeRenShiWuDaTing/YiBanShiXiang',
          path: '/YiBanShiXiang',
          meta: {
            icon: 'iconfont icon-zan',
            title: '已办事项',
            noCache: false,
            hidden: false,
            frameSrc: '/platform/agency_new/complete.html',
          },
        },
        {
          id: '74090845980069888',
          name: 'SuSheShiWuShenQing',
          fullPath: '/GeRenShiWuDaTing/SuSheShiWuShenQing',
          path: '/SuSheShiWuShenQing',
          meta: {
            icon: 'iconfont icon-wenjianjia',
            title: '宿舍事务申请',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '74090846005235712',
              name: 'RuZhuShenQing',
              fullPath: '/GeRenShiWuDaTing/SuSheShiWuShenQing/RuZhuShenQing',
              path: '/RuZhuShenQing',
              meta: {
                icon: 'iconfont icon-17',
                title: '入住申请',
                noCache: false,
                hidden: false,
                frameSrc:
                  '/studentwork/dormitory/personal/check_apply/check_apply/check_apply.html',
              },
            },
            {
              id: '74090846034595840',
              name: 'BianGengShenQing',
              fullPath: '/GeRenShiWuDaTing/SuSheShiWuShenQing/BianGengShenQing',
              path: '/BianGengShenQing',
              meta: {
                icon: 'iconfont icon-24',
                title: '变更申请',
                noCache: false,
                hidden: false,
                frameSrc: '/studentwork/dormitory/personal/change_apply/change_apply.html',
              },
            },
            {
              id: '74090846059761664',
              name: 'TuiSheShenQing',
              fullPath: '/GeRenShiWuDaTing/SuSheShiWuShenQing/TuiSheShenQing',
              path: '/TuiSheShenQing',
              meta: {
                icon: 'iconfont icon-cuowu1',
                title: '退舍申请',
                noCache: false,
                hidden: false,
                frameSrc: '/studentwork/dormitory/personal/quit_apply/quit_apply.html',
              },
            },
            {
              id: '74090846084927488',
              name: 'JiaQiLiuXiaoShenQing',
              fullPath: '/GeRenShiWuDaTing/SuSheShiWuShenQing/JiaQiLiuXiaoShenQing',
              path: '/JiaQiLiuXiaoShenQing',
              meta: {
                icon: 'iconfont icon-xiangqingyeshaixuan',
                title: '假期留校申请',
                noCache: false,
                hidden: false,
                frameSrc: '/studentwork/dormitory/personal/vacation_apply/vacation_apply.html',
              },
            },
          ],
        },
        {
          id: '74090846105899008',
          name: 'JiaQiLiuXiaoXueShengTongJi',
          fullPath: '/GeRenShiWuDaTing/JiaQiLiuXiaoXueShengTongJi',
          path: '/JiaQiLiuXiaoXueShengTongJi',
          meta: {
            icon: 'iconfont icon-jihua1',
            title: '假期留校学生统计',
            noCache: false,
            hidden: false,
            frameSrc: '/studentwork/dormitory/personal/vacation_query/vacation_query.html',
          },
        },
        {
          id: '199534612114833408',
          name: 'BanZhuRenKaoHeXueSheng',
          fullPath: '/GeRenShiWuDaTing/BanZhuRenKaoHeXueSheng',
          path: '/BanZhuRenKaoHeXueSheng',
          meta: {
            icon: '',
            title: '班主任考核（学生）',
            noCache: false,
            hidden: false,
            frameSrc: '/hte/student_examine/student_examine.html',
          },
        },
        {
          id: '74090846131064832',
          name: 'XueShengZhuSuChaXun',
          fullPath: '/GeRenShiWuDaTing/XueShengZhuSuChaXun',
          path: '/XueShengZhuSuChaXun',
          meta: {
            icon: 'iconfont icon-chakansousuodingdan',
            title: '学生住宿查询',
            noCache: false,
            hidden: false,
            frameSrc: '/studentwork/dormitory/personal/stay_query/stay_query.html',
          },
        },
        {
          id: '199535717376851968',
          name: 'BanZhuRenGeRenChengJi',
          fullPath: '/GeRenShiWuDaTing/BanZhuRenGeRenChengJi',
          path: '/BanZhuRenGeRenChengJi',
          meta: {
            icon: '',
            title: '班主任个人成绩',
            noCache: false,
            hidden: false,
            frameSrc: '/hte/teacher_result/teacher_result.html',
          },
        },
        {
          id: '74090838937833472',
          name: 'JiaoXueGuanLi',
          fullPath: '/GeRenShiWuDaTing/JiaoXueGuanLi',
          path: '/JiaoXueGuanLi',
          meta: {
            icon: 'iconfont icon-daojishimeidian',
            title: '教学管理',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '74090838958804992',
              name: 'JiaoXueRenWuChaXun',
              fullPath: '/GeRenShiWuDaTing/JiaoXueGuanLi/JiaoXueRenWuChaXun',
              path: '/JiaoXueRenWuChaXun',
              meta: {
                icon: 'iconfont icon-zhanneisousuo',
                title: '教学任务查询',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/pedagogical/task/task_query/task_person.html',
              },
            },
            {
              id: '74090838975582208',
              name: 'GeRenKeBiaoChaXun',
              fullPath: '/GeRenShiWuDaTing/JiaoXueGuanLi/GeRenKeBiaoChaXun',
              path: '/GeRenKeBiaoChaXun',
              meta: {
                icon: 'iconfont icon-chakansousuodingdan',
                title: '个人课表查询',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/schedule/setting/teacher_table_pre/teacher_table_pre.html',
              },
            },
          ],
        },
        {
          id: '74090838983970816',
          name: 'JiaoXueGuoChengGuanLi',
          fullPath: '/GeRenShiWuDaTing/JiaoXueGuoChengGuanLi',
          path: '/JiaoXueGuoChengGuanLi',
          meta: {
            icon: 'iconfont icon-shujuku',
            title: '教学过程管理',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '74090839004942336',
              name: 'DiaoDaiKeShenQing',
              fullPath: '/GeRenShiWuDaTing/JiaoXueGuoChengGuanLi/DiaoDaiKeShenQing',
              path: '/DiaoDaiKeShenQing',
              meta: {
                icon: 'iconfont icon-canshu',
                title: '调代课申请',
                noCache: false,
                hidden: false,
                frameSrc:
                  '/ems/daily_affairs/schedule_change/substitute_class/substitute_list.html',
              },
            },
            {
              id: '74090839021719552',
              name: 'JiHuaJiaoXueRiZhiDengJi',
              fullPath: '/GeRenShiWuDaTing/JiaoXueGuoChengGuanLi/JiHuaJiaoXueRiZhiDengJi',
              path: '/JiHuaJiaoXueRiZhiDengJi',
              meta: {
                icon: 'iconfont icon-iconbi',
                title: '计划教学日志登记',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/daily_affairs/teaching_process/main_register/main_register.html',
              },
            },
            {
              id: '74090839038496768',
              name: 'FeiJiHuaJiaoXueRiZhiDengJi',
              fullPath: '/GeRenShiWuDaTing/JiaoXueGuoChengGuanLi/FeiJiHuaJiaoXueRiZhiDengJi',
              path: '/FeiJiHuaJiaoXueRiZhiDengJi',
              meta: {
                icon: 'iconfont icon-pencil',
                title: '非计划教学日志登记',
                noCache: false,
                hidden: false,
                frameSrc:
                  '/ems/daily_affairs/teaching_process/unplanned_teaching/register/unplan_teaching.html',
              },
            },
            {
              id: '74090839059468288',
              name: 'JiHuaJiaoXueRiZhiChaXun',
              fullPath: '/GeRenShiWuDaTing/JiaoXueGuoChengGuanLi/JiHuaJiaoXueRiZhiChaXun',
              path: '/JiHuaJiaoXueRiZhiChaXun',
              meta: {
                icon: 'iconfont icon-986caidan_ziyuangongxiang',
                title: '计划教学日志查询',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/daily_affairs/teaching_process/plan_teaching/query/plan_query.html',
              },
            },
            {
              id: '74090839076245504',
              name: 'FeiJiHuaJiaoXueRiZhiChaXun',
              fullPath: '/GeRenShiWuDaTing/JiaoXueGuoChengGuanLi/FeiJiHuaJiaoXueRiZhiChaXun',
              path: '/FeiJiHuaJiaoXueRiZhiChaXun',
              meta: {
                icon: 'iconfont icon-xiangji',
                title: '非计划教学日志查询',
                noCache: false,
                hidden: false,
                frameSrc:
                  '/ems/daily_affairs/teaching_process/unplanned_teaching/query/unplanned_query.html',
              },
            },
            {
              id: '74090839097217024',
              name: 'JiaoXueGongZuoLiangHeSuanChaXun',
              fullPath: '/GeRenShiWuDaTing/JiaoXueGuoChengGuanLi/JiaoXueGongZuoLiangHeSuanChaXun',
              path: '/JiaoXueGongZuoLiangHeSuanChaXun',
              meta: {
                icon: 'iconfont icon-qian1',
                title: '教学工作量核算查询',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/daily_affairs/teaching_process/workload_query/worlkload_count.html',
              },
            },
            {
              id: '173721244200341504',
              name: 'JiHuaJiaoXueRiZhiBanJiShenHe',
              fullPath: '/GeRenShiWuDaTing/JiaoXueGuoChengGuanLi/JiHuaJiaoXueRiZhiBanJiShenHe',
              path: '/JiHuaJiaoXueRiZhiBanJiShenHe',
              meta: {
                icon: 'iconfont icon-iconset0203',
                title: '计划教学日志班级审核',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/daily_affairs/planning_teaching/student_examine.html',
              },
            },
          ],
        },
        {
          id: '74090839105605632',
          name: 'GeRenKaoWu',
          fullPath: '/GeRenShiWuDaTing/GeRenKaoWu',
          path: '/GeRenKaoWu',
          meta: {
            icon: 'iconfont icon-hrrenshirenshiguanli380',
            title: '个人考务',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '74090839122382848',
              name: 'JiaoShiJianKaoChaXun',
              fullPath: '/GeRenShiWuDaTing/GeRenKaoWu/JiaoShiJianKaoChaXun',
              path: '/JiaoShiJianKaoChaXun',
              meta: {
                icon: 'iconfont icon-weiquanzhong',
                title: '教师监考查询',
                noCache: false,
                hidden: false,
                frameSrc:
                  '/ems/examination_affairs/routine_affairs_manage/affairs_personal/invigilated_query/invigilated_query.html',
              },
            },
            {
              id: '74090839139160064',
              name: 'KaoWuRiZhiTianXie',
              fullPath: '/GeRenShiWuDaTing/GeRenKaoWu/KaoWuRiZhiTianXie',
              path: '/KaoWuRiZhiTianXie',
              meta: {
                icon: 'iconfont icon-weixingongnenggengxin',
                title: '考务日志填写',
                noCache: false,
                hidden: false,
                frameSrc:
                  '/ems/examination_affairs/routine_affairs_manage/affairs_personal/log_register/log_register.html',
              },
            },
          ],
        },
        {
          id: '74090839147548672',
          name: 'ChengJiGuanLi',
          fullPath: '/GeRenShiWuDaTing/ChengJiGuanLi',
          path: '/ChengJiGuanLi',
          meta: {
            icon: 'iconfont icon-986caidan_ziyuangongxiang',
            title: '成绩管理',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '74090839168520192',
              name: 'ShouDongPingFenDengJi',
              fullPath: '/GeRenShiWuDaTing/ChengJiGuanLi/ShouDongPingFenDengJi',
              path: '/ShouDongPingFenDengJi',
              meta: {
                icon: 'iconfont icon-iconbi',
                title: '手动评分登记',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/courses/evaluation/management/process/manual/manual_regist.html',
              },
            },
            {
              id: '74090839185297408',
              name: 'KouFenDengJi',
              fullPath: '/GeRenShiWuDaTing/ChengJiGuanLi/KouFenDengJi',
              path: '/KouFenDengJi',
              meta: {
                icon: 'iconfont icon-bianji2',
                title: '扣分登记',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/courses/evaluation/management/process/deduct/point_regist.html',
              },
            },
            {
              id: '74090839202074624',
              name: 'EWaiJiaJianFenDengJi',
              fullPath: '/GeRenShiWuDaTing/ChengJiGuanLi/EWaiJiaJianFenDengJi',
              path: '/EWaiJiaJianFenDengJi',
              meta: {
                icon: 'iconfont icon-checkbox-multiple-marked-outline',
                title: '额外加减分登记',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/courses/evaluation/management/process/extra/extra_index.html',
              },
            },
            {
              id: '74090839223046144',
              name: 'KeChengKaoShiChengJiLuRu',
              fullPath: '/GeRenShiWuDaTing/ChengJiGuanLi/KeChengKaoShiChengJiLuRu',
              path: '/KeChengKaoShiChengJiLuRu',
              meta: {
                icon: 'iconfont icon-tubiao-hanshu',
                title: '课程考试成绩录入',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/courses/evaluation/management/score/management_score.html',
              },
            },
            {
              id: '74090839239823360',
              name: 'BuKaoChengJiLuRu',
              fullPath: '/GeRenShiWuDaTing/ChengJiGuanLi/BuKaoChengJiLuRu',
              path: '/BuKaoChengJiLuRu',
              meta: {
                icon: 'iconfont icon-kuozhanshuxing',
                title: '补考成绩录入',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/courses/evaluation/resit/register/register.html',
              },
            },
            {
              id: '74090839260794880',
              name: 'KeChengPingJiaJieGuoGuanLi',
              fullPath: '/GeRenShiWuDaTing/ChengJiGuanLi/KeChengPingJiaJieGuoGuanLi',
              path: '/KeChengPingJiaJieGuoGuanLi',
              meta: {
                icon: 'iconfont icon-qingkong',
                title: '课程评价结果管理',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/courses/evaluation/management/result/resoult_manage.html',
              },
            },
            {
              id: '74090839277572096',
              name: 'XueShengChengJiChaXun',
              fullPath: '/GeRenShiWuDaTing/ChengJiGuanLi/XueShengChengJiChaXun',
              path: '/XueShengChengJiChaXun',
              meta: {
                icon: 'iconfont icon-chakansousuodingdan',
                title: '学生成绩查询',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/courses/evaluation/history_grade/history_grade.html',
              },
            },
            {
              id: '74090839294349312',
              name: 'BenBanBanJiChengJiChaXun',
              fullPath: '/GeRenShiWuDaTing/ChengJiGuanLi/BenBanBanJiChengJiChaXun',
              path: '/BenBanBanJiChengJiChaXun',
              meta: {
                icon: 'iconfont icon-sousuo4',
                title: '本班班级成绩查询',
                noCache: false,
                hidden: false,
                frameSrc: '/ems/courses/evaluation/query/class_grade/class_grade_person.html',
              },
            },
          ],
        },
        {
          id: '111861012541476864',
          name: 'SuSheGuanLi',
          fullPath: '/GeRenShiWuDaTing/SuSheGuanLi',
          path: '/SuSheGuanLi',
          meta: {
            icon: 'iconfont icon-fangzi',
            title: '宿舍管理',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '111861012671500288',
              name: 'JiaQiLiuXiaoXueShengTongJi',
              fullPath: '/GeRenShiWuDaTing/SuSheGuanLi/JiaQiLiuXiaoXueShengTongJi',
              path: '/JiaQiLiuXiaoXueShengTongJi',
              meta: {
                icon: 'iconfont icon-jia',
                title: '假期留校学生统计',
                noCache: false,
                hidden: false,
                frameSrc: '/studentwork/dormitory/personal/vacation_query/vacation_query.html',
              },
            },
            {
              id: '111861012730220544',
              name: 'XueShengZhuSuChaXun',
              fullPath: '/GeRenShiWuDaTing/SuSheGuanLi/XueShengZhuSuChaXun',
              path: '/XueShengZhuSuChaXun',
              meta: {
                icon: 'iconfont icon-sousuo',
                title: '学生住宿查询',
                noCache: false,
                hidden: false,
                frameSrc: '/studentwork/dormitory/personal/stay_query/stay_query.html',
              },
            },
          ],
        },
        {
          id: '107455582671208448',
          name: 'GeRenDangYuanDangAnChaXun',
          fullPath: '/GeRenShiWuDaTing/GeRenDangYuanDangAnChaXun',
          path: '/GeRenDangYuanDangAnChaXun',
          meta: {
            icon: 'iconfont icon-kecheng-',
            title: '个人党员档案查询',
            noCache: false,
            hidden: false,
            frameSrc: '/pa/record_query/personal_file/personal_file.html',
          },
        },
        {
          id: '117927903496245248',
          name: 'XiaoLiShangChuan',
          fullPath: '/GeRenShiWuDaTing/XiaoLiShangChuan',
          path: '/XiaoLiShangChuan',
          meta: {
            icon: 'iconfont icon-daojishimeidian',
            title: '校历上传',
            noCache: false,
            hidden: false,
            frameSrc: '/platform/school_calendar/set.html',
          },
        },
        {
          id: '117928010098675712',
          name: 'XiaoLiChaXun',
          fullPath: '/GeRenShiWuDaTing/XiaoLiChaXun',
          path: '/XiaoLiChaXun',
          meta: {
            icon: 'iconfont icon-biaoge',
            title: '校历查询',
            noCache: false,
            hidden: false,
            frameSrc: '/platform/new_calendar/query.html',
          },
        },
        {
          id: '153460181823389696',
          name: 'RenShiGuanLi',
          fullPath: '/GeRenShiWuDaTing/RenShiGuanLi',
          path: '/RenShiGuanLi',
          meta: {
            icon: 'iconfont icon-wenjian1',
            title: '人事管理',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '68017860483481600',
              name: 'LiZhiShenQing',
              fullPath: '/GeRenShiWuDaTing/RenShiGuanLi/LiZhiShenQing',
              path: '/LiZhiShenQing',
              meta: {
                icon: 'iconfont icon-chazhao2',
                title: '离职申请',
                noCache: false,
                hidden: false,
                frameSrc: '/ps/worker_change_mana/dimission_mana/dimission_apply.html',
              },
            },
            {
              id: '67200330542088192',
              name: 'ZhuanZhengShenQing',
              fullPath: '/GeRenShiWuDaTing/RenShiGuanLi/ZhuanZhengShenQing',
              path: '/ZhuanZhengShenQing',
              meta: {
                icon: 'iconfont icon-user',
                title: '转正申请',
                noCache: false,
                hidden: false,
                frameSrc: '/ps/worker_change_mana/positive_apply/apply.html',
              },
            },
            {
              id: '72265325143392256',
              name: 'GeRenXinXiGuanLi',
              fullPath: '/GeRenShiWuDaTing/RenShiGuanLi/GeRenXinXiGuanLi',
              path: '/GeRenXinXiGuanLi',
              meta: {
                icon: 'iconfont icon-kehu',
                title: '个人信息管理',
                noCache: false,
                hidden: false,
                frameSrc: '/ps/person_info_query/personal_query/main_details.html',
              },
            },
            {
              id: '148091225780518912',
              name: 'GeRenGongZiChaXun',
              fullPath: '/GeRenShiWuDaTing/RenShiGuanLi/GeRenGongZiChaXun',
              path: '/GeRenGongZiChaXun',
              meta: {
                icon: 'iconfont icon-renminbi',
                title: '个人工资查询',
                noCache: false,
                hidden: false,
                frameSrc: '/ps/wage_search/wage_search.html',
              },
            },
          ],
        },
      ],
    },
    {
      id: '32043797638545408',
      name: 'XiTongGuanLi',
      fullPath: '/XiTongGuanLi',
      path: '/XiTongGuanLi',
      meta: {
        icon: 'iconfont icon-shezhi',
        title: '系统管理',
        noCache: false,
        hidden: false,
      },
      children: [
        {
          id: '32043797714042880',
          name: 'QuanXianGuanLi',
          fullPath: '/XiTongGuanLi/QuanXianGuanLi',
          path: '/QuanXianGuanLi',
          meta: {
            icon: 'iconfont icon-171',
            title: '权限管理',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '32043798229942272',
              name: 'YingYongGuanLi',
              fullPath: '/XiTongGuanLi/QuanXianGuanLi/YingYongGuanLi',
              path: '/YingYongGuanLi',
              meta: {
                icon: 'iconfont icon-jichushuju',
                title: '应用管理',
                noCache: false,
                hidden: false,
                frameSrc: '/platform/base/auth/application/list.html',
              },
            },
            {
              id: '32043798481600512',
              name: 'CaiDanGuanLi',
              fullPath: '/XiTongGuanLi/QuanXianGuanLi/CaiDanGuanLi',
              path: '/CaiDanGuanLi',
              meta: {
                icon: 'iconfont icon-leimupinleifenleileibie',
                title: '菜单管理',
                noCache: false,
                hidden: false,
                frameSrc: '/platform/base/auth/menu/menu.html',
              },
            },
            {
              id: '32043798523543552',
              name: 'JiaoSeGuanLi',
              fullPath: '/XiTongGuanLi/QuanXianGuanLi/JiaoSeGuanLi',
              path: '/JiaoSeGuanLi',
              meta: {
                icon: 'iconfont icon-yonghu1',
                title: '角色管理',
                noCache: false,
                hidden: false,
                frameSrc: '/platform/base/auth/role/role.html',
              },
            },
            {
              id: '32043798599041024',
              name: 'RenYuanGuanLi',
              fullPath: '/XiTongGuanLi/QuanXianGuanLi/RenYuanGuanLi',
              path: '/RenYuanGuanLi',
              meta: {
                icon: 'iconfont icon-iconset0203',
                title: '人员管理',
                noCache: false,
                hidden: false,
                frameSrc: '/platform/base/auth/user/user.html',
              },
            },
            {
              id: '32043797781151744',
              name: 'GongNenQuanXianGuanLi',
              fullPath: '/XiTongGuanLi/QuanXianGuanLi/GongNenQuanXianGuanLi',
              path: '/GongNenQuanXianGuanLi',
              meta: {
                icon: 'iconfont icon-thermometer',
                title: '功能权限管理',
                noCache: false,
                hidden: false,
                frameSrc: '/platform/base/auth/functional_authority/functional_authority.html',
              },
            },
          ],
        },
        {
          id: '32043799144300544',
          name: 'RenWuGuanLi',
          fullPath: '/XiTongGuanLi/RenWuGuanLi',
          path: '/RenWuGuanLi',
          meta: {
            icon: 'iconfont icon-zhongmingming',
            title: '任务管理',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '32043799400153088',
              name: 'DongTaiRenWuGuanLi',
              fullPath: '/XiTongGuanLi/RenWuGuanLi/DongTaiRenWuGuanLi',
              path: '/DongTaiRenWuGuanLi',
              meta: {
                icon: 'iconfont icon-liucheng1',
                title: '动态任务管理',
                noCache: false,
                hidden: false,
                frameSrc: '/platform/base/common/dyna_task/dyna_task.html',
              },
            },
            {
              id: '32043799651811328',
              name: 'ShiJianRenWuGuanLi',
              fullPath: '/XiTongGuanLi/RenWuGuanLi/ShiJianRenWuGuanLi',
              path: '/ShiJianRenWuGuanLi',
              meta: {
                icon: 'iconfont icon-lishi',
                title: '时间任务管理',
                noCache: false,
                hidden: false,
                frameSrc: '/platform/base/common/time_task/time_task.html',
              },
            },
          ],
        },
        {
          id: '36391850944233472',
          name: 'ShuJuZhongXin',
          fullPath: '/XiTongGuanLi/ShuJuZhongXin',
          path: '/ShuJuZhongXin',
          meta: {
            icon: 'iconfont icon-qian2',
            title: '数据中心',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '32045523129073664',
              name: 'ShuJuBiaoPeiZhi',
              fullPath: '/XiTongGuanLi/ShuJuZhongXin/ShuJuBiaoPeiZhi',
              path: '/ShuJuBiaoPeiZhi',
              meta: {
                icon: 'iconfont icon-jinbi1',
                title: '数据表配置',
                noCache: false,
                hidden: false,
                frameSrc: '/datacenter/base/data_table/data_table.html',
              },
            },
            {
              id: '32046655427575808',
              name: 'ShuJuBiaoXinXiGuanLi',
              fullPath: '/XiTongGuanLi/ShuJuZhongXin/ShuJuBiaoXinXiGuanLi',
              path: '/ShuJuBiaoXinXiGuanLi',
              meta: {
                icon: 'iconfont icon-qian2',
                title: '数据表信息管理',
                noCache: false,
                hidden: false,
                frameSrc: '/datacenter/base/data_management/data_management.html',
              },
            },
            {
              id: '32047002711752704',
              name: 'JieKouGuanLi',
              fullPath: '/XiTongGuanLi/ShuJuZhongXin/JieKouGuanLi',
              path: '/JieKouGuanLi',
              meta: {
                icon: 'iconfont icon-xinhaoxian',
                title: '接口管理',
                noCache: false,
                hidden: false,
                frameSrc: '/datacenter/base/interface_management/interface_management.html',
              },
            },
            {
              id: '32047231108382720',
              name: 'JieKouQuanXianPeiZhi',
              fullPath: '/XiTongGuanLi/ShuJuZhongXin/JieKouQuanXianPeiZhi',
              path: '/JieKouQuanXianPeiZhi',
              meta: {
                icon: 'iconfont icon-qiyechazhao',
                title: '接口权限配置',
                noCache: false,
                hidden: false,
                frameSrc: 'datacenter\baseinterface_permissionsinterface_permissions.html',
              },
            },
            {
              id: '57163866362085376',
              name: 'JieKouFangWenRiZhi',
              fullPath: '/XiTongGuanLi/ShuJuZhongXin/JieKouFangWenRiZhi',
              path: '/JieKouFangWenRiZhi',
              meta: {
                icon: 'iconfont icon-986caidan_ziyuangongxiang',
                title: '接口访问日志',
                noCache: false,
                hidden: false,
                frameSrc: '/datacenter/base/access_log/list.html',
              },
            },
            {
              id: '57164918973005824',
              name: 'TongBuJieKouShiJian',
              fullPath: '/XiTongGuanLi/ShuJuZhongXin/TongBuJieKouShiJian',
              path: '/TongBuJieKouShiJian',
              meta: {
                icon: 'iconfont icon-guanbiquanping',
                title: '同步接口时间',
                noCache: false,
                hidden: false,
                frameSrc: '/datacenter/base/requesttime/list.html',
              },
            },
            {
              id: '119798369110458368',
              name: 'ZiDingYiJieKouPeiZhi',
              fullPath: '/XiTongGuanLi/ShuJuZhongXin/ZiDingYiJieKouPeiZhi',
              path: '/ZiDingYiJieKouPeiZhi',
              meta: {
                icon: 'iconfont icon-paimai_',
                title: '自定义接口配置',
                noCache: false,
                hidden: false,
                frameSrc: '/datacenter/base/diy_interface_config/diy_interface_config.html',
              },
            },
          ],
        },
        {
          id: '32043799718920192',
          name: 'ZiDianGuanLi',
          fullPath: '/XiTongGuanLi/ZiDianGuanLi',
          path: '/ZiDianGuanLi',
          meta: {
            icon: 'iconfont icon-zidian',
            title: '字典管理',
            noCache: false,
            hidden: false,
            frameSrc: '/platform/base/common/dict/dict.html',
          },
        },
        {
          id: '32043799848943616',
          name: 'ShuXingGuanLi',
          fullPath: '/XiTongGuanLi/ShuXingGuanLi',
          path: '/ShuXingGuanLi',
          meta: {
            icon: 'iconfont icon-kuozhanshuxing',
            title: '属性管理',
            noCache: false,
            hidden: false,
            frameSrc: '/platform/base/common/property/property.html',
          },
        },
        {
          id: '32043799807000576',
          name: 'AnQuanCeLuePeiZhi',
          fullPath: '/XiTongGuanLi/AnQuanCeLuePeiZhi',
          path: '/AnQuanCeLuePeiZhi',
          meta: {
            icon: 'iconfont icon-anquan',
            title: '安全策略配置',
            noCache: false,
            hidden: false,
            frameSrc: '/platform/base/auth/security/security_policy.html',
          },
        },
        {
          id: '47262069350727680',
          name: 'HuanCunGuanLi',
          fullPath: '/XiTongGuanLi/HuanCunGuanLi',
          path: '/HuanCunGuanLi',
          meta: {
            icon: 'iconfont icon-chushihualiuchengshitu',
            title: '缓存管理',
            noCache: false,
            hidden: false,
            frameSrc: '/platform/base/common/cache/data_table.html',
          },
        },
        {
          id: '57163724418449408',
          name: 'FuJianLeiXing',
          fullPath: '/XiTongGuanLi/FuJianLeiXing',
          path: '/FuJianLeiXing',
          meta: {
            icon: 'iconfont icon-shuzi',
            title: '附件类型',
            noCache: false,
            hidden: false,
            frameSrc: '/platform/attachment/attachment_type/list.html',
          },
        },
        {
          id: '293432180019822592',
          name: 'ZiDingYiLogo',
          fullPath: '/XiTongGuanLi/ZiDingYiLogo',
          path: '/ZiDingYiLogo',
          meta: {
            icon: 'iconfont icon-tupian',
            title: '自定义Logo',
            noCache: false,
            hidden: false,
            frameSrc: '/platform/cropper/index.html',
          },
        },
        {
          id: '323756174589558784',
          name: 'CeShiCaiDan',
          fullPath: '/XiTongGuanLi/CeShiCaiDan',
          path: '/CeShiCaiDan',
          meta: {
            icon: '',
            title: '测试菜单',
            noCache: false,
            hidden: false,
          },
          children: [
            {
              id: '323756426876944384',
              name: 'CeShiYongHuGuanLi',
              fullPath: '/XiTongGuanLi/CeShiCaiDan/CeShiYongHuGuanLi',
              path: '/CeShiYongHuGuanLi',
              meta: {
                icon: '',
                title: '测试用户管理',
                noCache: false,
                hidden: false,
                frameSrc: '/platform/yytest/user-manage/index.html',
              },
            },
          ],
        },
      ],
    },
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
      children: [
        {
          id: '107455581513580544',
          name: 'DangZuZhiGuanLi',
          fullPath: '/DangWuXiTong/DangZuZhiGuanLi',
          path: '/DangZuZhiGuanLi',
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
          children: [
            {
              id: '107455582088200192',
              name: 'DangZuZhiGuanXiZhuanRu',
              fullPath: '/DangWuXiTong/DangYuanYiDongGuanLi/DangZuZhiGuanXiZhuanRu',
              path: '/DangZuZhiGuanXiZhuanRu',
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
  /* console.log(JSON.stringify(finallyRoutes)); */
  /* router.addRoutes(finallyRoutes); */
};
