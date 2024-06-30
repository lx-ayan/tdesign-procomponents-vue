import ProDescription from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _ProDescription = withInstall(ProDescription);

declare module "vue" {
    export interface GlobalComponents {
        ProDescription: typeof _ProDescription
    }
}