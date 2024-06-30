<script setup lang='ts'>
import { useSlots } from 'vue';
import './style.css';
import { _props } from './props';
const slots = useSlots();

defineOptions({ name: 'PageContainer' });

const props = defineProps(_props);
</script>

<template>
    <div class="page-container">
        <div v-if="!props.hideBread" class="page-container-bread">
            <t-breadcrumb>
                <t-breadcrumbItem v-for="bread in props.breads" :to="bread.path" :href="bread.href"
                    :target="bread.target" :disabled="bread.disabled" :replace="bread.replace">{{ bread.text
                    }}</t-breadcrumbItem>
            </t-breadcrumb>
        </div>
        <div v-if="!props.hideTitle || props.title" class="page-container-title">
            <div>
                <span v-if="!slots.title">{{ props.title }}</span>
                <slot v-else name="title"></slot>
            </div>
            <div>
                <slot name="actions"></slot>
            </div>
        </div>
        <div v-if="props.content || slots.content" class="page-container-content">
            <span v-if="!slots.content">{{ props.content }}</span>
            <slot v-else name="content"></slot>
        </div>
        <div v-if="props.tabs" class="page-container-tabs">
            <ProTabs :defaultValue="props.tabDefaultValue" :tabAttrs="props.tabsAttrs" :tabs="props.tabs">
                <template v-if="slots.tabContent" #default="{ key }">
                    <slot name="tabContent" :key="key"></slot>
                </template>
            </ProTabs>
        </div>
        <div class="page-container-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>