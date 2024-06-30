import ProFormDatepicker from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _ProFormDatepicker = withInstall(ProFormDatepicker);

declare module "vue" {
    export interface GlobalComponents {
        ProFormDatepicker: typeof _ProFormDatepicker
    }
}