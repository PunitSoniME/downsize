import { useContext } from 'react'
import { ImagesContext } from '../Context/ImagesContext';
import imageCompression from 'browser-image-compression';
import { generateUniqueId, getFileSizeInKb } from '../utils';
import { DialogContext } from '../Context/DialogContext';
import { Text } from '@mantine/core';

export default function useCompress() {

    const imagesContext = useContext(ImagesContext);
    const dialogContext = useContext(DialogContext);

    async function compressImage(index, options) {

        const file = imagesContext.images[index];

        try {
            const compressedFile = await imageCompression(file.originalFile, {
                ...options,
                initialQuality: options.initialQuality / 100,
            });

            const id = generateUniqueId();

            const compressed = {
                ...file,
                id: id,
                isProcessed: true,
                originalFile: file.originalFile,
                originalFileUrl: await imageCompression.getDataUrlFromFile(file.originalFile),
                compressedFile: compressedFile,
                compressedFileUrl: await imageCompression.getDataUrlFromFile(compressedFile),
                options: {
                    ...options,
                    initialQuality: options.initialQuality,
                    onProgress: (prog) => {

                        const loaderElement = document.getElementById(id);
                        const compressedCardElement = document.getElementById(`compressed-card-${id}`);
                        loaderElement.style.display = 'flex';

                        if (compressedCardElement)
                            compressedCardElement.style.display = 'none';

                        if (prog === 100) {
                            loaderElement.style.display = 'none';

                            if (compressedCardElement) {
                                setTimeout(() => {
                                    compressedCardElement.style.display = 'flex';
                                }, 150);
                            }
                        }
                    }
                }
            };

            imagesContext.setImages(prevState => {
                prevState[index] = compressed;
                return [...prevState];
            });

        } catch (error) {
            console.log(error);
        }

    }

    async function compressAll() {
        const images = [...imagesContext.images];

        for await (const index of images.keys()) {
            const file = images[index];

            try {
                const { isDrawerOpened, ...options } = file.options;

                const compressedFile = await imageCompression(file.originalFile, {
                    ...options,
                    initialQuality: options.initialQuality / 100,
                    onProgress: (prog) => {
                        const element = document.getElementById(file.id);
                        const compressedCardElement = document.getElementById(`compressed-card-${file.id}`);
                        element.style.display = 'flex';

                        if (compressedCardElement)
                            compressedCardElement.style.display = 'none';

                        if (prog === 100) {
                            element.style.display = 'none';

                            if (compressedCardElement)
                                compressedCardElement.style.display = 'flex';
                        }
                    }
                });

                images[index] = {
                    ...images[index],
                    id: generateUniqueId(),
                    isProcessed: true,
                    originalFile: file.originalFile,
                    originalFileUrl: await imageCompression.getDataUrlFromFile(file.originalFile),
                    compressedFile: compressedFile,
                    compressedFileUrl: await imageCompression.getDataUrlFromFile(compressedFile),
                    options: { ...options }
                };

            } catch (error) {
                console.log(error);
            }
        }

        imagesContext.setImages([...images]);

        const compressedFileSizes = images
            .filter(f => f.compressedFile !== null)
            .map(s => s.compressedFile.size)
            .reduce((total, current) => {
                return total + current
            }, 0);

        const originalFileSizes = images
            .map(s => s.originalFile.size)
            .reduce((total, current) => {
                return total + current
            }, 0);

        dialogContext.setDialog({
            open: true,
            content: <Text>You saved <Text component='span' c="green" fw="bold">{getFileSizeInKb(originalFileSizes - compressedFileSizes)}</Text> size</Text>
        });

    }

    return {
        compressImage,
        compressAll,
    };
}
