import { definePropType } from "@procomponent-tdesign-vue/utils/props";
import { ProDescriptionOption } from "./types";
import { CSSProperties, ExtractPropTypes, PropType, VNode } from "vue";
import { SizeEnum, TdLoadingProps } from "tdesign-vue-next";

export const _props = {
    options: {
        type: definePropType<ProDescriptionOption[]>(Array),
        default: () => []
    },
    request: {
        type: definePropType<() => Promise<any>>(Function)
    },
    title: {
        type: definePropType<string | VNode>([String, Object]),
        default: 'Title'
    },
    contentStyle: {
        type: definePropType<string | CSSProperties>([String, Object])
    },
    labelStyle: {
        type: definePropType<string | CSSProperties>([String, Object])
    },
    size: String as PropType<SizeEnum>,
    layout: String as PropType<'horizontal' | 'vertical'>,
    editable: {
        type: Boolean,
        default: false
    },
    empty: String,
    loading: {
        type: Boolean,
        default: false
    },
    loadingProps: Object as PropType<TdLoadingProps>
}

export type ProDescription = ExtractPropTypes<typeof _props>;