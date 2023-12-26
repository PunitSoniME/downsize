import { useContext } from 'react';
import { Stack } from '@mantine/core'
import { ImagesContext } from '../../Context/ImagesContext';
import ImageType from '../../types/ImageType';

import Item from './Item';

export default function Items() {
    
    const imagesContext = useContext(ImagesContext);

    return (
        <Stack gap={20}>
            {
                imagesContext.images.map((image: ImageType, index: number) => {
                    return <Item key={image.id} image={image} index={index} />
                })
            }
        </Stack>
    )
}
