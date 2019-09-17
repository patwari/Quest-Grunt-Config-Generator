/**
 * This file contains all the constants.
 * NOTE: to change the variables, on the run-time, remove the readonly tag, and re-generate positions.
 */

namespace monoloco.core {
    export enum LOADTYPE {
        list_base = 0,
        list_base_postload,
        list_free,
        list_info
    }

    export class Constants {
        public static LANG: Array<string> = ["en"];
        public static RESOLUTIONS: Array<string> = ["<%= dtRes %>", "<%= hdRes %>", "<%= sdRes %>", "<%= ldRes %>"];
        public static readonly PATH_PREFIX: string = "images/";
        // public static readonly LOAD_MODE: Array<string> = ["preload", "postload"];
        public static FILE_TYPE_SUFFIX: Array<string> = ["**/*.json", "**/*.png", "**/*.jpg"];
        public static LOAD_TYPE_ARRAY: Array<LOADTYPE> = [LOADTYPE.list_base, LOADTYPE.list_base_postload, LOADTYPE.list_free, LOADTYPE.list_info];
        public static ASSET_DIR: string = "<%= assetsDir %>";
        public static ASSET_DEST_DIR: string = "<%= assetDestDir %>";
    }
}
