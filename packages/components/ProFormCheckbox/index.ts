import ProFormCheckbox from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _ProFormCheckbox = withInstall(ProFormCheckbox);

declare module "vue" {
    export interface GlobalComponents {
        ProFormCheckbox: typeof _ProFormCheckbox
    }
}