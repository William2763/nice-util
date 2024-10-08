import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default [
  // ESM and CJS configuration
  {
    input: ['src/index.ts'],
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
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      json()
    ],
    preserveModules: true,
  },
  // UMD configuration
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'NiceUtil', // 替换为你的库名
      sourcemap: true,
      globals: {
        // 添加你的外部依赖，如 React: 'React'
      }
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      json(),
      terser()
    ]
  }
];