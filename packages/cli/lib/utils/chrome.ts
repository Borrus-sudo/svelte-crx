import * as chromeLauncher from "chrome-launcher";
import { panic } from "./error";

export async function launchChrome() {
    try {
        await chromeLauncher.launch({
            ignoreDefaultFlags: true,
        })
    }
    catch (stderr) {
        const path = chromeLauncher.getChromePath();
        // fuck
        if (stderr)
            panic(`Failed to load chrome.exe at path ${path}. Seems you like gotta manually debug the chrome extension! Reference: (https://www.youtube.com/watch?v=Ta-YTDhiBIQ)`)
    }
    // else the chrome exe should just open 
}    