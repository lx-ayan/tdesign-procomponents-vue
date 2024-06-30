<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { _props } from './props';
import { ProFormRadioEmits } from './types';

defineOptions({ name: 'ProFormRadio' })

const props = defineProps(_props);

const emits = defineEmits<ProFormRadioEmits>();

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

    innerValue.value = [void 0, null].includes(props.modelValue) ? void 0 : props.modelValue;
})

const innerValue = ref<any>();

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
    <t-form-item v-bind="props.formAttrs" :help="props.help" :label="props.label" :rules="props.rules"
        :name="props.name">
        <t-radio-group v-bind="$attrs" :disabled="props.disabled" v-if="!props.button" v-model="innerValue"
            allow-uncheck :name="props.name" :options="options" @change="handleChange"></t-radio-group>
        <t-radio-group v-bind="$attrs" :disabled="props.disabled" :allow-uncheck="props.allowUncheck"
            v-model="innerValue" v-else @change="handleChange">
            <t-radio-button v-for="(item) in options" :value="item.value">{{ item.label }}</t-radio-button>
        </t-radio-group>
    </t-form-item>
</template>

<style scoped></style>