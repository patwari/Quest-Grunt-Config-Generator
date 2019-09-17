/// <reference path="Interfaces.ts" />

/**
 * This file is the entry point of this project.
 * Declare all initial variables here, instantiate classes, and call relevant functions.
 */
namespace monoloco.core {
    export let outputDiv: HTMLElement = document.getElementById("outputDiv") as HTMLElement;
    export let helpFile: HelpFile = new HelpFile();
    export let solution: Solution = new Solution();
}
