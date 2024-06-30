export type { ProDescription } from './props';

export interface ProDescriptionOption {
    key: string;
    label: string | VNode;
    text?: string | number;
    render?: (option: ProDescriptionOption) => VNode;
    onCancel?: (key: string, value: any) => any;
    onSave?: (key: string, value: any, form?: any, index?: number) => any;
    type?: ProFormItemType;
    inputAttrs?: ProFormInputProps;
    selectAttrs?: ProFormSelectProps;
    data?: { label: string, value: string | number }[];
    multiple?: boolean;
    keyName?: string;
    valueName?: string;
    rules?: FormRule[];
    [name: string]: any
}

export interface ProDescriptionRef {
    reload: () => void,
    setItem: (key: string, value: any) => void,
    getItem: (key: string) => any
}
