import { Title, SimpleGrid, Text, Button, Grid, Paper } from '@mantine/core';
// import { IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons-react';
import classes from './Features.module.css';
import { appName } from '../../utils';

const features = [
    {
        title: 'Faster Website Loading Times',
        description: `Significantly reduce image file sizes for quicker loading times, improving user experience and SEO rankings.`,
    },
    {
        title: 'Bandwidth Savings',
        description: `Optimize images to use less bandwidth, leading to reduced data transfer costs for both you and your users.`,
    },
    {
        title: 'Improved User Experience',
        description: `Enhance the overall browsing experience by delivering visually appealing content without compromising quality.`,
    },
    {
        title: 'Higher Conversion Rates',
        description: `Faster loading times often lead to higher conversion rates, as users are more likely to stay engaged and complete desired actions.`,
    },
    // {
    //     title: 'Mobile Optimization',
    //     description: `Tailor images for different devices, ensuring a seamless experience on smartphones, tablets, and desktops.`,
    // },
    // {
    //     title: 'Storage Efficiency',
    //     description: `Save server storage space by compressing images, which is particularly valuable if you have limited hosting resources.`,
    // },
    // {
    //     title: 'Customization Options',
    //     description: `Allow users to convert images to different formats, meeting diverse requirements for various platforms and devices.`,
    // },
    // {
    //     title: 'Time Efficiency',
    //     description: `Streamline the image optimization process, saving time for users who can quickly compress and download images.`,
    // },

    // {
    //     title: 'SEO Boost',
    //     description: 'Improve search engine rankings with faster loading times, as search engines like Google prioritize websites that provide a better user experience.',
    // },
    // {
    //     title: 'Cost-Effective Solution',
    //     description: `Reduce costs associated with hosting and data transfer by optimizing images without sacrificing quality.`,
    // },
    // {
    //     title: 'On-Demand Downloads',
    //     description: `Enable users to download their optimized images instantly, providing a convenient and efficient workflow.`,
    // },
    // {
    //     title: 'User Empowerment',
    //     description: `Empower users to control and enhance their visuals, fostering a sense of ownership over their digital content.`,
    // },
    // {
    //     title: 'Wide Compatibility',
    //     description: `Ensure compatibility with various image formats, making it a versatile solution for different content creation needs.`,
    // },
    // {
    //     title: 'Responsive Design Support',
    //     description: `Support the creation of responsive web designs by providing optimized images for different screen sizes.`,
    // },
    // {
    //     title: 'Environmentally Friendly',
    //     description: `Reduce the carbon footprint by minimizing data transfer and energy consumption associated with serving large images.`,
    // }
]

export default function Features() {
    const items = features.map((feature) => (
        <div key={feature.title}>
            <Text fz="lg" fw={500}>
                {feature.title}
            </Text>
            <Text c="dimmed" fz="sm">
                {feature.description}
            </Text>
        </div>
    ));

    return (
        <Paper className={classes.wrapper}>
            <Grid gutter={80}>

                <Grid.Col span={{ base: 12, md: 5 }}>
                    <Title className={classes.title} order={2}>
                        Supercharge Your Website
                    </Title>
                    <Text c="dimmed">
                        Optimize, Compress: Elevate Your Content with {appName} - Delivering Peak Performance and Enhanced User Engagement!
                    </Text>

                    <Button
                        component='a'
                        href="#compress"
                        variant="gradient"
                        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
                        size="lg"
                        radius="md"
                        mt="xl"
                    >
                        Get Started
                    </Button>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 7 }}>
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
                        {items}
                    </SimpleGrid>
                </Grid.Col>

            </Grid>
        </Paper>
    );
}