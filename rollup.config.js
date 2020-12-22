import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";
import { terser } from 'rollup-plugin-terser'

export default {
    input: "./src/index.ts",
    output: [
        {
            format: "umd",
            file: "lib/bundle.umd.js",
            name: "throttle-debounce-ts",
            sourcemap: true
        },
        {
            format: "es",
            file: "lib/bundle.esm.js",
            sourcemap: true
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            useTsconfigDeclarationDir: true
        }),
        sourceMaps(),
        terser()
    ],
    external: []
};
