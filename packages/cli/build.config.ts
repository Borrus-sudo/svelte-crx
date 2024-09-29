import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    entries: [
        "./lib/cli.ts",
    ],
    outDir: "dist",
    declaration: false,
    rollup: {
        output: {
            format: "esm"
        },
        esbuild: {
            minify: true
        }
    }
});