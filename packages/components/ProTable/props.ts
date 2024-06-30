import { CSSProperties, ExtractPropTypes, PropType, VNode } from "vue";
import { ProTableOption, ProTableRequest, ProTableResult } from "./types";
import { definePropType } from "@procomponent-tdesign-vue/utils/props";
import { FormProps, SizeEnum, TableProps, TdLoadingProps, TdPaginationProps } from "tdesign-vue-next";

export const _props = {
    tableTitle: String,
    request: {
        type: Function as PropType<(obj: ProTableRequest<any>) => Promise<ProTableResult<any>>>,
        required: true,
    },
    options: {
        type: Array as PropType<ProTableOption[]>,
        required: true,
        default: () => []
    },
    page: {
        type: Object as PropType<{ pageNum: number, pageSize: number, total: number }>,
        default: () => ({
            pageNum: 1,
            pageSize: 10,
            total: 0
        })
    },
    selectData: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    empty: {
        type: definePropType<string | VNode>([String, Object]),
        default: '暂无数据'
    },
    fixedRows: Array as PropType<number[]>,
    hover: {
        type: Boolean,
        default: true
    },
    size: {
        type: String as PropType<SizeEnum>,
        default: 'medium'
    },
    stripe: Boolean,
    cellEmptyContent: {
        type: String,
        default: '-'
    },
    rowKey: {
        type: String,
        default: 'id'
    },
    bordered: {
        type: Boolean,
        default: false,
    },
    loadingProps: {
        type: Object as PropType<TdLoadingProps>,
        default: () => ({})
    },
    selectRow: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: true
    },
    formAttrs: {
        type: Object as PropType<FormProps>,
        default: () => ({})
    },
    tableAttrs: {
        type: Object as PropType<TableProps>,
        default: () => ({ rowKey: 'id' })
    },
    pageAttrs: {
        type: Object as PropType<TdPaginationProps>,
        default: () => ({})
    },
    searchText: {
        type: String,
        default: '搜索'
    },
    cancelText: {
        type: String,
        default: '重置'
    },
    hideForm: {
        type: Boolean,
        default: false
    },
    hidePage: {
        type: Boolean,
        default: false
    },
    totalContent: {
        type: Boolean,
        default: false
    },
    showSearchNum: {
        type: Number,
        default: 3
    },
    moreSearchText: String,
    searchSpan: {
        type: Number,
        default: 2
    },
    searchStyle: {
        type: definePropType<string | CSSProperties>([String, Object]),
        default: () => ({})
    },
    searchIcon: String,
    resetIcon: String,
    formBordered: Boolean,
    tableOutBordered: Boolean
}

export type ProTable = ExtractPropTypes<typeof _props>