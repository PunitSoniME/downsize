import { Options } from "browser-image-compression";

type ImageType = {
    id: string;
    isProcessed: boolean;
    originalFile: File;
    originalFileUrl: string;
    compressedFile: File;
    compressedFileUrl: string;
    options: Options;
}

export default ImageType;