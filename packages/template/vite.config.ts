import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import extractorSvelte from '@unocss/extractor-svelte'
import UnoCSS from 'unocss/vite'
import Inspect from "vite-plugin-inspect"
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    Inspect(),
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
    }),
    svelte(),
    Icons(
      { compiler: "svelte", autoInstall: true },
    )
  ],
})
