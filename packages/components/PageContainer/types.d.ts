export type { PageContainer } from './props';

export interface BreadOption {
    text: string;
    path?: string;
    href?: string;
    target?: string;
    disabled?: boolean;
    replace?: boolean;
}