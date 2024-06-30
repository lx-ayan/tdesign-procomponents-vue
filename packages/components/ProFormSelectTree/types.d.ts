export type { ProFormSelectTree } from './props';

export interface ProFormSelectTreeEmits {
    (e: 'update:modelValue', value: any): void;
    (e: 'change', value: { label: string, value: any } | Array<{ label: string, value: any }>): void;
}