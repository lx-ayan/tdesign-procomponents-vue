export type {ProTabs} from './props';

export interface ProTabsOption {
    key: string;
    label: string;
    children?: string;
    tabPanelAttrs?: TdTabPanelProps;
}