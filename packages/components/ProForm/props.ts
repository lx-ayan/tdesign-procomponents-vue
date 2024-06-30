import { ExtractPropTypes, PropType } from "vue";
import { ProFormOption } from "./types";

export const _props = {
    options: {
        type: Object as PropType<ProFormOption[]>,
        default: () => [],
        require: true
    },
    form: {
        type: Object as PropType<Record<string, any>>,
        default: null,
    },
    labelAlign: {
        type: String,
        default: 'top',
    },
    labelWidth: {
        type: String,
        default: 'auto',
    },
    layout: {
        type: String,
        default: 'vertical',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    request: {
        type: Function as PropType<(data?: any) => Promise<any>>,
        default: null,
    },
    footer: {
        type: Boolean,
        default: true,
    },
    submitText: {
        type: String,
        default: '提交',
    },
    resetText: {
        type: String,
        default: '重置',
    },
    footerAligin: {
        type: String,
        default: 'right',
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    showReset: {
        type: Boolean,
        default: true,
    },
    mountedRequest: {
        type: Function
    }
}

export type ProForm = ExtractPropTypes<typeof _props>;