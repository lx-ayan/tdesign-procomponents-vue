import ProButton from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _ProButton = withInstall(ProButton);

declare module "vue" {
    export interface GlobalComponents {
        ProButton: typeof _ProButton
    }
}