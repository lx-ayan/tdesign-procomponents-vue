import { definePropType } from "@procomponent-tdesign-vue/utils/props";
import { FormRule, TdFormItemProps, TdInputProps } from "tdesign-vue-next";
import { ExtractPropTypes } from "vue";

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
    inputAttrs: {
        type: definePropType<TdInputProps>(Object),
        default: () => ({})
    },
    formAttrs: {
        type: definePropType<TdFormItemProps>(Object),
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
    type: {
        type: String,
        default: 'text'
    },
    help: {
        type: String,
        default: ''
    },
    span: {
        type: Number,
        default: 4
    }
};

export type ProFormInput = ExtractPropTypes<typeof _props>;