<template>
  <el-header v-if="getShowHeader" :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <AppLogo
        v-if="showHeadLogo || getIsMobile"
        :class="[`${prefixCls}-logo`, `${prefixCls}--${headerTheme}`]"
        :theme="headerTheme"
        :siderType="siderType"
        :showLogoTitle="!getIsMobile"
        :isMobile="getIsMobile ? 'mobile' : ''"
      />
      <div :class="`${prefixCls}-left--bread`" v-if="siderType !== `top-menu` && !getIsMobile">
        <LayoutTrigger :theme="headerTheme" />
        <BreadCrumb v-if="getShowBread" :theme="headerTheme" />
      </div>
      <!-- mobile模式专用 -->
      <div v-if="getIsMobile" style="padding: 0 8px">
        <i class="el-icon-s-fold" style="font-size: 16px" @click="tgMobileTrigger"></i>
      </div>
    </div>
    <div :class="`${prefixCls}-center`">
      <el-scrollbar>
        <LayoutSider
          v-if="`${siderType}` == 'top-menu'"
          style="display: flex; max-width: 1280px"
          :navMode="siderType == 'top-menu' ? 'horizontal' : 'vertical'"
          :siderType="siderType"
        />
      </el-scrollbar>
    </div>
    <div :class="[`${prefixCls}-right`, `${prefixCls}-right--${headerTheme}`]">
      <div :class="`${prefixCls}-right--item`">
        <AppSearch />
      </div>
      <div v-if="getShowFullScreen && !getIsMobile" :class="`${prefixCls}-right--item`">
        <Screenfull />
      </div>
      <div v-if="getShowNotice" :class="`${prefixCls}-right--item`">
        <el-badge type="danger" :value="200" :max="99">
          <i class="el-icon-bell" size="18"></i>
        </el-badge>
      </div>
      <div :class="`${prefixCls}-right--item`">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <div :class="[`${prefixCls}-right--item`, `${prefixCls}-right--user`]">
        <el-dropdown @command="handCommand">
          <span class="el-dropdown-link drop--user--text" style="font-size: 12px">
            <span v-if="userInfo.name">{{ userInfo.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="modify">
                <i class="el-icon-edit"></i>修改密码
              </el-dropdown-item>
              <el-dropdown-item divided command="loginout">
                <i class="el-icon-switch-button"></i>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <form
          ref="loginOutForm"
          style="display: none"
          action="/shiro-cas-logout"
          method="GET"
          @submit.prevent="submit"
        ></form>
      </div>
      <SettingDrawer
        v-if="getShowSettingButton && !getIsMobile"
        :class="`${prefixCls}-right--item`"
      />
      <BasicDialog @register="register1" @save="modifyPassWord">
        <SettingPsd ref="setPsdRef" />
      </BasicDialog>
    </div>
  </el-header>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent, computed, unref, ref } from 'vue';
  import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { SettingButtonPositionEnum } from '/@/enums/appEnum';
  import { AppLogo, AppSearch } from '/@/components/Applications';
  import BreadCrumb from './components/BreadCrumb.vue';
  import LayoutTrigger from './components/Trigger.vue';
  import Screenfull from './components/Screenfull.vue';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { userStore } from '/@/store/modules/user';
  import { BasicDialog, useDialog } from '/@/components/Dialog';
  import SettingPsd from './components/SettingPsd.vue';
  export default defineComponent({
    name: 'LayoutHeader',
    props: {
      siderType: {
        type: String as PropType<string>,
        dafault: '',
      },
      fixed: {
        type: Boolean as PropType<boolean>,
        default: true,
      },
    },
    components: {
      AppLogo,
      AppSearch,
      LayoutTrigger,
      BreadCrumb,
      Screenfull,
      SettingDrawer: createAsyncComponent(() => import('/@/layout/components/setting/index.vue'), {
        loading: true,
      }),
      LayoutSider: createAsyncComponent(() => import('/@/layout/components/aside/index.vue')),
      BasicDialog,
      SettingPsd,
    },
    setup(props) {
      const loginOutForm = ref(null);
      const setPsdRef = ref(null);
      const {
        getShowSetting,
        getSettingPosition,
        getMobileTriggrState,
        toggleMobileTriggerState,
      } = useRootSetting();
      const { prefixCls } = useDesign('layout-header');
      const {
        getHeaderTheme,
        getShowFullScreen,
        getShowNotice,
        getShowBread,
        getShowHeaderLogo,
        getShowHeader,
      } = useHeaderSetting();
      const showHeadLogo = computed(() => unref(getShowHeaderLogo));
      const userInfo = computed(() => userStore.getUserInfoState);
      const { getIsMobile } = useAppInject();
      const getHeaderClass = computed(() => {
        const theme = unref(getHeaderTheme);
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: props.fixed,
            [`${prefixCls}--${theme}`]: theme,
          },
        ];
      });
      const headerTheme = computed(() => unref(getHeaderTheme));
      const getShowSettingButton = computed(() => {
        if (!unref(getShowSetting)) {
          return false;
        }
        const settingButtonPosition = unref(getSettingPosition);

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
          return unref(getShowHeader);
        }
        return settingButtonPosition === SettingButtonPositionEnum.HEADER;
      });

      function tgMobileTrigger() {
        toggleMobileTriggerState(!getMobileTriggrState.value);
      }
      const [register1, { openDialog: openDailog1 }] = useDialog();
      function modifyPassWord() {
        debugger;
      }
      function handCommand(name: string) {
        switch (name) {
          case 'modify':
            //alert('修改密码');
            openDailog1({
              title: '修改密码',
              width: 360,
              height: 430,
            });
            break;
          case 'loginout':
            loginOutForm.value.submit();
            break;
        }
      }

      return {
        prefixCls,
        getHeaderClass,
        headerTheme,
        showHeadLogo,
        getShowBread,
        getShowNotice,
        getShowFullScreen,
        getShowHeader,
        getShowSettingButton,
        getIsMobile,
        getMobileTriggrState,
        tgMobileTrigger,
        userInfo,
        handCommand,
        loginOutForm,
        register1,
        openDailog1,
        modifyPassWord,
        setPsdRef,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
