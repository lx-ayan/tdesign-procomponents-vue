<template>
    <t-dialog ref="proModalRef" :header="props.header" @confirm="submit" v-model:visible="innerVisible">
        <div class="pro-modal-body" v-if="innerVisible && props.options">
            <ProForm @submit="handleSubmit" ref="proFormRef" :footer="false" :options="props.options"
                :request="props.request">
                <template v-for="name in props.options.map(item => item.name)" #[`before-${name}`]>
                    <slot v-if="slots[`before-${name}`]" :name="`before-${name}`"></slot>
                </template>
                <template v-for="name in props.options.map(item => item.name)" #[`after-${name}`]>
                    <slot v-if="slots[`after-${name}`]" :name="`after-${name}`"></slot>
                </template>
            </ProForm>
        </div>
        <template v-if="slots.footer" #footer>
            <slot name="footer"></slot>
        </template>
    </t-dialog>
</template>

<script setup lang="ts">
import './style.css';
import { ref, watch, useSlots } from 'vue';
import { _props } from './props';
import { ProFormRef } from '../ProForm/types';

defineOptions({ name: 'ProModal' })

const slots = useSlots();

const props = defineProps(_props)

const innerVisible = ref(false);

const proFormRef = ref<ProFormRef>();

const proModalRef = ref();

const emits = defineEmits(['update:visible', 'submit']);

function handleSubmit(value: any) {
    emits('submit', value);
}

function submit() {
    proFormRef.value?.submit();
}

function reset() {
    proFormRef.value?.reset()
}

function getFormValue() {
    proFormRef.value?.getFormValue()
}

function setItem(name: string, value: any) {
    proFormRef.value?.setItem(name, value);
}

watch(() => props.visible, value => {
    innerVisible.value = value;
})

watch(innerVisible, value => {
    emits('update:visible', value);
})

defineExpose({
    submit,
    reset,
    getFormValue,
    setItem
})

</script>
