import { Plugin } from "vite";

const popupEntrypoint = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Svelte + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/main.ts"></script>
  </body>
</html>
`
const popupMainfile = `
import App from './src/popup/App.svelte'
import "uno.css";

  const app = new App({
  target: document.getElementById('app')!,
})

export default app
`;



export default function stubEntryPoint(): Plugin {
    const virtualize = (id: string) => {
        const virtualModuleId = "\0virtual:svelte-crx";
        return virtualModuleId + id
    };
    const entryPoints = ["/popup.html", "/content.html", "/main.ts"];
    const modulesMap = new Map([[virtualize(entryPoints[0]), popupEntrypoint], [virtualize(entryPoints[2]), popupMainfile]]);
    return {
        name: "vite-svelte-crx-stub-entrypoint",
        enforce: "pre",
        resolveId(id: string) {
            console.log(id)
            if (entryPoints.includes(id)) {
                return virtualize(id);
            }
        },
        load(virtualModuleId: string) {
            if (modulesMap.has(virtualModuleId))
                return modulesMap.get(virtualModuleId)
        }
    }

}