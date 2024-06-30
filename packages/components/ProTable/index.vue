<script setup lang='ts' generic="T = any ">
import './style.css';
import { onMounted, ref, watch, useSlots, computed } from 'vue';
import { TableOrder } from './types';
import { _props } from './props';

defineOptions({ name: 'ProTable' })

const props = defineProps(_props);

const emits = defineEmits(['reset', 'reload', 'update:selectData', 'select-change']);

const tableForm = ref<any>();

const formList = ref<any>();

const columns = ref<any>([]);

const innerData = ref<any>([]);

const slotsArr = ref<string[]>();

const showMore = ref(false);

const tdTableRef = ref<any>();

const tableLoading = ref(false);

const innerPage = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0
});

const formRef = ref();

const sortObj = ref<Record<string, TableOrder>>({});

let obj: any = {};

props.options.forEach(item => {
    obj[item.key] = ''
});

tableForm.value = obj;

onMounted(() => {
    init();
    if (props.page) {
        innerPage.value = props.page;
    }
    request(1, innerPage.value.pageSize);
})

function init() {
    columns.value = props.options.filter((item, index) => {
        item.tableOrder = item.tableOrder || index;
        return !item.hideInTable;
    }).sort((a, b) => a.tableOrder! - b.tableOrder!).map(item => ({
        ...item,
        colKey: item.key,
    }));

    if (props.selectRow) {
        columns.value.unshift({
            colKey: 'row-select', type: 'multiple'
        })
    }

    formList.value = props.options.filter((item, index: number) => {
        item.searchOrder = item.searchOrder || index;
        return !item.hideInSearch;
    }).sort((a, b) => a.searchOrder! - b.searchOrder!);

    slotsArr.value = props.options.filter(item => item.isSlot).map(item => item.key)
}

watch(() => props.options, () => {
    init();
}, { deep: true });

const slots = useSlots();

function request(pageNum: number, pageSize: number) {
    if (props.loading) {
        tableLoading.value = true
    }
    props.request!({
        pageNum: innerPage.value.pageNum,
        pageSize,
        form: tableForm.value,
        sort: sortObj.value
    } as any).then(res => {
        tableLoading.value = false
        innerData.value = res.list;
        innerPage.value = {
            total: res.total,
            pageNum,
            pageSize
        }
    }).catch(() => {
        tableLoading.value = false
    })
}

function handleSelected(e: any) {
    if (!props.rowKey) {
        throw new Error('rowKey is undefined')
    }
    emits('update:selectData', e);
    emits('select-change', e);
}

function reset() {
    request(innerPage.value.pageNum, innerPage.value.pageSize);
}

function reload() {
    formRef.value.reset();
    innerPage.value.pageNum = 1;
    request(1, innerPage.value.pageSize);
}

function getTdTableRef() {
    return tdTableRef;
}

function getSearchParam() {
    return tableForm.value;
}

defineExpose({
    'reset': reset,
    'reload': reload,
    'getTdTableRef': getTdTableRef,
    'getSearchParam': getSearchParam
})

function onSearch() {
    if (props.loading) {
        tableLoading.value = true;
    }
    innerPage.value.pageNum = 1;
    props.request!({
        ...innerPage.value,
        form: tableForm.value,
        sort: sortObj.value
    }).then(res => {
        innerData.value = res.list;
        innerPage.value.total = res.total;
        tableLoading.value = false;
    }).catch(() => {
        tableLoading.value = false;
    });
}

function onReset() {
    formRef.value.reset();
    emits('reset');
    if (props.loading) {
        tableLoading.value = true
    }
    props.request!({
        ...innerPage.value,
        form: tableForm.value,
        sort: sortObj.value
    }).then(res => {
        innerData.value = res.list;
        innerPage.value.total = res.total;
        tableLoading.value = false;
    }).catch(() => {
        tableLoading.value = false;
    })
}

function sortChange(value: any, { col }: { col: { key: string } }) {
    const { key } = col;
    let obj = { ...sortObj.value };
    if (value === void 0 && obj[key]) {
        delete obj[key];
    } else {
        if (value !== void 0) {
            obj[key] = value.descending ? 'desc' : 'asc';
        }
    }
    sortObj.value = obj;
    request(innerPage.value.pageNum, innerPage.value.pageSize);
}

function pageChange(e: any) {
    innerPage.value.pageNum = e.current || 1;
    innerPage.value.pageSize = e.pageSize;
    request(innerPage.value.pageNum, innerPage.value.pageSize);
}

const selectRowKeys = computed(() => props.selectData)
</script>

<template>
    <div class="pro-table h-full">

        <div class="pro-table-form" v-if="!props.hideForm && formList && formList.length != 0"
           >
            <t-card size="small" :bordered="props.formBordered">
                <template v-if="slots['form-header']" #title>
                    <slot v-if="slots['form-header']" name="form-header"></slot>
                </template>
                <t-form ref="formRef" v-bind="props.formAttrs" labelWidth="auto" labelAlign="left" :data="tableForm">
                    <t-row :gutter="[16, 18]">
                        <template v-for="(item, index) in formList" :key="index">
                            <template v-if="index <= props.showSearchNum - 1">
                                <template v-if="item.isFormSlot && !item.hideInSearch">
                                    <slot :name="`form-${item.key}`"></slot>
                                </template>
                                <template v-else>
                                    <t-col h-full :span="item.span || 3" v-if="!item.type || item.type === 'input'">
                                        <ProFormInput v-bind="item.inputAttrs"
                                            :placeholder="item.placeholder || `请输入${item.title}`" type="text"
                                            :name="item.key" v-model="tableForm[item.key]" :label="item.title" />
                                    </t-col>
                                    <t-col :span="item.span || 3" v-if="item.type === 'select'">
                                        <ProFormSelect v-bind="item.selectAttrs" :multiple="item.multiple"
                                            :keyName="item.keyName || 'label'" :valueName="item.valueName || 'value'"
                                            :api="item.request" :placeholder="item.placeholder || `请选择${item.title}`"
                                            :list="item.data || []" :name="item.key" v-model="tableForm[item.key]"
                                            :label="item.title" />
                                    </t-col>
                                    <t-col :span="item.span || 3" v-if="['date', 'dateRange'].includes(item.type)">
                                        <ProFormDatepicker v-bind="item.datePickerAttrs"
                                            :range="item.type == 'dateRange'" :list="item.data || []" :name="item.key"
                                            v-model="tableForm[item.key]" :label="item.title" />
                                    </t-col>
                                    <t-col :span="item.span || 24" v-if="item.type === 'checkbox'">
                                        <ProFormCheckbox v-bind="item.checkBoxAttrs" :api="item.request"
                                            :list="item.data || []" :name="item.key" v-model="tableForm[item.key]"
                                            :label="item.title" />
                                    </t-col>

                                    <t-col :span="item.span || 24" v-if="item.type === 'radio'">
                                        <ProFormRadio v-bind="item.radioAttrs" :api="item.request"
                                            :list="item.data || []" :name="item.key" v-model="tableForm[item.key]"
                                            :label="item.title" />
                                    </t-col>
                                    <t-col :span="item.span || 3" v-if="item.type == 'selectTree'">
                                        <ProFormSelectTree v-bind="item.selectTreeAttrs"
                                            :keyName="item.keyName || 'label'" :valueName="item.valueName || 'value'"
                                            :list="item.data" :placeholder="item.placeholder || `请选择${item.title}`"
                                            :api="item.request" v-model.trim="tableForm[item.key]" :name="item.key"
                                            :label="item.title" :multiple="item.multiple"></ProFormSelectTree>
                                    </t-col>
                                </template>
                            </template>
                            <template v-else-if="showMore" enter-active-class="animate__animated animate__fadeInRight">
                                <template v-if="item.isFormSlot && !item.hideInSearch">
                                    <slot :name="`form-${item.key}`"></slot>
                                </template>
                                <template v-else>
                                    <t-col :span="item.span || 3" v-if="!item.type || item.type === 'input'">
                                        <ProFormInput v-bind="item.inputAttrs"
                                            :placeholder="item.placeholder || `请输入${item.title}`" :name="item.key"
                                            v-model="tableForm[item.key]" :label="item.title" />
                                    </t-col>
                                    <t-col :span="item.span || 3" v-if="item.type === 'select'">
                                        <ProFormSelect v-bind="item.selectAttrs" :multiple="item.multiple"
                                            :keyName="item.keyName || 'label'" :valueName="item.valueName || 'value'"
                                            :api="item.request" :placeholder="item.placeholder || `请选择${item.title}`"
                                            :list="item.data || []" :name="item.key" v-model="tableForm[item.key]"
                                            :label="item.title" />
                                    </t-col>

                                    <t-col :span="item.span || 3" v-if="['date', 'dateRange'].includes(item.type)">
                                        <ProFormDatepicker v-bind="item.datePickerAttrs"
                                            :range="item.type == 'dateRange'" :list="item.data || []" :name="item.key"
                                            v-model="tableForm[item.key]" :label="item.title" />
                                    </t-col>

                                    <t-col :span="item.span || 24" v-if="item.type === 'checkbox'">
                                        <ProFormCheckbox v-bind="item.checkBoxAttrs" :api="item.request"
                                            :list="item.data || []" :name="item.key" v-model="tableForm[item.key]"
                                            :label="item.title" />
                                    </t-col>

                                    <t-col :span="item.span || 24" v-if="item.type === 'radio'">
                                        <ProFormRadio v-bind="item.radioAttrs" :api="item.request"
                                            :list="item.data || []" :name="item.key" v-model="tableForm[item.key]"
                                            :label="item.title" />
                                    </t-col>

                                    <t-col :span="item.span || 3" v-if="item.type == 'selectTree'">
                                        <ProFormSelectTree v-bind="item.selectTreeAttrs"
                                            :keyName="item.keyName || 'label'" :valueName="item.valueName || 'value'"
                                            :list="item.data" :placeholder="item.placeholder || `请选择${item.title}`"
                                            :api="item.request" v-model.trim="tableForm[item.key]" :name="item.key"
                                            :label="item.title" :multiple="item.multiple"></ProFormSelectTree>
                                    </t-col>
                                </template>
                            </template>
                        </template>

                        <t-col :span="props.searchSpan">
                            <div :style="props.searchStyle" class=" flex text-right">
                                <t-button style="margin-right: 16px;" @click="onSearch">
                                    <template v-if="props.searchIcon">
                                        <t-icon :name="props.searchIcon"></t-icon>
                                    </template>
                                    {{ props.searchText || '搜索' }}
                                </t-button>
                                <t-button theme="default" variant="base" type="reset" @click="onReset">
                                    <template v-if="props.resetIcon">
                                        <t-icon :name="props.resetIcon"></t-icon>
                                    </template>
                                    {{
                                        props.cancelText ||
                                        '重置'
                                    }}

                                </t-button>
                                <t-button theme="primary" class=" ml-[16px]" variant="text"
                                    v-if="formList && formList.length > props.showSearchNum"
                                    @click="showMore = !showMore">
                                    <div class="flex items-center">

                                        <template v-if="!props.moreSearchText">
                                            {{ showMore ? '收起' : '展开' }}
                                        </template>
                                        <template v-else>
                                            {{ props.moreSearchText }}
                                        </template>
                                        <t-icon class=" ml-2" :name="showMore ? 'chevron-up' : 'chevron-down'"></t-icon>
                                    </div>
                                </t-button>
                            </div>
                        </t-col>
                    </t-row>
                </t-form>
            </t-card>
        </div>

        <div v-if="slots.setting" style="margin-bottom: 12px;">
            <slot name="setting"></slot>
        </div>
        <t-card size="small" :bordered="props.tableOutBordered">
            <template v-if="!$slots.setting" #title>
                <span v-if="props.tableTitle">{{props.tableTitle}}</span>
                <slot v-else name="tableTitle"></slot>
            </template>
            <template v-if="$slots.tableActions && !$slots.setting" #actions>
                <slot name="tableActions"></slot>
            </template>
            <div class="pro-table-table">
                <template v-if="!slots.card">
                    <t-table @sort-change="sortChange" :loading="tableLoading" ref="tdTableRef"
                        :bordered="props.bordered" :empty="props.empty" :cellEmptyContent="props.cellEmptyContent"
                        v-bind="props.tableAttrs" @select-change="handleSelected" :row-key="props.rowKey"
                        :data="innerData" :columns="columns" :size="props.size" :selected-row-keys="selectRowKeys"
                        :stripe="props.stripe" :hover="props.hover">
                        <template v-for="(slotName) in slotsArr" #[slotName]="{ row, rowIndex }">
                            <slot :key="row[rowKey]" :row="row" :index="rowIndex" :name="`table-${slotName}`"></slot>
                        </template>

                        <template v-if="slots.expandedRow" #expandedRow="{ row }">
                            <slot name="expandedRow" :row="row">

                            </slot>
                        </template>
                    </t-table>
                </template>
                <template v-else>
                    <t-loading :size="props.loadingProps.size" :loading="tableLoading" v-bind="props.loadingProps"
                        :show-overlay="props.loadingProps.showOverlay">
                        <slot name="card" :list="innerData"></slot>
                    </t-loading>
                </template>
            </div>

            <div v-if="!props.hidePage" style="margin-top: 26px; padding: 30px 23px; box-sizing: border-box;">
                <t-pagination v-bind="props.pageAttrs" :total="innerPage.total" v-model:current="innerPage.pageNum"
                    @change="pageChange" v-model:page-size="innerPage.pageSize" show-first-and-last-page-btn />
            </div>
        </t-card>

    </div>
</template>
