import ProButton from './index.vue';
import { withInstall } from '@tdesign-vue-procomponents/utils/install';

export const _ProButton = withInstall(ProButton);

declare module "vue" {
    export interface GlobalComponents {
        ProButton: typeof _ProButton
    }
}