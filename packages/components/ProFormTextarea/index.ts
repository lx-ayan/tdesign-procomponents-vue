import ProFormTextarea from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _ProFormTextarea = withInstall(ProFormTextarea);

declare module "vue" {
    export interface GlobalComponents {
        ProFormTextarea: typeof _ProFormTextarea
    }
}