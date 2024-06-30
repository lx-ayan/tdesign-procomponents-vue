<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { _props } from './props';
import { ProFormInputEmits } from './types';

defineOptions({
    name: 'ProFormInput'
})

const emits = defineEmits<ProFormInputEmits>();

const props = defineProps(_props);

onMounted(() => {
    if (!props.name) {
        throw new Error('ProFormInput => name is required')
    }
})

const innerValue = ref(props.modelValue || '');

watch(() => props.modelValue, (val) => {
    innerValue.value = val;
})

function handleInput(e: any) {
    emits('update:modelValue', e.target.value);
}

function handleChange(e: any) {
    emits('change', e);
}

function handleBlur(e: any) {
    emits('blur', e);
}

function handleclick(e: any) {
    emits('click', e)
}
function handlecompositionend(e: any) {
    emits('compositionend', e)
}
function handlecompositionstart(e: any) {
    emits('compositionstart', e)
}
function handleenter(e: any) {
    emits('enter', e)
}
function handlefocus(e: any) {
    emits('focus', e)
}
function handlekeydown(e: any) {
    emits('keydown', e)
}
function handlekeyup(e: any) {
    emits('keyup', e)
}
function handlemouseenter(e: any) {
    emits('mouseenter', e)
}
function handlemouseleave(e: any) {
    emits('mouseleave', e)
}
function handlepaste(e: any) {
    emits('paste', e)
}
function handlevalidate(e: any) {
    emits('validate', e)
}
function handlewheel(e: any) {
    emits('wheel', e)
}


</script>


<template>
    <t-form-item :help="props.help" :name="name" :label="props.label" :rules="rules" v-bind="props.formAttrs">
        <t-input @click="handleclick" @compositionend="handlecompositionend" @compositionstart="handlecompositionstart"
            @enter="handleenter" @focus="handlefocus" @keydown="handlekeydown" @keyup="handlekeyup"
            @mouseenter="handlemouseenter" @mouseleave="handlemouseleave" @paste="handlepaste" @validate="handlevalidate"
            @wheel="handlewheel" @blur="handleBlur" :type="type" @change="handleChange" v-bind="props.inputAttrs"
            :disabled="props.disabled" :readonly="props.readonly" @input="handleInput" v-model="innerValue"
            :placeholder="props.placeholder">
            <template #prefix-icon>
                <slot name="prefix-icon"></slot>
            </template>
        </t-input>
    </t-form-item>
</template>

<style scoped></style>