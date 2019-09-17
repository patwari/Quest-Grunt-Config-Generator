/**
 * This file contains the help controls.
 */

namespace monoloco.core {
    export class HelpFile {
        private helpButton: HTMLInputElement = document.getElementById("helpButton") as HTMLInputElement;
        private helpImage: HTMLElement = document.getElementById("helpDiv") as HTMLElement;

        public constructor() {
            this.helpButton.onclick = this.onHelpButtonClicked.bind(this);
        }

        private onHelpButtonClicked(): void {
            (solution) && solution.clearOutput();
            this.helpImage.style.display = "block";
        }

        public undoHelp(): void {
            this.helpImage.style.display = "none";
        }
    }
}
