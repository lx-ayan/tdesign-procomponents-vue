export type { ProFormInput } from "./props";

export interface ProFormInputEmits {
    (e: 'update:modelValue', value: string): void;
    (e: 'change', value: any): void;
    (e: 'blur', value: any): void;
    (e: 'clear', value: any): void;
    (e: 'click', value: any): void;
    (e: 'compositionend', value: any): void;
    (e: 'compositionstart', value: any): void;
    (e: 'enter', value: any): void;
    (e: 'focus', value: any): void;
    (e: 'keydown', value: any): void;
    (e: 'keyup', value: any): void;
    (e: 'mouseenter', value: any): void;
    (e: 'mouseleave', value: any): void;
    (e: 'paste', value: any): void;
    (e: 'validate', value: any): void;
    (e: 'wheel', value: any): void;
}