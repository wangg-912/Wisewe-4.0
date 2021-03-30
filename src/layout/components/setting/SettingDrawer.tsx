import { defineComponent, computed, unref } from 'vue';
import { BasicDrawer } from '/@/components/Drawer/index';
export default defineComponent({
  name: 'SettingDrawer',
  setup(_,{ attrs }){
    return () => (
    <BasicDrawer
        {...attrs}
        title="设置"
        width={340}></BasicDrawer>
    )
  }
})
