/**
 * This class is the brain of our project.
 * Here we generate the File Index and List Manifest objects.
 */

namespace monoloco.core {
    export class Solution {
        private langField: HTMLInputElement = document.getElementById("langField") as HTMLInputElement;
        private fileindexButton: HTMLElement = document.getElementById("fileindexButton") as HTMLElement;
        private listManifestButton: HTMLElement = document.getElementById("listManifestButton") as HTMLElement;

        public constructor() {
            this.fileindexButton.onclick = this.onFileIndexClicked.bind(this);
            this.listManifestButton.onclick = this.onListManifestClicked.bind(this);
        }

        public onFileIndexClicked(): void {
            this.clearOutput();
            this.getUserLang();
            this.getUserResolution();
            this.getUserFileTypes();
            this.getUserLoadTypes();
            this.generateFileIndexConfig();
        }

        private onListManifestClicked(): void {
            this.clearOutput();
            this.getUserLang();
            this.getUserResolution();
            this.getUserFileTypes();
            this.getUserLoadTypes();
            this.generateListManifestConfig();
        }

        /**
         * Parse user selected languages and make the LANG array ready for use.
         */
        private getUserLang(): void {
            Constants.LANG = [];
            let langString: string = this.langField.value;
            let langArray: Array<string> = langString.split(",");
            for (let index: number = 0; index < langArray.length; index++) {
                langArray[index] = langArray[index].trim();
                if (langArray[index].length) {
                    Constants.LANG.push(langArray[index]);
                }
            }
        }

        private getUserResolution(): void {
            Constants.RESOLUTIONS = [];
            let res_desktop: HTMLInputElement = <HTMLInputElement>document.getElementById("res_desktop");
            let res_hd: HTMLInputElement = <HTMLInputElement>document.getElementById("res_hd");
            let res_sd: HTMLInputElement = <HTMLInputElement>document.getElementById("res_sd");
            let res_ld: HTMLInputElement = <HTMLInputElement>document.getElementById("res_ld");
            if (res_desktop.checked) {
                Constants.RESOLUTIONS.push("<%= dtRes %>");
            }
            if (res_hd.checked) {
                Constants.RESOLUTIONS.push("<%= hdRes %>");
            }
            if (res_sd.checked) {
                Constants.RESOLUTIONS.push("<%= sdRes %>");
            }
            if (res_ld.checked) {
                Constants.RESOLUTIONS.push("<%= ldRes %>");
            }
        }
        /**
         * Parse user selected file types and make FILE_TYPE_SUFFiX array ready for use
         */
        private getUserFileTypes(): void {
            Constants.FILE_TYPE_SUFFIX = [];
            let type_json: HTMLInputElement = <HTMLInputElement>document.getElementById("type_json");
            let type_png: HTMLInputElement = <HTMLInputElement>document.getElementById("type_png");
            let type_jpg: HTMLInputElement = <HTMLInputElement>document.getElementById("type_jpg");
            let type_atlas: HTMLInputElement = <HTMLInputElement>document.getElementById("type_atlas");
            if (type_json.checked) {
                Constants.FILE_TYPE_SUFFIX.push("**/*.json");
            }
            if (type_png.checked) {
                Constants.FILE_TYPE_SUFFIX.push("**/*.png");
            }
            if (type_jpg.checked) {
                Constants.FILE_TYPE_SUFFIX.push("**/*.jpg");
            }
            if (type_atlas.checked) {
                Constants.FILE_TYPE_SUFFIX.push("**/*.atlas");
            }
        }

        /**
         * Parse user selected File types.
         */
        private getUserLoadTypes(): void {
            Constants.LOAD_TYPE_ARRAY = [];
            let load_base: HTMLInputElement = <HTMLInputElement>document.getElementById("load_base");
            let type_base_postload: HTMLInputElement = <HTMLInputElement>document.getElementById("type_base_postload");
            let type_free: HTMLInputElement = <HTMLInputElement>document.getElementById("type_free");
            let type_info: HTMLInputElement = <HTMLInputElement>document.getElementById("type_info");
            if (load_base.checked) {
                Constants.LOAD_TYPE_ARRAY.push(LOADTYPE.list_base);
            }
            if (type_base_postload.checked) {
                Constants.LOAD_TYPE_ARRAY.push(LOADTYPE.list_base_postload);
            }
            if (type_free.checked) {
                Constants.LOAD_TYPE_ARRAY.push(LOADTYPE.list_free);
            }
            if (type_info.checked) {
                Constants.LOAD_TYPE_ARRAY.push(LOADTYPE.list_info);
            }
        }

        /**
         * clear the output div
         */
        public clearOutput(): void {
            outputDiv.innerHTML = "";
            (helpFile) && helpFile.undoHelp();
        }

        /**
         * This function generates the File Index objects. 
         */
        public generateFileIndexConfig(): void {
            let htmlText: string = "";

            if (!Constants.LANG.length) {
                // TODO:  handle later when no language given
                Constants.RESOLUTIONS.forEach((res: string, resIndex: number) => {
                    Constants.LOAD_TYPE_ARRAY.forEach((loadType: LOADTYPE) => {
                        htmlText += this.getFileIndex(undefined, res, loadType);
                    });
                });
            }

            Constants.LANG.forEach((lang: string, langIndex: number) => {
                Constants.RESOLUTIONS.forEach((res: string, resIndex: number) => {
                    Constants.LOAD_TYPE_ARRAY.forEach((loadType: LOADTYPE) => {
                        htmlText += this.getFileIndex(lang, res, loadType);
                    });
                });
            });

            // remove the last comma "," (if any)
            htmlText = htmlText.replace(/,<br>$/, "<br>");
            htmlText = '"files": [<br>' + htmlText + ']';
            outputDiv.innerHTML = htmlText;
        }

        /**
         * Generates individual objects string for provided configurations
         * @param lang Language
         * @param res Resolution
         * @param loadType 
         * @returns {string} the final object string 
         */
        private getFileIndex(lang: string | undefined, res: string, loadType: LOADTYPE): string {
            let tempText: string = "";
            let finalString: string = "";
            finalString += "{<br>";
            finalString += '"dest": ' + '"<%= assetsDir %>manifest/';

            if (lang === undefined || lang === null) {
                switch (loadType) {
                    case LOADTYPE.list_base:
                        finalString += 'list_base' + '_' + res + '.json",<br>';
                        finalString += '"src": [<br>';
                        tempText = Constants.PATH_PREFIX + "common/preload/";
                        finalString += this.addSuffix(tempText);
                        tempText = Constants.PATH_PREFIX + res + "/preload/";
                        finalString += this.addSuffix(tempText, true);
                        break;
                    case LOADTYPE.list_base_postload:
                        finalString += 'list_base_postload' + '_' + res + '_' + lang + '.json",<br>';
                        finalString += '"src": [<br>';
                        tempText = Constants.PATH_PREFIX + "common/postload/baseGame/";
                        finalString += this.addSuffix(tempText);
                        tempText = Constants.PATH_PREFIX + res + "/postload/baseGame/";
                        finalString += this.addSuffix(tempText, true);
                        break;
                    case LOADTYPE.list_free:
                        finalString += 'list_free' + '_' + res + '_' + lang + '.json",<br>';
                        finalString += '"src": [<br>';
                        tempText = Constants.PATH_PREFIX + res + "/postload/freegame/";
                        finalString += this.addSuffix(tempText, true);
                        break;
                    case LOADTYPE.list_info:
                        finalString += 'list_info' + '_' + res + '_' + lang + '.json",<br>';
                        finalString += '"src": [<br>';
                        tempText = Constants.PATH_PREFIX + res + "/postload/paytable/";
                        finalString += this.addSuffix(tempText, true);
                        break;
                    default:
                        break;
                }
            }
            else {
                switch (loadType) {
                    case LOADTYPE.list_base:
                        finalString += 'list_base' + '_' + res + '_' + lang + '.json",<br>';
                        finalString += '"src": [<br>';
                        tempText = Constants.PATH_PREFIX + "common/preload/other/";
                        finalString += this.addSuffix(tempText);
                        tempText = Constants.PATH_PREFIX + "common/preload/lang/" + lang + "/";
                        finalString += this.addSuffix(tempText);
                        tempText = Constants.PATH_PREFIX + res + "/preload/other/";
                        finalString += this.addSuffix(tempText);
                        tempText = Constants.PATH_PREFIX + res + "/preload/lang/" + lang + "/";
                        finalString += this.addSuffix(tempText, true);
                        break;
                    case LOADTYPE.list_base_postload:
                        finalString += 'list_base_postload' + '_' + res + '_' + lang + '.json",<br>';
                        finalString += '"src": [<br>';
                        tempText = Constants.PATH_PREFIX + "common/postload/baseGame/other/";
                        finalString += this.addSuffix(tempText);
                        tempText = Constants.PATH_PREFIX + "common/postload/baseGame/lang/" + lang + "/";
                        finalString += this.addSuffix(tempText);
                        tempText = Constants.PATH_PREFIX + res + "/postload/baseGame/other/";
                        finalString += this.addSuffix(tempText);
                        tempText = Constants.PATH_PREFIX + res + "/postload/baseGame/lang/" + lang + "/";
                        finalString += this.addSuffix(tempText, true);
                        break;
                    case LOADTYPE.list_free:
                        finalString += 'list_free' + '_' + res + '_' + lang + '.json",<br>';
                        finalString += '"src": [<br>';
                        tempText = Constants.PATH_PREFIX + res + "/postload/freegame/other/";
                        finalString += this.addSuffix(tempText);
                        tempText = Constants.PATH_PREFIX + res + "/postload/freegame/lang/" + lang + "/";
                        finalString += this.addSuffix(tempText, true);
                        break;
                    case LOADTYPE.list_info:
                        finalString += 'list_info' + '_' + res + '_' + lang + '.json",<br>';
                        finalString += '"src": [<br>';
                        tempText = Constants.PATH_PREFIX + res + "/postload/paytable/other/";
                        finalString += this.addSuffix(tempText);
                        tempText = Constants.PATH_PREFIX + res + "/postload/paytable/lang/" + lang + "/";
                        finalString += this.addSuffix(tempText, true);
                        break;
                    default:
                        break;
                }
            }

            finalString += "],<br>";
            finalString += '"cwd": "<%= assetsDir %>"<br>},<br>';
            return finalString;
        }

        /**
         * Appends file type extension suffix.
         * Ex: abc -> "abc.png",
         * @param text 
         * @param htmlText 
         * @param skipComma whether to skip comma append at the end 
         */
        private addSuffix(text: string, skipComma: boolean = false): string {
            let tempText: string = "";
            Constants.FILE_TYPE_SUFFIX.forEach((suffix: string) => {
                tempText += '"' + text + suffix + '",<br>';
            });
            if (skipComma) {
                tempText = tempText.replace(/,<br>$/, "<br>");
            }
            return tempText;
        }

        private generateListManifestConfig(): void {
            let htmlText: string = "";

            if (!Constants.LANG.length) {
                Constants.RESOLUTIONS.forEach((res: string, resIndex: number) => {
                    Constants.LOAD_TYPE_ARRAY.forEach((loadType: LOADTYPE) => {
                        htmlText += this.getListManifest(undefined, res, loadType);
                    });
                });
            }

            Constants.LANG.forEach((lang: string, langIndex: number) => {
                Constants.RESOLUTIONS.forEach((res: string, resIndex: number) => {
                    Constants.LOAD_TYPE_ARRAY.forEach((loadType: LOADTYPE) => {
                        htmlText += this.getListManifest(lang, res, loadType);
                    });
                });
            });
            // remove the last comma "," (if any)
            htmlText = htmlText.replace(/,<br>$/, "<br>");
            htmlText = '"files": [<br>' + htmlText + ']';
            outputDiv.innerHTML = htmlText;
        }

        private getListManifest(lang: string | undefined, res: string, loadType: LOADTYPE): string {
            let tempText: string = "";
            tempText += "{<br>";

            let currLoadType: string = "";
            switch (loadType) {
                case LOADTYPE.list_base:
                    currLoadType = "list_base";
                    break;
                case LOADTYPE.list_base_postload:
                    currLoadType = "list_base_postload";
                    break;
                case LOADTYPE.list_free:
                    currLoadType = "list_free";
                    break;
                case LOADTYPE.list_info:
                    currLoadType = "list_info";
                    break;
                default:
                    break;
            };
            currLoadType += "_";
            if (lang === undefined || lang === null) {
                tempText += '"dest": "' + Constants.ASSET_DEST_DIR + 'manifest/' + currLoadType + res + '.json",<br>';
                tempText += '"src": "' + Constants.ASSET_DIR + 'manifest/' + currLoadType + res + '.json"<br>';
            }
            else {
                tempText += '"dest": "' + Constants.ASSET_DEST_DIR + 'manifest/' + currLoadType + res + '_' + lang + '.json",<br>';
                tempText += '"src": "' + Constants.ASSET_DIR + 'manifest/' + currLoadType + res + '_' + lang + '.json"<br>';
            }

            tempText += "},<br>";
            return tempText;
        }
    }
}
