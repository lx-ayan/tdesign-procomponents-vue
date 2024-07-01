export declare type ProTabsOption = {
    key: string;
    label: string;
    children?: string;
    tabPanelAttrs?: TdTabPanelProps;
}

export declare type ProTableResult<T> = {
    list: T[];
    total: number;
    pageNum?: number;
    pageSize?: number;
}

export declare type ProTableRequest<T extends any = any> = {
    sort?: Record<string, TableOrder>;
    form: T;
    pageNum: number;
    pageSize: number;
}

export type TableOrder = 'desc' | 'asc';

export declare type ProTableEmits = {
    (e: 'update:page', value: any): void;
    (e: 'update:selectData', value: any): void;
    (e: 'select-change', value: any): void;
    (e: 'reset'): void
}

export declare type ProTableRef = {
    reset: () => void;
    reload: () => void;
    getTdTableRef: () => any;
}

export declare type ProTableOption<T extends any = any> = {
    key: string;
    title: string;
    attrs?: BaseTableColumnAttributes<any>;
    children?: Array<BaseTableCol<TableRowData>>;
    fixed?: 'left' | 'right';
    width?: string | number;
    tableAttrs?: BaseTableCol;
    hideInTable?: boolean;
    hideInSearch?: boolean;
    isSlot?: boolean;
    type?: 'select' | 'input' | 'checkbox' | 'radio' | 'date' | 'dateRange' | 'selectTree';
    sorter?: boolean;
    data?: Array<{ label: string, value: any }>;
    request?: () => Promise<any>; // 请求下拉框数据
    keyName?: string; // 下拉框数据的key
    valueName?: string; // 下拉框数据的value
    span?: number;
    cell?: string | ((h: any, props: BaseTableCellParams<T>) => TNodeReturnValue);
    searchOrder?: number;
    tableOrder?: number;
    placeholder?: string;
    multiple?: boolean;
    ellipsisTitle?: boolean;
    ellipsis?: boolean;
    isFormSlot?: boolean;
    searchSpan?: number;
    searchStyle?: CSSProperties;
    searchIcon?: string;
    resetIcon?: string;
    radioAttrs?: ProFormRadioProps;
    inputAttrs?: InputProps;
    selectAttrs?: ProFormSelectProps;
    checkBoxAttrs?: ProFormCheckProps;
    inputNumberAttrs?: TdInputNumberProps;
    switchAttrs?: SwitchProps;
    datePickerAttrs?: DatePickerProps;
    timePickerAttrs?: TimePickerProps;
    selectTreeAttrs?: TdTreeSelectProps;
    [name: string]: any;
}

export declare type ProFormItemType = 'input' | 'password' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'switch' | 'date' | 'time' | 'dateRange' | 'timeRange' | 'upload' | 'selectTree';

export declare type ProFormOption = {
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

export declare type ProFormRef = {
    setItem: (name: string, value: any) => void
    setItems: ([{ name: string, value: any }]) => void
    getFormValue<T = any>(): T
    reset: () => void,
    submit: () => Promise<any>
    initForm: () => void
}

export declare type ProDescriptionOption = {
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

export declare type ProDescriptionRef = {
    reload: () => void,
    setItem: (key: string, value: any) => void,
    getItem: (key: string) => any
}

export declare type BreadOption = {
    text: string;
    path?: string;
    href?: string;
    target?: string;
    disabled?: boolean;
    replace?: boolean;
}