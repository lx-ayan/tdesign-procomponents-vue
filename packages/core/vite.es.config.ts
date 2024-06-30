import { defineConfig } from "vite";
import { resolve } from 'path';
import Vue from '@vitejs/plugin-vue';
import DTS from 'vite-plugin-dts';
import { readdirSync } from "fs";
const compNames = [
    'ProButton',
    'ProFormInput',
    'ProFormSelect',
    'ProFormRadio',
    'ProFormSelectTre', ,
    'PageContainer',
    'ProDescription',
    'ProForm',
    'ProFormTextarea',
    'ProFormDatepicke', ,
    'ProFormCheckbox',
    'ProModal',
    'ProTable',
    'ProTabs',
]

function getComponents(basePath: string) {
    const entiries = readdirSync(basePath, { withFileTypes: true });
    return entiries.filter(entry => entry.isDirectory()).map(entry => entry.name)
}

export default defineConfig({
    plugins: [Vue(), DTS({
        tsconfigPath: '../../tsconfig.build.json',
        outDir: 'lib/types'
    })],
    build: {
        outDir: 'lib/es',
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'procomponent-tdesign-vue',
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            external: ['vue', 'tdesign-vue-next'],
            output: {
                assetFileNames: ({ name }) => {
                    if (name === 'style.css') return 'style/index.css';
                    else return name as string;
                },
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }

                    if (id.includes('/packages/utils')) {
                        return 'utils';
                    }

                    for (const item of getComponents('../components')) {
                        if (id.includes(`/packages/components/${item}`)) {
                            return item;
                        }
                    }
                }
            }
        },
    }
})