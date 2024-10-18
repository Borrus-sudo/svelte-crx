import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Inspect from "vite-plugin-inspect"
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    Inspect(),
    svelte(),
    Icons(
      { compiler: "svelte", autoInstall: true },
    )
  ],
})
