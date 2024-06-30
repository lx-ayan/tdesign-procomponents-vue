export type { ProTable } from './props';

export interface ProTableResult<T> {
    list: T[];
    total: number;
    pageNum?: number;
    pageSize?: number;
}

export interface ProTableRequest<T extends any = any> {
    sort?: Record<string, TableOrder>;
    form: T;
    pageNum: number;
    pageSize: number;
}

export type TableOrder = 'desc' | 'asc';

export interface ProTableEmits {
    (e: 'update:page', value: any): void;
    (e: 'update:selectData', value: any): void;
    (e: 'select-change', value: any): void;
    (e: 'reset'): void
}

export interface ProTableRef {
    reset: () => void;
    reload: () => void;
    getTdTableRef: () => any;
}

export interface ProTableOption<T extends any = any> {
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