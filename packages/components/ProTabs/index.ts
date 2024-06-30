import ProTabs from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';
import './style.css';

export const _ProTabs = withInstall(ProTabs);

declare module "vue" {
    export interface GlobalComponents {
        ProTabs: typeof _ProTabs
    }
}