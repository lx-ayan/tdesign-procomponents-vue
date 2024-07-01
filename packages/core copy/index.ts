import { createInstaller } from '@procomponent-tdesign-vue/utils/install';
import components from './components';
const installer = createInstaller(components);

export * from '../components';
export default installer;