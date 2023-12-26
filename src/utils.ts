export const appName = 'Downsize';

export const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 9);
}

export const getFileSizeInKb = (sizeInBytes: number) => {
    return getFileSize(sizeInBytes) + ' Kb';
}

export const getFileSize = (sizeInBytes: number) => {
    return Math.floor(sizeInBytes / 1000);
}

export async function downloadImage(
    imageSrc,
    nameOfDownload = 'my-image.png',
) {
    const response = await fetch(imageSrc);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
}