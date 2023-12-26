import { Fragment } from 'react'
import { Image, Grid } from '@mantine/core'

export default function CompressedList({
    files
}) {
    return (
        <Grid>
            {
                files.map((res, index) => {
                    return <Fragment key={index}>
                        <Grid.Col span={6}>
                            {
                                res.originalFileUrl
                                    ? <Image src={res.originalFileUrl} alt={res.originalFile.name} className="h-full" />
                                    : ""
                            }
                            <p>{res.originalFile.size}</p>
                        </Grid.Col>

                        <Grid.Col span={6}>
                            {
                                res.compressedFileUrl
                                    ? <Image src={res.compressedFileUrl} alt={res.compressedFile.name} className="h-full" />
                                    : ""
                            }
                            <p>{res.compressedFile.size}</p>
                        </Grid.Col>

                    </Fragment>
                })
            }

        </Grid>
    )
}
