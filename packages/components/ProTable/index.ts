import ProTable from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _ProTable = withInstall(ProTable);

declare module "vue" {
    export interface GlobalComponents {
        ProTable: typeof _ProTable
    }
}