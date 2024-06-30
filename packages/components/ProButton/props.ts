import { definePropType } from '@procomponent-tdesign-vue/utils/props';
import { ThemeEnum, SizeEnum, ShapeEnum, TdPopupProps, TdButtonProps } from 'tdesign-vue-next';
import { PropType, ExtractPropTypes, VNode } from 'vue';

export const _props = {
    text: {
        type: String,
        default: '基本按钮'
    },
    theme: Object as PropType<ThemeEnum>,
    icon: String,
    variant: String as PropType<"outline" | "base" | "text" | "dashed">,
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: false
    },
    size: String as PropType<SizeEnum>,
    shape: String as PropType<ShapeEnum>,
    mode: {
        type: String as PropType<'dialog' | 'popup' | 'default'>,
        default: 'default'
    },
    content: {
        type: definePropType<string | (() => VNode | VNode)>([String, Object]),
        default: '高级按钮提示内容'
    },
    popupTheme: String as PropType<ThemeEnum>,
    popupProps: Object as PropType<TdPopupProps>,
    popupIcon: String,
    confirmBtn: {
        type: definePropType<string | TdButtonProps>([String, Object]),
        default: '确认'
    },
    cancelBtn: {
        type: definePropType<string | TdButtonProps>([String, Object]),
        default: '取消'
    },
    dialogHeader: {
        type: String,
        default: '系统提示'
    },
    closeOnEscKeydown: {
        type: Boolean,
        default: false
    },
    closeOnOverlayClick: {
        type: Boolean,
        default: false
    },
    zIndex: Number
}

export type ProButton = ExtractPropTypes<typeof _props>;