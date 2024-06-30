export type { ProFormTextarea } from './props';
export interface ProFormTextareaEmits {
    (e: 'update:modelValue', value: string): void;
    (e: 'blur', value: any): void;
    (e: 'change', value: any): void;
    (e: 'focus', value: any): void;
    (e: 'keydown', value: any): void;
    (e: 'keypress', value: any): void;
    (e: 'keyup', value: any): void;
}