import { defineConfig } from "vite";
import { resolve } from 'path';
import Vue from '@vitejs/plugin-vue';


export default defineConfig({
    plugins: [Vue()],
    build: {
        outDir: 'umd',
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'procomponent-tdesign-vue',
            fileName: 'index',
            formats: ['umd']
        },
        rollupOptions: {
            external: ['vue', 'tdesign-vue-next'],
            output: {
                exports: 'named',
                globals: {
                    vue: "Vue"
                },
                assetFileNames: ({ name }) => {
                    if (name === 'style.css') return 'index.css';
                    else return name as string;
                }
            }
        },
    }
})