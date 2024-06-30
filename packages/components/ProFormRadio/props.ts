import { FormItemProps, FormRule } from "tdesign-vue-next";
import { ExtractPropTypes, PropType } from "vue";

export const _props = {
    name: {
        type: String,
        default: '',
        require: true
    },
    list: {
        type: Array<any>,
        default: []
    },
    modelValue: {
        type: Object as PropType<any>,
        default: '',
        require: true
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
    button: {
        type: Boolean,
        default: false
    },
    allowUncheck: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    help: {
        type: String,
        default: ''
    },
    api: {
        type: Function as PropType<() => Promise<any[]>>,
    }
}

export type ProFormRadio = ExtractPropTypes<typeof _props>;