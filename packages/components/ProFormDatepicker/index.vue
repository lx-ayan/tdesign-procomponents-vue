<script setup lang='ts'>
import { ref, watch } from 'vue';
import { _props } from './props';
import { ProFormDatepickerEmits } from './types';

defineOptions({ name: 'ProFormDatePicker' });

const props = defineProps(_props);

const emits = defineEmits<ProFormDatepickerEmits>();

const innerValue = ref<any>(props.modelValue);

watch(() => props.modelValue, (val) => {
    innerValue.value = val;
})

function handleChange(value: any, context: any) {
    emits('update:modelValue', value)
    emits('change', { value, context })
}

</script>

<template>
    <t-form-item :help="props.help" v-bind="props.formAttrs" :rules="props.rules" :name="name" :label="label">
        <t-date-picker :enable-time-picker="enableTimePicker" style="width: 100%"
            :disabled="props.disabled || props.readonly" :format="props.format" @change="handleChange"
            v-if="!props.range" v-bind="$attrs" v-model="innerValue" />
        <t-date-range-picker :enable-time-picker="enableTimePicker" :disabled="props.disabled || props.readonly" v-else
            v-bind="$attrs" v-model="innerValue" @change="handleChange" />
    </t-form-item>
</template>

<style scoped></style>