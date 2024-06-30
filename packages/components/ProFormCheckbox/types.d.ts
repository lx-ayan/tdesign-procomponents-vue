export type { ProFormCheckbox } from './props';

export interface ProFormCheckboxEmits {
    (e: 'update:modelValue', value: any): void;
    (e: 'change', value: any): void;
}