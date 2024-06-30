export type { ProFormSelect } from './props';

export interface ProFormSelectEmits {
    (e: 'update:modelValue', value: any): void;
    (e: 'change', value: { label: string, value: any } | Array<{ label: string, value: any }>): void;
}
