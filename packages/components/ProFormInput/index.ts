import ProFormInput from './index.vue';
import { withInstall } from '@tdesign-vue-procomponents/utils/install';

export const _ProFormInput = withInstall(ProFormInput);

declare module "vue" {
    export interface GlobalComponents {
        ProFormInput: typeof _ProFormInput
    }
}