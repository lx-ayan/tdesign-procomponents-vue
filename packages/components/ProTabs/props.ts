import { ExtractPropTypes, PropType } from "vue";
import { ProTabsOption } from "./types";
import { TdTabsProps } from "tdesign-vue-next";

export const _props = {
    tabs: Array as PropType<ProTabsOption[]>,
    request: Function as PropType<() => Promise<ProTabsOption[]>>,
    tabsAttrs: Object as PropType<TdTabsProps>,
    defaultValue: String
}

export type ProTabs = ExtractPropTypes<typeof _props>;