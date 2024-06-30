<script setup lang='ts'>
import { ref, watch, nextTick } from 'vue';
import { useSlots } from 'vue';
import { MessagePlugin, SuccessContext, UploadFailContext, UploadFile, UploadSelectChangeContext, UploadValidateType } from 'tdesign-vue-next';
import { deleteEmpty } from '@procomponent-tdesign-vue/utils';
import { _props } from './props';
import { ProFormOption } from './types';

defineOptions({name: 'ProForm'})

//@ts-ignore
const SOURCE_URL = import.meta.env.VITE_SOURCE_URL || '';

const props = defineProps(_props);

const slots = useSlots();

const emits = defineEmits(['update:form', 'uploadSelectChange', 'uploadSuccess', 'uploadFail', 'uploadValidate', 'submit', 'reset', 'change']);

const innerForm = ref(props.form || {});

const innerOptions = ref<ProFormOption[]>();

const formRef = ref();

initForm().then(() => {
    if (props.mountedRequest) {
        props.mountedRequest();
    }
});

async function initForm() {
    const res = await props.request()
    if (!res) {
        if (props.form) {
            innerForm.value = {
                ...props.form,
            };
        } else {
            let arr = props.options.filter((item) => [false, void 0, null].includes(item.hideInForm));
            innerOptions.value = arr;
            let obj: any = {};
            innerOptions.value.forEach((item) => {
                if (item.type && ['dateRange', 'upload'].includes(item.type)) {
                    if (item.type == 'upload' && item.value) {
                        obj[item.name] = item.value.split(',').map((url: any) => {
                            return {
                                url: `${SOURCE_URL}${url}`,
                                name: url.split('/').pop()
                            }
                        })
                    } else {
                        obj[item.name] = item.value || [];
                    }
                } else {
                    obj[item.name] = [void 0, null].includes(item.value) ? void 0 : item.value;
                }
            })
            innerForm.value = obj;
        }
    } else {
        innerResult(res);
    }
    return true;
}

function innerResult(res: any) {
    let arr = props.options.filter((item) => [false, void 0, null].includes(item.hideInForm));
    innerOptions.value = arr;
    innerForm.value = ({ ...res });
    const uploadOp: ProFormOption | undefined = innerOptions.value.find(item => item.type == 'upload');
    if (uploadOp && innerForm.value[uploadOp.name]) {
        if (uploadOp.multiple) {
            innerForm.value[uploadOp.name] = innerForm.value[uploadOp.name].split(',').map((item: any) => {
                return {
                    url: `${SOURCE_URL}${item}`,
                    name: item.split('/').pop()
                }
            })
        } else {
            innerForm.value[uploadOp.name] = [
                {
                    url: `${SOURCE_URL}${innerForm.value[uploadOp.name]}`,
                    name: innerForm.value[uploadOp.name].split('/').pop()
                }
            ]
        }
    } else {
        if (uploadOp) {
            innerForm.value[uploadOp!.name] = [];
        }
    }

    const selectOption = innerOptions.value.find(item => item.type == 'select');
    if (selectOption && selectOption.multiple) {
        innerForm.value[selectOption.name] = innerForm.value[selectOption.name].split(',').map((item: any) => selectOption.needNumber ? Number(item) : item);
    }
}

function disabled(option?: ProFormOption) {
    return props.disabled || option?.disabled;
}

function readonly(option?: ProFormOption) {
    return props.readonly || option?.readonly;
}

function setItem(key: string, value: any) {
    nextTick(() => {
        innerForm.value[key] = value;
    })
}

function getFormValue() {
    return deleteEmpty({ ...innerForm.value });
}

function handleSelectChange(files: File[], context: UploadSelectChangeContext) {
    emits('uploadSelectChange', files, context);
}

function onSuccess(context: SuccessContext) {
    emits('uploadSuccess', context);
}

function onFail(options: UploadFailContext) {
    emits('uploadFail', options);
}

function onValidate(context: { type: UploadValidateType, files: UploadFile[] }) {
    emits('uploadValidate', context);
}

function submit() {
    formRef.value.validate().then((result: any) => {
        if (result === true) {
            emits('submit', getFormValue());
        } else {
            MessagePlugin.error('请检查表单');
        }
    })
}

function reset() {
    emits('reset');
    formRef.value.reset();
    const fList = props.options.filter(item => item.type == 'upload');
    if (fList.length) {
        fList.forEach(item => {
            innerForm.value[item.name] = [];
        })
    }
}

watch(() => props.options, () => {
    initForm()
}, { deep: true });

watch(innerForm, (value) => {
    emits('change', value);
}, { deep: true });

const isFun = (params: any) => {
    return typeof params === 'function';
}

defineExpose({
    setItem,
    getFormValue,
    initForm,
    submit,
    reset,
})

</script>
<template>
    <t-form @submit="submit" ref="formRef" @reset="reset" :data="innerForm" :layout="props.layout"
        :labelAlign="props.labelAlign">
        <t-row :gutter="[12, 24]">
            <template v-for="(option) in innerOptions" :span="option.col || 6" :offset="option.offset">
                <slot :name="`before-${option.name}`"></slot>
                <t-col :span="option.col || 6" :offset="option.offset">
                    <template v-if="!option.isSlot">
                        <ProFormInput :formAttrs="option.formAttrs" v-if="['input', void 0].includes(option.type)" v-model.trim="innerForm[option.name]"
                            :readonly="readonly(option)" :disabled="disabled(option)"
                            :placeholder="option.placeholder || `请输入${option.label}`" :rules="option.rules"
                            v-bind="option.inputAttrs" :name="option.name" :label="option.label"
                            :inputAttrs="option.inputAttrs">
                        </ProFormInput>

                        <ProFormInput :formAttrs="option.formAttrs" v-if="option.type == 'password'" v-model.trim="innerForm[option.name]"
                            :readonly="readonly(option)" type="password" :disabled="disabled(option)"
                            :placeholder="option.placeholder || `请输入${option.label}`" :rules="option.rules" v-bind="option.inputAttrs"
                            :name="option.name" :label="option.label" :inputAttrs="option.inputAttrs">
                        </ProFormInput>

                        <ProFormRadio :formAttrs="option.formAttrs" v-if="option.type == 'radio' && !isFun(option.optionData)" :list="option.optionData"
                            v-model.trim="innerForm[option.name]" :disabled="disabled(option) || readonly(option)"
                            :rules="option.rules" :button="option.radioButton" :name="option.name" :label="option.label"
                            :variant="option.variant" v-bind="option.radioAttrs">
                        </ProFormRadio>

                        <ProFormRadio :formAttrs="option.formAttrs" v-if="option.type == 'radio' && isFun(option.optionData)" :api="option.optionData"
                            v-model.trim="innerForm[option.name]" :disabled="disabled(option) || readonly(option)"
                            :rules="option.rules" :button="option.radioButton" :name="option.name" :label="option.label"
                            :variant="option.variant" v-bind="option.radioAttrs">
                        </ProFormRadio>

                        <ProFormSelect :formAttrs="option.formAttrs" v-if="option.type == 'select' && !isFun(option.optionData)"
                            :placeholder="`请选择${option.label}`" :list="option.optionData"
                            v-model.trim="innerForm[option.name]" :readonly="readonly(option)" :disabled="disabled(option)"
                            :rules="option.rules" :button="option.radioButton" :name="option.name" :label="option.label"
                            :variant="option.variant" :multiple="option.multiple" v-bind="option.selectAttrs">
                        </ProFormSelect>

                        <ProFormSelect :formAttrs="option.formAttrs" v-if="option.type == 'select' && isFun(option.optionData)"
                            :keyName="option.keyName || 'label'" :valueName="option.valueName || 'value'"
                            :placeholder="`请选择${option.label}`" :api="option.optionData"
                            v-model.trim="innerForm[option.name]" :readonly="readonly(option)" :disabled="disabled(option)"
                            :rules="option.rules" :button="option.radioButton" :name="option.name" :label="option.label"
                            :variant="option.variant" :multiple="option.multiple" v-bind="option.selectAttrs">
                        </ProFormSelect>

                        <ProFormCheckbox :formAttrs="option.formAttrs" v-if="option.type == 'checkbox' && !isFun(option.optionData)"
                            :list="option.optionData" v-model.trim="innerForm[option.name]"
                            :disabled="disabled(option) || readonly(option)" :rules="option.rules"
                            :button="option.radioButton" :name="option.name" :label="option.label" :variant="option.variant"
                            :multiple="option.multiple" v-bind="option.selectAttrs">
                        </ProFormCheckbox>

                        <ProFormCheckbox :formAttrs="option.formAttrs" v-if="option.type == 'checkbox' && isFun(option.optionData)"
                            :api="option.optionData" v-model.trim="innerForm[option.name]"
                            :disabled="disabled(option) || readonly(option)" :rules="option.rules"
                            :button="option.radioButton" :name="option.name" :label="option.label" :variant="option.variant"
                            :multiple="option.multiple" v-bind="option.selectAttrs">
                        </ProFormCheckbox>

                        <ProFormTextarea :formAttrs="option.formAttrs" v-if="option.type == 'textarea'" v-model.trim="innerForm[option.name]"
                            :readonly="readonly(option)" :disabled="disabled(option)" :placeholder="`请输入${option.label}`"
                            :rules="option.rules" :name="option.name" :label="option.label" v-bind="option.textAttrs">
                        </ProFormTextarea>

                        <ProFormDatepicker :formAttrs="option.formAttrs" v-if="option.type == 'date'" v-model.trim="innerForm[option.name]"
                            :format="option.format" :enableTimePicker="option.enableTimePicker"
                            :disabled="disabled(option) || readonly(option)" v-bind="option.datePickerAttrs"
                            :rules="option.rules" :name="option.name" :label="option.label">
                        </ProFormDatepicker>

                        <ProFormDatepicker :formAttrs="option.formAttrs" range v-if="option.type == 'dateRange'" v-model.trim="innerForm[option.name]"
                            :format="option.format" :enableTimePicker="option.enableTimePicker" :readonly="option.readonly"
                            :disabled="disabled(option) || readonly(option)" v-bind="option.datePickerAttrs"
                            :rules="option.rules" :name="option.name" :label="option.label">
                        </ProFormDatepicker>

                        <t-form-item v-bind="option.formAttrs" :label="option.label" :rules="option.rules" :name="option.name"
                            v-if="option.type == 'upload'">
                            <t-upload v-model.trim="innerForm[option.name]" v-bind="option.uploadAttrs"
                                :disabled="disabled(option) || readonly(option)" @select-change="handleSelectChange"
                                @fail="onFail" @success="onSuccess" @validate="onValidate" />
                        </t-form-item>

                        <t-form-item v-bind="option.formAttrs" :label="option.label" :rules="option.rules" :name="option.name"
                            v-if="option.type == 'number'">
                            <t-input-number :style="option.style" v-model.trim="innerForm[option.name]"
                                :readonly="readonly(option)" v-bind="option.inputNumberAttrs"
                                :disabled="disabled(option)" />
                        </t-form-item>

                        <ProFormSelectTree :formAttrs="option.formAttrs" v-if="option.type == 'selectTree' && !isFun(option.optionData)"
                            :keyName="option.keyName || 'label'" :valueName="option.valueName || 'value'"
                            :placeholder="`请选择${option.label}`" :list="option.optionData"
                            v-model.trim="innerForm[option.name]" :readonly="readonly(option)" :disabled="disabled(option)"
                            :rules="option.rules" :button="option.radioButton" :name="option.name" :label="option.label"
                            :variant="option.variant" :multiple="option.multiple" v-bind="option.selectTreeAttrs">
                        </ProFormSelectTree>

                        <ProFormSelectTree :formAttrs="option.formAttrs" v-if="option.type == 'selectTree' && isFun(option.optionData)"
                            :keyName="option.keyName || 'label'" :valueName="option.valueName || 'value'"
                            :placeholder="`请选择${option.label}`" :api="option.optionData"
                            v-model.trim="innerForm[option.name]" :readonly="readonly(option)" :disabled="disabled(option)"
                            :rules="option.rules" :button="option.radioButton" :name="option.name" :label="option.label"
                            :variant="option.variant" :multiple="option.multiple" v-bind="option.selectTreeAttrs">
                        </ProFormSelectTree>
                    </template>

                    <template v-else>
                        <slot :name="`form-${option.name}`" :option="option"></slot>
                    </template>
                </t-col>
                <slot :name="`after-${option.name}`"></slot>
            </template>


            <slot></slot>
        </t-row>

        <t-row class="proform-footer">
            <t-col v-if="props.footer !== false && !slots.footer" :span="12">
                <t-button type="submit" style="margin-right: 0.75rem;">{{ props.submitText }}</t-button>
                <t-button v-if="showReset" type="reset" theme="default">{{ props.resetText }}</t-button>
            </t-col>

            <slot v-else name="footer"></slot>
        </t-row>

    </t-form>
</template>
<style scoped>
.proform-footer {
    margin-top: 24px;
    text-align: v-bind('props.footerAligin');
}
</style>
