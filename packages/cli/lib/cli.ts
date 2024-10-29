import cac from "cac";
import { dev } from "./dev";

export async function cli() {
    const cli = cac("crx");


    const convertBase = (v: any) => {
        if (v === 0) {
            return ''
        }
        return v
    }
    // dev

    cli
        .option('-c, --config <file>', `[string] use specified config file`)
        .option('--base <path>', `[string] public base path (default: /)`, {
            type: [convertBase],
        })
        .option('-l, --logLevel <level>', `[string] info | warn | error | silent`)
        .option('--clearScreen', `[boolean] allow/disable clear screen when logging`)
        .option('-d, --debug [feat]', `[string | boolean] show debug logs`)
        .option('-f, --filter <filter>', `[string] filter debug logs`)
        .option('-m, --mode <mode>', `[string] set env mode`)


    cli
        .command("[root]")
        .alias("dev")
        .alias("serve")
        .alias("start")
        .option("--https", `[boolean] use TLS + HTTP/2`)
        .option("--open [path]", `[boolean | string] open browser on startup`)
        .option("--cors", `[boolean] enable CORS`)
        .option(
            "--strictPort",
            `[boolean] exit if specified port is already in use`
        )
        .option(
            "--force",
            `[boolean] force the optimizer to ignore the cache and re-bundle`
        )
        .action(async (root = process.cwd(), opts) => {
            await dev(root, opts);
        });

    cli.command("build [root]", "build for prod").action(async (root = process.cwd(), _) => {
    });
    cli.help();
    cli.version("1.0.0");
    cli.parse();
}