import ProModal from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _ProModal = withInstall(ProModal);

declare module "vue" {
    export interface GlobalComponents {
        ProModal: typeof _ProModal
    }
}