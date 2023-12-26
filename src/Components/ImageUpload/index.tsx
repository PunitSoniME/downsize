import imageCompression from 'browser-image-compression';
import ImageType from '../../types/ImageType';
import { Group, Text, rem } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { CiImageOn } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useContext } from 'react';
import { ImagesContext } from '../../Context/ImagesContext';
import { ConfigurationContext } from '../../Context/ConfigurationContext';
import { generateUniqueId } from '../../utils';
import classes from './ImageUpload.module.css';

export default function ImageUpload() {
    const imagesContext = useContext(ImagesContext);
    const configContext = useContext(ConfigurationContext);

    const addImages = async (files: File[]) => {

        const tempFiles: ImageType[] = [];

        for await (const file of files) {
            const id = generateUniqueId();

            tempFiles.push({
                id: id,
                isProcessed: false,
                originalFile: file,
                originalFileUrl: await imageCompression.getDataUrlFromFile(file),
                compressedFile: null,
                compressedFileUrl: null,
                options: {
                    ...configContext.config
                }
            });
        }

        imagesContext.setImages(prevState => {
            return [...prevState, ...tempFiles]
        });

        setTimeout(() => {
            document.getElementById("scroll-to-view").scrollIntoView();
        }, 500);
    }


    return (
        <Dropzone
            id="compress"
            onDrop={(files) => {
                addImages(files);
            }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            className={classes.root}
        >
            <Group justify="center" gap="xl" mih={200} style={{ pointerEvents: 'none' }}>
                <Dropzone.Accept>
                    <MdOutlineFileUpload
                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <FaTimes
                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                    />
                </Dropzone.Reject>

                <Dropzone.Idle>
                    <CiImageOn
                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                    />
                </Dropzone.Idle>

                <div>
                    <Text size="xl" inline>
                        Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                </div>
            </Group>
        </Dropzone>
    )
}
