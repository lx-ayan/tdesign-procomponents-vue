import { FormItemProps, FormRule } from "tdesign-vue-next";
import { ExtractPropTypes, PropType } from "vue";

export const _props = {
    modelValue: {
        type: [String, Array],
        default: '',
        require: true
    },
    placeholder: {
        type: String,
        default: '请输入内容'
    },
    name: {
        type: String,
        default: '',
        require: true
    },
    label: {
        type: String,
        default: ''
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
        default: () => []
    },
    range: {
        type: Boolean,
        default: false
    },
    format: {
        type: String,
        default: 'YYYY-MM-DD'
    },
    help: {
        type: String,
        default: ''
    },
    enableTimePicker: {
        type: Boolean,
        default: false
    }
}

export type ProFormDatePicker = ExtractPropTypes<typeof _props>;
