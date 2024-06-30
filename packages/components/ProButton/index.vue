<template>
    <t-popconfirm v-if="props.mode === 'popup'" @confirm="handleConfirm" @cancel="handleCancel"
        :confirm-btn="props.confirmBtn" :cancel-btn="props.cancelBtn" :content="props.content"
        :popup-props="props.popupProps" :theme="props.popupTheme">
        <template v-if=slots.content #content>
            <slot name="content"></slot>
        </template>
        <template v-if="slots.popupIcon || props.popupIcon" #icon>
            <t-icon v-if="!slots.popupIcon" :name="props.popupIcon" />
            <slot name="popupIcon" v-else></slot>
        </template>
        <t-button :size="props.size" :disabled="props.disabled" :loading="innerLoading" :theme="props.theme"
            :variant="props.variant">
            <template v-if="props.icon || slots.icon" #icon>
                <t-icon v-if="!slots.icon" :name="icon"></t-icon>
                <slot name="icon" v-else></slot>
            </template>
            <span v-if="!slots.default">{{ props.text }}</span>
            <slot v-else></slot>
        </t-button>
    </t-popconfirm>
    <t-button @click="handleClick" v-else :size="props.size" :disabled="props.disabled" :loading="innerLoading"
        :theme="props.theme" :variant="props.variant">
        <template v-if="props.icon || slots.icon" #icon>
            <t-icon v-if="!slots.icon" :name="icon"></t-icon>
            <slot name="icon" v-else></slot>
        </template>
        <span v-if="!slots.default">{{ props.text }}</span>
        <slot v-else></slot>
    </t-button>

</template>

<script lang="ts" setup>
import { ref, useSlots, watch } from 'vue';
import { _props } from './props';
import { DialogInstance, DialogPlugin } from 'tdesign-vue-next';

defineOptions({
    name: 'ProButton'
});

const emits = defineEmits<{
    (e: 'update:loading', value: boolean): void,
    (e: 'confirm', instance: DialogInstance | null): void,
    (e: 'cancel', instance: DialogInstance | null): void,
    (e: 'click'): void
}>()

const props = defineProps(_props);

const slots = useSlots();

const innerLoading = ref(props.loading);

function handleConfirm() {
    emits('confirm', null);
}

function handleCancel() {
    emits('cancel', null);
}

function handleClick() {
    if (props.mode === 'default') {
        emits('click');
    } else if (props.mode === 'dialog') {
        const dialogInstance = DialogPlugin.confirm({
            body: props.content as any,
            header: props.dialogHeader,
            zIndex: props.zIndex,
            cancelBtn: props.cancelBtn,
            confirmBtn: props.confirmBtn,
            closeBtn: false,
            closeOnEscKeydown: props.closeOnEscKeydown,
            onConfirm() {
                emits('confirm', dialogInstance);
            },
            onCancel() {
                emits('cancel', dialogInstance);
            }
        })
    }
}

watch(() => props.loading, (value) => {
    innerLoading.value = value;
})

watch(innerLoading, value => emits('update:loading', value));

</script>