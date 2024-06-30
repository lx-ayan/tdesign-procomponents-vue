import ProFormSelect from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _ProFormSelect = withInstall(ProFormSelect);

declare module "vue" {
    export interface GlobalComponents {
        ProFormSelect: typeof _ProFormSelect
    }
}