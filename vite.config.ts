import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

const model = (mode) => loadEnv(mode, process.cwd())

module.exports = ({ mode }) => {
  return defineConfig({
    base: model(mode).VITE_APP_NAME,
    build: {
      outDir: model(mode).VITE_APP_OUTDIR,
    },
    plugins: [
      vue(), vueJsx(),
    ],
    resolve: {
      alias: {
        '@': pathResolve('./src'),
      },
    }
  });
}
