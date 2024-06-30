<script setup lang='ts'>
import { useSlots } from 'vue';
import { _props } from './props';
const slots = useSlots();

const props = defineProps(_props);
</script>

<template>
    <t-tabs :defaultValue="props.defaultValue" v-bind="props.tabsAttrs">
        <t-tab-panel v-bind="tab.tabPanelAttrs" v-for="tab in props.tabs" :value="tab.key" :label="tab.label">
            <p class="pro-tabs-content" v-if="!slots.default">{{ tab.children }}</p>
            <slot v-else :key="tab.key"></slot>
        </t-tab-panel>
    </t-tabs>
</template>