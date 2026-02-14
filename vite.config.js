import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

import basicSsl from '@vitejs/plugin-basic-ssl';

const gitRepoName = 'trolley';

export default defineConfig(({ mode }) => ({
    base: mode === 'production' ? `/${gitRepoName}/` : '/',
    build: {
        assetsInlineLimit: 0,
    },
    plugins: [vue(), basicSsl()],
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.vue',
            '.scss',
        ],
    },
    define: { 'process.env': {} },
    server: {
        port: 3000,
        watch: {
            usePolling: true
        }
    },
}));