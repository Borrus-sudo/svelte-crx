import findFreePorts from "find-free-ports";
import path from "path";
import { createServer, UserConfig } from "vite";
import { launchChrome } from "./utils/chrome";

// copied from vitejs, we prolly dont' need types hence the `any`


function cleanGlobalCLIOptions(
    options: any,
) {
    const ret = { ...options }
    delete ret['--']
    delete ret.c
    delete ret.config
    delete ret.base
    delete ret.l
    delete ret.logLevel
    delete ret.clearScreen
    delete ret.d
    delete ret.debug
    delete ret.f

    delete ret.filter
    delete ret.m
    delete ret.mode
    delete ret.w

    // convert the sourcemap option to a boolean if necessary
    if ('sourcemap' in ret) {
        const sourcemap = ret.sourcemap as `${boolean}` | 'inline' | 'hidden'
        ret.sourcemap =
            sourcemap === 'true'
                ? true
                : sourcemap === 'false'
                    ? false
                    : ret.sourcemap
    }
    if ('watch' in ret) {
        const watch = ret.watch
        ret.watch = watch ? {} : undefined
    }

    return ret
}

export async function dev(root: string, options: any) {


    const [port] = await findFreePorts(1)
    const server = await createServer({
        configFile: path.join(root, "vite.config.ts"),
        root,
        server: {
            port,
            ...cleanGlobalCLIOptions(options)
        },
        base: options.base || "",
        mode: options.mode,
        logLevel: options.logLevel,
        clearScreen: options.clearScreen,
        optimizeDeps: { force: options.force },
    })
    await server.listen()
    // 
    server.printUrls()
    server.bindCLIShortcuts({ print: true })
    // await launchChrome();
}