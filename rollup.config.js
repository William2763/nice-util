// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: {
    index: 'src/index.ts'
  },
  output: [
    {
      dir: 'dist/esm',
      format: 'esm',
      entryFileNames: '[name].js'
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].js'
    },
    {
      dir: 'dist/umd',
      format: 'umd',
      name: 'nice-util', // 替换为你的库名
      globals: {
        // 添加你的外部依赖，如 React: 'React'
      },
      sourcemap: true,
      plugins: [terser()] // 压缩 UMD 文件
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    json()
  ],
  preserveModules: false,
};