import type { RollupOptions } from 'rollup'
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const external = ['@nestjs/common', '@nestjs/core', 'winston']
const bundles: RollupOptions[] = [
    /* es */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/esm/yiu-nest-winston.js',
            format: 'esm',
        },
        external,
        plugins: [typescript()],
    },
    /* es min no map */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/esm/yiu-nest-winston.min.nomap.js',
            format: 'esm',
        },
        external,
        plugins: [typescript(), terser()],
    },
    /* es min */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/esm/yiu-nest-winston.min.js',
            format: 'esm',
            sourcemap: true,
            sourcemapFile: 'dist/esm/yiu-nest-winston.min.map',
        },
        external,
        plugins: [typescript(), terser()],
    },
    /* commonjs */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/cjs/yiu-nest-winston.cjs',
            format: 'cjs',
        },
        external,
        plugins: [typescript()],
    },
    /* commonjs min nomap*/
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/cjs/yiu-nest-winston.min.nomap.cjs',
            format: 'cjs',
        },
        external,
        plugins: [typescript(), terser()],
    },
    /* commonjs min */
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/cjs/yiu-nest-winston.min.cjs',
            format: 'cjs',
            sourcemap: true,
            sourcemapFile: 'dist/cjs/yiu-nest-winston.min.map',
        },
        external,
        plugins: [typescript(), terser()],
    },
]

export default defineConfig(bundles)
