import findFreePorts from "find-free-ports";
import path from "path";
import { createServer } from "vite";
import stubEntryPoint from "./plugins/iso/entrypoint";




export async function dev(root: string) {
    const [port] = await findFreePorts(1)
    const server = await createServer({
        configFile: path.join(root, "vite.config.ts"),
        root,
        server: {
            port,
        },
        // inject plugins here!
        plugins: [stubEntryPoint()]
    })
    await server.listen()
    // 
    server.printUrls()
    server.bindCLIShortcuts({ print: true })
}