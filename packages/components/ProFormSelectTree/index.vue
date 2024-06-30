<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { _props } from './props';
import { ProFormSelectTreeEmits } from './types';

defineOptions({ name: 'ProFormSelectTree' })

const props = defineProps(_props);

const emits = defineEmits<ProFormSelectTreeEmits>();

const labelName = props.keyName || 'label';

const valueName = props.valueName || 'value';

const options = ref<any[]>([]);

const innerValue = ref<any>(props.modelValue);

function handleChange(value: any) {
    if (!options.value.length) return;
    emits('update:modelValue', value);
    emits('change', value);
}

watch(() => props.modelValue, (val) => innerValue.value = val)

function toLableValue(list: any[]) {
    const objList: any[] = [];
    list.forEach(item => {
        let obj: any = {
            label: item[labelName],
            value: item[valueName],
        }

        if (item.children) {
            obj['children'] = toLableValue(item.children)
        }

        objList.push(obj)
    })

    return objList;
}

onMounted(() => {
    if (!props.name) {
        throw new Error('ProFormSelect => name is required')
    }
    if (props.api) {
        props.api().then(res => {
            options.value = toLableValue(res);
        })
    } else {
        if (props.list.length) {
            options.value = props.list.map(item => ({ label: item[labelName], value: item[valueName], disabled: item.disabled }))
        }
    }
})
</script>

<template>
    <t-form-item :help="props.help" :name="props.name" v-bind="props.formAttrs" :label="props.label"
        :rules="props.rules">
        <t-tree-select :style="{ width: props.width }" v-bind="$attrs" :multiple="multiple" :disabled="disabled"
            :readonly="props.readonly" @change="handleChange" v-model="innerValue"
            :placeholder="props.placeholder || '请选择'" :data="options"></t-tree-select>
    </t-form-item>
</template>
