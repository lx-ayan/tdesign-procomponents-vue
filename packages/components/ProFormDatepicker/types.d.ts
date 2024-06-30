export type { ProFormDatePicker } from './props';

export interface ProFormDatepickerEmits {
    (e: 'update:modelValue', value: any): void;
    (e: 'change', value: any): void;
}