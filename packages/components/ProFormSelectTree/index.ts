import ProFormSelectTree from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _ProFormSelectTree = withInstall(ProFormSelectTree);

declare module "vue" {
    export interface GlobalComponents {
        ProFormSelectTree: typeof _ProFormSelectTree
    }
}