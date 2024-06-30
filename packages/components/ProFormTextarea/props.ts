import { FormItemProps, FormRule } from "tdesign-vue-next";
import { ExtractPropTypes, PropType } from "vue";

export const _props = {
    name: {
        type: String,
        default: '',
        require: true
    },
    modelValue: {
        type: String,
        default: '',
        require: true
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: '请输入内容'
    },
    formAttrs: {
        type: <PropType<FormItemProps>>Object,
        default: () => ({})
    },
    readonly: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    rules: {
        type: Array<FormRule>,
        default: <FormRule>[]
    },
    help: {
        type: String,
        default: ''
    }
}

export type ProFormTextarea = ExtractPropTypes<typeof _props>;