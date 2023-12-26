import { Options } from "browser-image-compression";

type Image = {
    show: boolean;
    originalFile: File;
    originalFileUrl: string;
    compressedFile: File;
    compressedFileUrl: string;
    options: Options;
}

export default Image;