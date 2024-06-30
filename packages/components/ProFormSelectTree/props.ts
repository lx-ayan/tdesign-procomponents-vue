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
        type: [String, Number, Array<any>],
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
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: ''
    },
    readonly: {
        type: Boolean,
        default: false
    },
    multiple: {
        type: Boolean,
        default: false
    },
    help: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: ''
    },
    api: {
        type: Function as PropType<() => Promise<any[]>>,
    }

}

export type ProFormSelectTree = ExtractPropTypes<typeof _props>;