"use strict";
/**
 * This file contains all the constants.
 * NOTE: to change the variables, on the run-time, remove the readonly tag, and re-generate positions.
 */
var monoloco;
(function (monoloco) {
    var core;
    (function (core) {
        var LOADTYPE;
        (function (LOADTYPE) {
            LOADTYPE[LOADTYPE["list_base"] = 0] = "list_base";
            LOADTYPE[LOADTYPE["list_base_postload"] = 1] = "list_base_postload";
            LOADTYPE[LOADTYPE["list_free"] = 2] = "list_free";
            LOADTYPE[LOADTYPE["list_info"] = 3] = "list_info";
        })(LOADTYPE = core.LOADTYPE || (core.LOADTYPE = {}));
        var Constants = /** @class */ (function () {
            function Constants() {
            }
            Constants.LANG = ["en"];
            Constants.RESOLUTIONS = ["<%= dtRes %>", "<%= hdRes %>", "<%= sdRes %>", "<%= ldRes %>"];
            Constants.PATH_PREFIX = "images/";
            // public static readonly LOAD_MODE: Array<string> = ["preload", "postload"];
            Constants.FILE_TYPE_SUFFIX = ["**/*.json", "**/*.png", "**/*.jpg"];
            Constants.LOAD_TYPE_ARRAY = [LOADTYPE.list_base, LOADTYPE.list_base_postload, LOADTYPE.list_free, LOADTYPE.list_info];
            Constants.ASSET_DIR = "<%= assetsDir %>";
            Constants.ASSET_DEST_DIR = "<%= assetDestDir %>";
            return Constants;
        }());
        core.Constants = Constants;
    })(core = monoloco.core || (monoloco.core = {}));
})(monoloco || (monoloco = {}));
/**
 * This file contains the help controls.
 */
var monoloco;
(function (monoloco) {
    var core;
    (function (core) {
        var HelpFile = /** @class */ (function () {
            function HelpFile() {
                this.helpButton = document.getElementById("helpButton");
                this.helpImage = document.getElementById("helpDiv");
                this.helpButton.onclick = this.onHelpButtonClicked.bind(this);
            }
            HelpFile.prototype.onHelpButtonClicked = function () {
                (core.solution) && core.solution.clearOutput();
                this.helpImage.style.display = "block";
            };
            HelpFile.prototype.undoHelp = function () {
                this.helpImage.style.display = "none";
            };
            return HelpFile;
        }());
        core.HelpFile = HelpFile;
    })(core = monoloco.core || (monoloco.core = {}));
})(monoloco || (monoloco = {}));
/**
 * This class contains all global utils here.
 * No need to keep them private when everyone needs them, right?!
 */
/**
 * This class is the brain of our project.
 * Here we generate the File Index and List Manifest objects.
 */
var monoloco;
(function (monoloco) {
    var core;
    (function (core) {
        var Solution = /** @class */ (function () {
            function Solution() {
                this.langField = document.getElementById("langField");
                this.fileindexButton = document.getElementById("fileindexButton");
                this.listManifestButton = document.getElementById("listManifestButton");
                this.fileindexButton.onclick = this.onFileIndexClicked.bind(this);
                this.listManifestButton.onclick = this.onListManifestClicked.bind(this);
            }
            Solution.prototype.onFileIndexClicked = function () {
                this.clearOutput();
                this.getUserLang();
                this.getUserResolution();
                this.getUserFileTypes();
                this.getUserLoadTypes();
                this.generateFileIndexConfig();
            };
            Solution.prototype.onListManifestClicked = function () {
                this.clearOutput();
                this.getUserLang();
                this.getUserResolution();
                this.getUserFileTypes();
                this.getUserLoadTypes();
                this.generateListManifestConfig();
            };
            /**
             * Parse user selected languages and make the LANG array ready for use.
             */
            Solution.prototype.getUserLang = function () {
                core.Constants.LANG = [];
                var langString = this.langField.value;
                var langArray = langString.split(",");
                for (var index = 0; index < langArray.length; index++) {
                    langArray[index] = langArray[index].trim();
                    if (langArray[index].length) {
                        core.Constants.LANG.push(langArray[index]);
                    }
                }
            };
            Solution.prototype.getUserResolution = function () {
                core.Constants.RESOLUTIONS = [];
                var res_desktop = document.getElementById("res_desktop");
                var res_hd = document.getElementById("res_hd");
                var res_sd = document.getElementById("res_sd");
                var res_ld = document.getElementById("res_ld");
                if (res_desktop.checked) {
                    core.Constants.RESOLUTIONS.push("<%= dtRes %>");
                }
                if (res_hd.checked) {
                    core.Constants.RESOLUTIONS.push("<%= hdRes %>");
                }
                if (res_sd.checked) {
                    core.Constants.RESOLUTIONS.push("<%= sdRes %>");
                }
                if (res_ld.checked) {
                    core.Constants.RESOLUTIONS.push("<%= ldRes %>");
                }
            };
            /**
             * Parse user selected file types and make FILE_TYPE_SUFFiX array ready for use
             */
            Solution.prototype.getUserFileTypes = function () {
                core.Constants.FILE_TYPE_SUFFIX = [];
                var type_json = document.getElementById("type_json");
                var type_png = document.getElementById("type_png");
                var type_jpg = document.getElementById("type_jpg");
                var type_atlas = document.getElementById("type_atlas");
                if (type_json.checked) {
                    core.Constants.FILE_TYPE_SUFFIX.push("**/*.json");
                }
                if (type_png.checked) {
                    core.Constants.FILE_TYPE_SUFFIX.push("**/*.png");
                }
                if (type_jpg.checked) {
                    core.Constants.FILE_TYPE_SUFFIX.push("**/*.jpg");
                }
                if (type_atlas.checked) {
                    core.Constants.FILE_TYPE_SUFFIX.push("**/*.atlas");
                }
            };
            /**
             * Parse user selected File types.
             */
            Solution.prototype.getUserLoadTypes = function () {
                core.Constants.LOAD_TYPE_ARRAY = [];
                var load_base = document.getElementById("load_base");
                var type_base_postload = document.getElementById("type_base_postload");
                var type_free = document.getElementById("type_free");
                var type_info = document.getElementById("type_info");
                if (load_base.checked) {
                    core.Constants.LOAD_TYPE_ARRAY.push(core.LOADTYPE.list_base);
                }
                if (type_base_postload.checked) {
                    core.Constants.LOAD_TYPE_ARRAY.push(core.LOADTYPE.list_base_postload);
                }
                if (type_free.checked) {
                    core.Constants.LOAD_TYPE_ARRAY.push(core.LOADTYPE.list_free);
                }
                if (type_info.checked) {
                    core.Constants.LOAD_TYPE_ARRAY.push(core.LOADTYPE.list_info);
                }
            };
            /**
             * clear the output div
             */
            Solution.prototype.clearOutput = function () {
                core.outputDiv.innerHTML = "";
                (core.helpFile) && core.helpFile.undoHelp();
            };
            /**
             * This function generates the File Index objects.
             */
            Solution.prototype.generateFileIndexConfig = function () {
                var _this = this;
                var htmlText = "";
                if (!core.Constants.LANG.length) {
                    // TODO:  handle later when no language given
                    core.Constants.RESOLUTIONS.forEach(function (res, resIndex) {
                        core.Constants.LOAD_TYPE_ARRAY.forEach(function (loadType) {
                            htmlText += _this.getFileIndex(undefined, res, loadType);
                        });
                    });
                }
                core.Constants.LANG.forEach(function (lang, langIndex) {
                    core.Constants.RESOLUTIONS.forEach(function (res, resIndex) {
                        core.Constants.LOAD_TYPE_ARRAY.forEach(function (loadType) {
                            htmlText += _this.getFileIndex(lang, res, loadType);
                        });
                    });
                });
                // remove the last comma "," (if any)
                htmlText = htmlText.replace(/,<br>$/, "<br>");
                htmlText = '"files": [<br>' + htmlText + ']';
                core.outputDiv.innerHTML = htmlText;
            };
            /**
             * Generates individual objects string for provided configurations
             * @param lang Language
             * @param res Resolution
             * @param loadType
             * @returns {string} the final object string
             */
            Solution.prototype.getFileIndex = function (lang, res, loadType) {
                var tempText = "";
                var finalString = "";
                finalString += "{<br>";
                finalString += '"dest": ' + '"<%= assetsDir %>manifest/';
                if (lang === undefined || lang === null) {
                    switch (loadType) {
                        case core.LOADTYPE.list_base:
                            finalString += 'list_base' + '_' + res + '.json",<br>';
                            finalString += '"src": [<br>';
                            tempText = core.Constants.PATH_PREFIX + "common/preload/";
                            finalString += this.addSuffix(tempText);
                            tempText = core.Constants.PATH_PREFIX + res + "/preload/";
                            finalString += this.addSuffix(tempText, true);
                            break;
                        case core.LOADTYPE.list_base_postload:
                            finalString += 'list_base_postload' + '_' + res + '_' + lang + '.json",<br>';
                            finalString += '"src": [<br>';
                            tempText = core.Constants.PATH_PREFIX + "common/postload/baseGame/";
                            finalString += this.addSuffix(tempText);
                            tempText = core.Constants.PATH_PREFIX + res + "/postload/baseGame/";
                            finalString += this.addSuffix(tempText, true);
                            break;
                        case core.LOADTYPE.list_free:
                            finalString += 'list_free' + '_' + res + '_' + lang + '.json",<br>';
                            finalString += '"src": [<br>';
                            tempText = core.Constants.PATH_PREFIX + res + "/postload/freegame/";
                            finalString += this.addSuffix(tempText, true);
                            break;
                        case core.LOADTYPE.list_info:
                            finalString += 'list_info' + '_' + res + '_' + lang + '.json",<br>';
                            finalString += '"src": [<br>';
                            tempText = core.Constants.PATH_PREFIX + res + "/postload/paytable/";
                            finalString += this.addSuffix(tempText, true);
                            break;
                        default:
                            break;
                    }
                }
                else {
                    switch (loadType) {
                        case core.LOADTYPE.list_base:
                            finalString += 'list_base' + '_' + res + '_' + lang + '.json",<br>';
                            finalString += '"src": [<br>';
                            tempText = core.Constants.PATH_PREFIX + "common/preload/other/";
                            finalString += this.addSuffix(tempText);
                            tempText = core.Constants.PATH_PREFIX + "common/preload/lang/" + lang + "/";
                            finalString += this.addSuffix(tempText);
                            tempText = core.Constants.PATH_PREFIX + res + "/preload/other/";
                            finalString += this.addSuffix(tempText);
                            tempText = core.Constants.PATH_PREFIX + res + "/preload/lang/" + lang + "/";
                            finalString += this.addSuffix(tempText, true);
                            break;
                        case core.LOADTYPE.list_base_postload:
                            finalString += 'list_base_postload' + '_' + res + '_' + lang + '.json",<br>';
                            finalString += '"src": [<br>';
                            tempText = core.Constants.PATH_PREFIX + "common/postload/baseGame/other/";
                            finalString += this.addSuffix(tempText);
                            tempText = core.Constants.PATH_PREFIX + "common/postload/baseGame/lang/" + lang + "/";
                            finalString += this.addSuffix(tempText);
                            tempText = core.Constants.PATH_PREFIX + res + "/postload/baseGame/other/";
                            finalString += this.addSuffix(tempText);
                            tempText = core.Constants.PATH_PREFIX + res + "/postload/baseGame/lang/" + lang + "/";
                            finalString += this.addSuffix(tempText, true);
                            break;
                        case core.LOADTYPE.list_free:
                            finalString += 'list_free' + '_' + res + '_' + lang + '.json",<br>';
                            finalString += '"src": [<br>';
                            tempText = core.Constants.PATH_PREFIX + res + "/postload/freegame/other/";
                            finalString += this.addSuffix(tempText);
                            tempText = core.Constants.PATH_PREFIX + res + "/postload/freegame/lang/" + lang + "/";
                            finalString += this.addSuffix(tempText, true);
                            break;
                        case core.LOADTYPE.list_info:
                            finalString += 'list_info' + '_' + res + '_' + lang + '.json",<br>';
                            finalString += '"src": [<br>';
                            tempText = core.Constants.PATH_PREFIX + res + "/postload/paytable/other/";
                            finalString += this.addSuffix(tempText);
                            tempText = core.Constants.PATH_PREFIX + res + "/postload/paytable/lang/" + lang + "/";
                            finalString += this.addSuffix(tempText, true);
                            break;
                        default:
                            break;
                    }
                }
                finalString += "],<br>";
                finalString += '"cwd": "<%= assetsDir %>"<br>},<br>';
                return finalString;
            };
            /**
             * Appends file type extension suffix.
             * Ex: abc -> "abc.png",
             * @param text
             * @param htmlText
             * @param skipComma whether to skip comma append at the end
             */
            Solution.prototype.addSuffix = function (text, skipComma) {
                if (skipComma === void 0) { skipComma = false; }
                var tempText = "";
                core.Constants.FILE_TYPE_SUFFIX.forEach(function (suffix) {
                    tempText += '"' + text + suffix + '",<br>';
                });
                if (skipComma) {
                    tempText = tempText.replace(/,<br>$/, "<br>");
                }
                return tempText;
            };
            Solution.prototype.generateListManifestConfig = function () {
                var _this = this;
                var htmlText = "";
                if (!core.Constants.LANG.length) {
                    core.Constants.RESOLUTIONS.forEach(function (res, resIndex) {
                        core.Constants.LOAD_TYPE_ARRAY.forEach(function (loadType) {
                            htmlText += _this.getListManifest(undefined, res, loadType);
                        });
                    });
                }
                core.Constants.LANG.forEach(function (lang, langIndex) {
                    core.Constants.RESOLUTIONS.forEach(function (res, resIndex) {
                        core.Constants.LOAD_TYPE_ARRAY.forEach(function (loadType) {
                            htmlText += _this.getListManifest(lang, res, loadType);
                        });
                    });
                });
                // remove the last comma "," (if any)
                htmlText = htmlText.replace(/,<br>$/, "<br>");
                htmlText = '"files": [<br>' + htmlText + ']';
                core.outputDiv.innerHTML = htmlText;
            };
            Solution.prototype.getListManifest = function (lang, res, loadType) {
                var tempText = "";
                tempText += "{<br>";
                var currLoadType = "";
                switch (loadType) {
                    case core.LOADTYPE.list_base:
                        currLoadType = "list_base";
                        break;
                    case core.LOADTYPE.list_base_postload:
                        currLoadType = "list_base_postload";
                        break;
                    case core.LOADTYPE.list_free:
                        currLoadType = "list_free";
                        break;
                    case core.LOADTYPE.list_info:
                        currLoadType = "list_info";
                        break;
                    default:
                        break;
                }
                ;
                currLoadType += "_";
                if (lang === undefined || lang === null) {
                    tempText += '"dest": "' + core.Constants.ASSET_DEST_DIR + 'manifest/' + currLoadType + res + '.json",<br>';
                    tempText += '"src": "' + core.Constants.ASSET_DIR + 'manifest/' + currLoadType + res + '.json"<br>';
                }
                else {
                    tempText += '"dest": "' + core.Constants.ASSET_DEST_DIR + 'manifest/' + currLoadType + res + '_' + lang + '.json",<br>';
                    tempText += '"src": "' + core.Constants.ASSET_DIR + 'manifest/' + currLoadType + res + '_' + lang + '.json"<br>';
                }
                tempText += "},<br>";
                return tempText;
            };
            return Solution;
        }());
        core.Solution = Solution;
    })(core = monoloco.core || (monoloco.core = {}));
})(monoloco || (monoloco = {}));
/// <reference path="Constants.ts" />
/// <reference path="Utils.ts" />
/// <reference path="HelpFile.ts" />
/// <reference path="Solution.ts" />
/**
 * use this file to specify the compile order.
 */
/// <reference path="Interfaces.ts" />
/**
 * This file is the entry point of this project.
 * Declare all initial variables here, instantiate classes, and call relevant functions.
 */
var monoloco;
(function (monoloco) {
    var core;
    (function (core) {
        core.outputDiv = document.getElementById("outputDiv");
        core.helpFile = new core.HelpFile();
        core.solution = new core.Solution();
    })(core = monoloco.core || (monoloco.core = {}));
})(monoloco || (monoloco = {}));
