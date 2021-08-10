import $ from 'jquery';
import { defineAsyncComponent } from 'vue';
import { BasicDialog, useDialog } from '/@/components/Dialog';

const [register99, { openDialog: openModal }] = useDialog();

export const beforeOpenDialod = (options: any) => {
  openModal(options);
};

export const renderAsyncDialog = () => {
  //return defineAsyncComponent(() => <BasicDialog @register={ register99 }></BasicDialog>);
};
