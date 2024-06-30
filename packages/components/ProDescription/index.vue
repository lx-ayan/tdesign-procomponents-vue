<script setup lang='ts'>
import { onMounted, ref, useSlots } from 'vue';
import { ProDescriptionOption } from './types';
import { _props } from './props';
import './style.css';

defineOptions({name: 'ProDescription'})

const props = defineProps(_props);

const slots = useSlots();

const innerForm = ref<any>();

const defaultForm = ref<any>();

const editList = ref<string[]>([]);

const formRef = ref();

const innerLoading = ref(false);

onMounted(() => {
    init();
})

function init() {
    initForm();
}

function initForm() {
    let obj: any = {};
    if (props.request) {
        if (props.loading) {
            innerLoading.value = true;
        }
        props.request().then(result => {
            const keyList = Object.keys(result);
            if (keyList.length) {
                keyList.forEach(key => {
                    const option = props.options.find(item => item.key === key);
                    if (option) {
                        obj[key] = result[key];
                    }
                })
                innerForm.value = { ...obj };
                defaultForm.value = { ...obj };
                innerLoading.value = false;
            }
        }).catch(() => {
            innerLoading.value = false;
        })
    } else {
        props.options.forEach(item => {
            obj[item.key] = ['string', 'number'].includes(typeof item.text) ? item.text : void 0;
        });
        innerForm.value = obj;
    }
}

function handleClickEdit(key: string) {
    editList.value = [key];
}

function handleSave(option: ProDescriptionOption, index: number) {
    formRef.value.validate().then((res: any) => {
        if (res === true) {
            if (option.onSave) {
                option.onSave(option.key, innerForm.value[option.key], innerForm.value, index);
            }
            editList.value = editList.value.filter(item => item !== option.key);
        }
    })
}

function reload() {
    initForm();
}

function setItem(key: string, value: any) {
    const keyList = Object.keys(innerForm.value);
    if (!keyList.includes(key)) {
        throw new Error('not find this key');
    }
    innerForm.value[key] = value;
}

function getItem(key: string) {
    if (innerForm.value) {
        return innerForm.value[key];
    } else {
        return void 0;
    }
}

function handleRemoveKey(option: ProDescriptionOption) {
    if (option.onCancel) {
        option.onCancel(option.key, innerForm.value[option.key]);
    }
    innerForm.value[option.key] = defaultForm.value[option.key];
    editList.value = editList.value.filter(item => item !== option.key);
}

function renderText(option: ProDescriptionOption) {
    if ((option.type === 'select' && option.multiple) || option.type === 'checkbox') {
        return option.data?.filter(item => item.value === innerForm.value[option.key]).map(item => item.label).join(',')
    }
    if (!option.type || option.type === 'input' || option.type === 'textarea' || option.type === 'date') {
        return innerForm.value[option.key]
    } else {
        return option.data!.find(item => item.value == innerForm.value[option.key])!.label
    }
}

defineExpose({
    reload,
    setItem,
    getItem
})

</script>

<template>
    <div class="pro-description">
        <t-loading v-bind="props.loadingProps" v-if="props.loading" size="small" :loading="innerLoading" show-overlay>
            <t-form ref="formRef" labelWidth="0" :data="innerForm">
                <t-descriptions v-bind="$attrs" :title="props.title">
                    <template v-for="(option, index) in props.options" :key="option.key">
                        <t-descriptions-item v-if="option.render" v-bind="option" :label="option.label"
                            :content="option.render(option)" />
                        <t-descriptions-item v-else v-bind="option" :label="option.label">
                            <slot v-if="slots[`${option.key}-content`]" :name='`${option.key}-content`'
                                :data="innerForm" :index="index"></slot>
                            <template v-else>
                                <div class="pro-description-content" v-if="innerForm">
                                    <template v-if="!editList.includes(option.key)">
                                        <span> {{ renderText(option) || props.empty }} </span>
                                    </template>
                                    <template v-else>
                                        <ProFormInput :rules="option.rules"
                                            v-if="!option.type || option.type === 'input'" v-bind="option.inputAttrs"
                                            :placeholder="`请输入${option.label}`" type="text" :name="option.key"
                                            v-model="innerForm[option.key]" label=" " />
                                        <ProFormSelect v-if="option.type === 'select'" v-bind="option.selectAttrs"
                                            :multiple="false" :keyName="option.keyName || 'label'"
                                            :valueName="option.valueName || 'value'" :placeholder="`请选择${option.label}`"
                                            :list="option.data || []" :name="option.key" v-model="innerForm[option.key]"
                                            label=" " />
                                        <ProFormRadio v-if="option.type === 'radio'" v-bind="option.radioAttrs"
                                            :list="option.data || []" :name="option.key" v-model="innerForm[option.key]"
                                            label=" " />
                                        <ProFormCheckbox v-if="option.type === 'checkbox'" v-bind="option.checkBoxAttrs"
                                            :list="option.data || []" :name="option.key" v-model="innerForm[option.key]"
                                            label=" " />
                                        <ProFormDatepicker v-if="option.type === 'date'" v-bind="option.datePickerAttrs"
                                            :name="option.key" v-model="innerForm[option.key]" label=" " />
                                    </template>
                                    <t-link @click="handleClickEdit(option.key)"
                                        v-if="props.editable && !editList.includes(option.key)"
                                        class="pro-description-edit" hover="color">
                                        <t-icon name="edit"></t-icon>
                                    </t-link>
                                    <t-link @click="handleSave(option, index)"
                                        v-if="props.editable && editList.includes(option.key)"
                                        class="pro-description-edit" hover="color" theme="success">
                                        <t-icon size="18" name="check"></t-icon>
                                    </t-link>
                                    <t-link @click="handleRemoveKey(option)"
                                        v-if="props.editable && editList.includes(option.key)"
                                        class="pro-description-edit" hover="color" theme="danger">
                                        <t-icon size="18" name="close"></t-icon>
                                    </t-link>
                                </div>
                            </template>
                        </t-descriptions-item>
                    </template>
                </t-descriptions>
            </t-form>
        </t-loading>

        <t-form v-else ref="formRef" labelWidth="0" :data="innerForm">
            <t-descriptions v-bind="$attrs" :title="props.title">
                <template v-for="(option, index) in props.options" :key="option.key">
                    <t-descriptions-item v-if="option.render" v-bind="option" :label="option.label"
                        :content="option.render(option)" />
                    <t-descriptions-item v-else v-bind="option" :label="option.label">
                        <slot v-if="slots[`${option.key}-content`]" :name='`${option.key}-content`' :data="innerForm"
                            :index="index"></slot>
                        <template v-else>
                            <div class="pro-description-content" v-if="innerForm">
                                <template v-if="!editList.includes(option.key)">
                                    <span> {{ renderText(option) || props.empty }} </span>
                                </template>
                                <template v-else>
                                    <ProFormInput :rules="option.rules" v-if="!option.type || option.type === 'input'"
                                        v-bind="option.inputAttrs" :placeholder="`请输入${option.label}`" type="text"
                                        :name="option.key" v-model="innerForm[option.key]" label=" " />
                                    <ProFormSelect v-if="option.type === 'select'" v-bind="option.selectAttrs"
                                        :multiple="false" :keyName="option.keyName || 'label'"
                                        :valueName="option.valueName || 'value'" :placeholder="`请选择${option.label}`"
                                        :list="option.data || []" :name="option.key" v-model="innerForm[option.key]"
                                        label=" " />
                                    <ProFormRadio v-if="option.type === 'radio'" v-bind="option.radioAttrs"
                                        :list="option.data || []" :name="option.key" v-model="innerForm[option.key]"
                                        label=" " />
                                    <ProFormCheckbox v-if="option.type === 'checkbox'" v-bind="option.checkBoxAttrs"
                                        :list="option.data || []" :name="option.key" v-model="innerForm[option.key]"
                                        label=" " />
                                    <ProFormDatepicker v-if="option.type === 'date'" v-bind="option.datePickerAttrs"
                                        :name="option.key" v-model="innerForm[option.key]" label=" " />
                                </template>
                                <t-link @click="handleClickEdit(option.key)"
                                    v-if="props.editable && !editList.includes(option.key)" class="pro-description-edit"
                                    hover="color">
                                    <t-icon name="edit"></t-icon>
                                </t-link>
                                <t-link @click="handleSave(option, index)"
                                    v-if="props.editable && editList.includes(option.key)" class="pro-description-edit"
                                    hover="color" theme="success">
                                    <t-icon size="18" name="check"></t-icon>
                                </t-link>
                                <t-link @click="handleRemoveKey(option)"
                                    v-if="props.editable && editList.includes(option.key)" class="pro-description-edit"
                                    hover="color" theme="danger">
                                    <t-icon size="18" name="close"></t-icon>
                                </t-link>
                            </div>
                        </template>
                    </t-descriptions-item>
                </template>
            </t-descriptions>
        </t-form>
    </div>
</template>

<style>

</style>