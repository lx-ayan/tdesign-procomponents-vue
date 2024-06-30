import { FormRule, FormItemProps, InputProps, SelectProps, RadioProps, CheckboxProps, InputNumberProps, TdInputNumberProps, SwitchProps, DatePickerProps, TimePickerProps, TdUploadProps, TextareaProps, TNodeReturnValue, TNode, TdTreeSelectProps } from "tdesign-vue-next";
import { CSSProperties, VNode } from "vue";
export type { ProForm } from './props';
type ProFormItemType = 'input' | 'password' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'switch' | 'date' | 'time' | 'dateRange' | 'timeRange' | 'upload' | 'selectTree';

export interface ProFormOption {
    name: string;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    readonly?: boolean;
    rules?: FormRule[];
    formAttrs?: FormItemProps;
    type?: ProFormItemType;
    inputAttrs?: InputProps;
    selectAttrs?: ProFormSelectProps;
    radioAttrs?: ProFormRadioProps;
    checkBoxAttrs?: ProFormCheckProps;
    inputNumberAttrs?: TdInputNumberProps;
    switchAttrs?: SwitchProps;
    datePickerAttrs?: DatePickerProps;
    timePickerAttrs?: TimePickerProps;
    selectTreeAttrs?: TdTreeSelectProps;
    needNumber?: boolean;
    textAttrs?: TextareaProps;
    style?: string | CSSProperties
    optionData?: any[] | (() => Promise<any[]>);
    keyName?: string;
    valueName?: string;
    hideInForm?: boolean;
    col?: number;
    offset?: number;
    radioButton?: boolean;
    allowUncheck?: boolean;
    variant?: string;
    multiple?: boolean;
    format?: string;
    enableTimePicker?: boolean;
    uploadAttrs?: TdUploadProps;
    value?: any;
    isSlot?: boolean;
}

export interface ProFormRef {
    setItem: (name: string, value: any) => void
    setItems: ([{ name: string, value: any }]) => void
    getFormValue<T = any>(): T
    reset: () => void,
    submit: () => Promise<any>
    initForm: () => void
}