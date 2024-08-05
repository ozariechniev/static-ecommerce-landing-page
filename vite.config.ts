/** @type {import('vite').UserConfig} */

import { resolve } from 'path';
import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
    plugins: [injectHTML()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                styleguide: resolve(__dirname, 'styleguide.html'),
            },
        },
    },
});
