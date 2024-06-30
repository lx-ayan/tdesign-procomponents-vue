export type { ProFormRadio } from './props';

export interface ProFormRadioEmits {
    (e: 'update:modelValue', value: any): void;
    (e: 'change', value: any): void;
}