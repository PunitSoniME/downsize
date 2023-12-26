import { useContext } from 'react'
import { Button, Grid } from '@mantine/core';
import useCompress from './../../hooks/useCompress';
import { ConfigurationContext } from './../../Context/ConfigurationContext';
import { ImagesContext } from './../../Context/ImagesContext';
import FileSaver from 'file-saver';
import JSZip from 'jszip';

export default function MidOptions() {

    const { compressAll } = useCompress();
    const configContext = useContext(ConfigurationContext);
    const imagesContext = useContext(ImagesContext);

    return (
        <>
            {
                imagesContext.images.length > 0 ? <Grid id="scroll-to-view">
                    <Grid.Col span={4}>
                        {/* <Button
                            fullWidth
                            variant='light'
                            onClick={() => {
                                configContext.setConfig((prevState) => {
                                    return { ...prevState, isDrawerOpened: !prevState.isDrawerOpened }
                                })
                            }}
                        >
                            Configuration
                        </Button> */}

                        <Button
                            fullWidth
                            disabled={imagesContext.images.length === 0}
                            onClick={() => {
                                compressAll();
                            }}
                        >
                            Compress
                        </Button>

                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Button
                            fullWidth
                            disabled={imagesContext.images.length === 0 || imagesContext.images.some(s => s.isProcessed === false)}
                            onClick={() => {
                                const zip = new JSZip();

                                imagesContext.images.forEach(f => {
                                    zip.file(`downsized-${f.id}-${f.compressedFile.name}`, f.compressedFile, { base64: true });
                                });

                                zip.generateAsync({ type: "blob" }).then(function (content) {
                                    FileSaver.saveAs(content, "downsized.zip");
                                });
                            }}>
                            Download Zip
                        </Button>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Button
                            fullWidth
                            color="red"
                            variant="outline"
                            disabled={imagesContext.images.length === 0}
                            onClick={() => {
                                imagesContext.setImages([]);
                            }}>
                            Delete All
                        </Button>
                    </Grid.Col>

                </Grid> : ""
            }
        </>
    )
}
