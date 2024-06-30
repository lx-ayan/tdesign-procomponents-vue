import { ExtractPropTypes, PropType } from "vue";
import { ProFormOption } from "../ProForm/types";

export const _props = {
    visible: {
        type: Boolean,
        default: false
    },
    request: {
        type: Function,
        required: true
    },
    options: {
        type: Array as PropType<ProFormOption[]>
    },
    header: {
        type: String,
        default: '标题'
    }
}

export type ProModal = ExtractPropTypes<typeof _props>;