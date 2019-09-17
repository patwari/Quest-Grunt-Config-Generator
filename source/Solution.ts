/**
 * This class contains our solution.
 * Call startPicking() from console to change the positions.
 */

namespace monoloco.core {
    export class Solution {
        public constructor() {
            this.generate();
        }

        private generate(): void {
            let htmlText: string = "";
            Constants.LANG.forEach((lang: string, langIndex: number) => {
                Constants.RESOLUTIONS.forEach((res: string, resIndex: number) => {
                    htmlText += "<hr />";
                    htmlText += 'list_base_' + res + '_' + lang + '<br /><br />';
                    let tempText: string = "";
                    tempText = "images/common/preload/other/";
                    htmlText = this.addSuffix(tempText, htmlText);
                    tempText = "images/common/preload/lang/" + lang + "/";
                    htmlText = this.addSuffix(tempText, htmlText);
                    tempText = "images/" + res + "/preload/other/";
                    htmlText = this.addSuffix(tempText, htmlText);
                    tempText = "images/" + res + "/preload/lang/" + lang + "/";
                    htmlText = this.addSuffix(tempText, htmlText);

                    htmlText += "<hr />";
                    htmlText += 'list_base_postload_' + res + '_' + lang + '<br /><br />';
                    tempText = "images/common/postload/baseGame/other/";
                    htmlText = this.addSuffix(tempText, htmlText);
                    tempText = "images/common/postload/baseGame/lang/" + lang + "/";
                    htmlText = this.addSuffix(tempText, htmlText);
                    tempText = "images/" + res + "/postload/baseGame/other/";
                    htmlText = this.addSuffix(tempText, htmlText);
                    tempText = "images/" + res + "/postload/baseGame/lang/" + lang + "/";
                    htmlText = this.addSuffix(tempText, htmlText);

                    htmlText += "<hr />";
                    htmlText += 'list_free_' + res + '_' + lang + '<br /><br />';
                    tempText = "images/" + res + "/postload/freegame/other/";
                    htmlText = this.addSuffix(tempText, htmlText);
                    tempText = "images/" + res + "/postload/freegame/lang/" + lang + "/";
                    htmlText = this.addSuffix(tempText, htmlText);

                    htmlText += "<hr />";
                    htmlText += 'list_info_' + res + '_' + lang + '<br /><br />';
                    tempText = "images/" + res + "/postload/paytable/other/";
                    htmlText = this.addSuffix(tempText, htmlText);
                    tempText = "images/" + res + "/postload/paytable/lang/" + lang + "/";
                    htmlText = this.addSuffix(tempText, htmlText);
                })
                htmlText += "<br /><br /><hr /><br /><br />";
            });

            outputDiv.innerHTML = htmlText;
        }

        private addSuffix(text: string, htmlText: string): string {
            let newHtmlText: string = htmlText;
            Constants.SUFFIX.forEach((suffix: string) => {
                newHtmlText += '"' + text + suffix + '",<br />';
            });
            return newHtmlText;
        }
    }
}
