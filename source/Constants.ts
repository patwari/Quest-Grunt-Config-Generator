/**
 * This file contains all the constants.
 * NOTE: to change the variables, on the run-time, remove the readonly tag, and re-generate positions.
 */

namespace monoloco.core {
    export class Constants {
        public static readonly LANG: Array<string> = ["en", "tr"];
        public static readonly RESOLUTIONS: Array<string> = ["<%= dtRes %>", "<%= hdRes %>", "<%= sdRes %>", "<%= ldRes %>"];
        // public static readonly PATH_PREFIX: string = "images";
        // public static readonly LOAD_MODE: Array<string> = ["preload", "postload"];
        public static readonly SUFFIX: Array<string> = ["**/*.json", "**/*.png", "**/*.jpg"];
    }
}
