import PageContainer from './index.vue';
import { withInstall } from '@procomponent-tdesign-vue/utils/install';

export const _PageContainer = withInstall(PageContainer);

declare module "vue" {
    export interface GlobalComponents {
        PageContainer: typeof _PageContainer
    }
}