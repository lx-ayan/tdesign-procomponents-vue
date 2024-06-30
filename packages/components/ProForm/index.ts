import ProForm from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _ProForm = withInstall(ProForm);

declare module "vue" {
    export interface GlobalComponents {
        ProForm: typeof _ProForm
    }
}