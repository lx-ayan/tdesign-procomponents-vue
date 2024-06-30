<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { _props } from './props';
import { ProFormCheckboxEmits } from './types';

defineOptions({name: 'ProFormCheckbox'})

const props = defineProps(_props);

const emits = defineEmits<ProFormCheckboxEmits>();

const labelName = props.keyName || 'label';

const valueName = props.valueName || 'value';

onMounted(() => {
    if (!props.name) {
        throw new Error()
    }

    if (props.api) {
        props.api().then(res => {
            options.value = res.map(item => ({ label: item[labelName], value: item[valueName] }))
        })
    } else {
        if (props.list.length) {
            options.value = props.list.map(item => ({ label: item[labelName], value: item[valueName], disabled: item.disabled }))
        }
    }
})
const innerValue = ref<any>(props.modelValue || []);

const options = ref<{ label: string, value: any, disabled?: boolean }[]>([]);

watch(() => props.modelValue, (val) => {
    innerValue.value = val;
})

function handleChange(value: Array<any>) {
    emits('update:modelValue', value);
    emits('change', value);
}
</script>

<template>
    <t-form-item v-bind="props.formAttrs" :label="props.label" :help="props.help" :rules="props.rules"
        :name="props.name">
        <t-checkbox-group :readonly="props.readonly" :disabled="props.disabled" v-bind="$attrs" v-model="innerValue"
            :options="options" @change="handleChange" />
    </t-form-item>
</template>

<style scoped></style>