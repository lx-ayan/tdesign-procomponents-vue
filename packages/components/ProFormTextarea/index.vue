<script setup lang='ts'>
import { ref, watch } from 'vue';
import { _props } from './props';
import { ProFormTextareaEmits } from './types';

defineOptions({name: 'ProFormTextarea'})

const props = defineProps(_props);

const emits = defineEmits<ProFormTextareaEmits>();

const innerValue = ref<any>(props.modelValue);

watch(() => props.modelValue, (val) => {
    innerValue.value = val;
})

function handleChange(e: string, context: any) {
    emits('update:modelValue', e)
    emits('change', { value: e, context })
}

</script>

<template>
    <t-form-item :help="props.help" v-bind="props.formAttrs" :rules="props.rules" :name="name" :label="label">
        <t-textarea @change="handleChange" @blur="(value: string, context: any) => emits('blur', { value, context })"
            @focus="(value: string, context: any) => emits('focus', { value, context })"
            @keydown="(value: string, context: any) => emits('keydown', { value, context })"
            @keypress="(value: string, context: any) => emits('keypress', { value, context })"
            @keyup="(value: string, context: any) => emits('keyup', { value, context })" :disabled="props.disabled"
            :readonly="props.readonly" v-bind="$attrs" v-model="innerValue" placeholder="请输入内容" />
    </t-form-item>
</template>
