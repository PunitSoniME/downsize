import imageCompression, { Options } from 'browser-image-compression';
import Image from '../../types/Image';
import { Group, Text, rem } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { CiImageOn } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

export default function ImageUpload({
    uploadedFiles
}) {

    async function handleImageUpload(files: File[]) {

        let compressedFiles: Image[] = [];
        for await (const file of files) {

            console.log('originalFile instanceof Blob', file instanceof Blob); // true
            console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

            const options: Options = {
                // maxSizeMB: 1,
                // maxWidthOrHeight: 1920,
                useWebWorker: true,
                initialQuality: 0.6
            }
            try {
                const compressedFile = await imageCompression(file, options);
                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

                console.log('Old Size ', file.size);
                console.log('New Size ', compressedFile.size);

                compressedFiles.push({
                    show: true,
                    originalFile: file,
                    originalFileUrl: await imageCompression.getDataUrlFromFile(file),
                    compressedFile: compressedFile,
                    compressedFileUrl: await imageCompression.getDataUrlFromFile(compressedFile),
                    options: { ...options }
                });

            } catch (error) {
                console.log(error);
            }
        }

        uploadedFiles(compressedFiles);

    }

    return (
        <Dropzone
            id="compress"
            onDrop={(files) => {
                handleImageUpload(files);
            }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
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
