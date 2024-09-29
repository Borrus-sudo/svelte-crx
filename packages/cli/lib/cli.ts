import cac from "cac";
import { dev } from "./dev";

export async function cli() {
    const cli = cac("crx");
    cli.command("[root]", "start the vite dev server").alias("dev").alias("serve").alias("start").action(async (root = process.cwd(), _) => {
        await dev(root);
    });
    cli.command("build [root]", "build for prod").action(async (root = process.cwd(), _) => {
    });
    cli.help();
    cli.version("1.0.0");
    cli.parse();
}