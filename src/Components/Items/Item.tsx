import { useContext, useState } from 'react'
import { Image, Grid, Stack, Text, Paper, Group, Loader, ActionIcon, rem, Tooltip, Slider, Button } from '@mantine/core'
import { getFileSizeInKb } from '../../utils';
import { GoArrowDownRight } from "react-icons/go";
import { FaArrowRight, FaTimes } from 'react-icons/fa';
import FileSaver from 'file-saver';
import { BiSolidDownload } from "react-icons/bi";
import useCompress from '../../hooks/useCompress';

import classes from './Items.module.css';
import { ImagesContext } from '../../Context/ImagesContext';

export default function Item({ index, image }) {

    const [item, setItem] = useState({ ...image });
    const imagesContext = useContext(ImagesContext);
    const { compressImage } = useCompress();

    return (
        <Paper
            key={item.id}
            withBorder
            p="md"
            radius="sm"
            className={classes.custom_paper}
        >
            <Grid grow>

                <Grid.Col span={{
                    base: 3,
                    xs: 2
                }}>
                    <Image
                        radius="sm"
                        src={item.originalFileUrl}
                        alt={item.originalFile.name}
                        fit="contain"
                    />
                </Grid.Col>

                <Grid.Col
                    span={{
                        base: 7,
                        xs: 8
                    }}>

                    <div
                        id={item.id}
                        style={{
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                        }}>
                        <Loader />
                    </div>

                    <Stack gap={12} justify='space-between' id={`compressed-card-${item.id}`}>

                        <Group align="flex-end" gap="xs">
                            <Text className={classes.value}>
                                {getFileSizeInKb(item.originalFile.size)}
                                
                                {' '}<FaArrowRight size={12} />{' '}

                                {
                                    item.isProcessed === true ? getFileSizeInKb(item.compressedFile.size) : <Button onClick={() => {
                                        compressImage(index, item.options);
                                    }} size="xs">Compress</Button>
                                }
                            </Text>
                            {
                                item.isProcessed ? <Text c='teal' fz="sm" fw={500} className={classes.diff}>
                                    <span>
                                        {100 - (Math.round((item.compressedFile.size / item.originalFile.size) * 100))}%
                                    </span>
                                    <GoArrowDownRight size="1rem" stroke={1.5} />
                                </Text> : ""
                            }
                        </Group>

                        <Grid>
                            <Grid.Col span={{
                                base: 12,
                                md: 6
                            }}>
                                <Text size="sm" fw={500} mb={4}>Quality</Text>
                                <Slider
                                    value={item.options.initialQuality}
                                    color="blue"
                                    size="sm"
                                    onChange={(value) => {

                                        setItem(prevState => {
                                            prevState.options.initialQuality = value;
                                            return { ...prevState };
                                        });

                                    }}
                                    onChangeEnd={(value) => {
                                        const newOptions = {
                                            ...item.options,
                                            initialQuality: value
                                        }
                                        compressImage(index, newOptions);
                                    }}
                                    min={50}
                                    marks={[
                                        { value: 50, label: '50%' },
                                        { value: 60, label: '60%' },
                                        { value: 70, label: '70%' },
                                        { value: 80, label: '80%' },
                                        { value: 90, label: '90%' },
                                        { value: 100, label: '100%' },
                                    ]}
                                />
                            </Grid.Col>
                        </Grid>

                    </Stack>

                </Grid.Col>

                <Grid.Col
                    span={{
                        base: 2,
                        xs: 2
                    }}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>

                    <Stack justify='space-between'>
                        <Tooltip label="Delete">
                            <ActionIcon variant='outline' color="red" onClick={() => {
                                imagesContext.setImages(prevState => {
                                    return prevState.filter(f => f.id !== item.id)
                                });
                            }}>
                                <FaTimes style={{ height: rem(18), width: rem(18) }} />
                            </ActionIcon>
                        </Tooltip>

                        {
                            item.isProcessed ? <Tooltip label="Download">
                                <ActionIcon onClick={() => {
                                    FileSaver.saveAs(item.compressedFileUrl, `downsized-${item.id}-${item.compressedFile.name}`);
                                }}>
                                    <BiSolidDownload style={{ height: rem(18), width: rem(18) }} />
                                </ActionIcon>
                            </Tooltip>
                                : ""
                        }
                    </Stack>

                </Grid.Col>

            </Grid>
        </Paper>
    )
}
