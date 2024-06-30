import ProFormRadio from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _ProFormRadio = withInstall(ProFormRadio);

declare module "vue" {
    export interface GlobalComponents {
        ProFormRadio: typeof _ProFormRadio
    }
}