import { FormItemProps, FormRule } from "tdesign-vue-next";
import { ExtractPropTypes, PropType } from "vue";

export const _props = {
    name: {
        type: String,
        default: ''
    },
    list: {
        type: Array<any>,
        default: []
    },
    modelValue: {
        type: [String, Object],
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    rules: {
        type: Array<FormRule>,
        default: <FormRule>[]
    },
    keyName: {
        type: String,
        default: ''
    },
    valueName: {
        type: String,
        default: ''
    },
    formAttrs: {
        type: <PropType<FormItemProps>>Object,
        default: () => ({})
    },
    disabled: {
        type: Boolean,
        default: false
    },
    help: {
        type: String,
        default: ''
    },
    readonly: {
        type: Boolean,
        default: false
    },
    api: {
        type: Function as PropType<() => Promise<any[]>>,
    }
}

export type ProFormCheckbox = ExtractPropTypes<typeof _props>;
