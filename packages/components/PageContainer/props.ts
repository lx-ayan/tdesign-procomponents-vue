import { ExtractPropTypes, PropType } from "vue";
import { ProTabsOption } from "../ProTabs/types";
import { TdTabsProps } from "tdesign-vue-next";
import { BreadOption } from "./types";

export const _props = {
    title: String,
    tabs: Array as PropType<ProTabsOption[]>,
    content: String,
    tabKey: String,
    tabsAttrs: {
        type: Object as PropType<TdTabsProps>,
        default: () => ({})
    },
    hideBread: Boolean,
    hideTitle: Boolean,
    breads: Array as PropType<BreadOption[]>,
    hideFooter: Boolean,
    tabDefaultValue: String
}

export type PageContainer = ExtractPropTypes<typeof _props>;