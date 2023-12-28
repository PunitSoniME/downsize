import { Container, Group, Tooltip, rem, ActionIcon, Text } from '@mantine/core';
import { appName } from '../../utils';
import { FaRegHandshake } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { useContext } from 'react';
import { ConfigurationContext } from '../../Context/ConfigurationContext';
import { MdPhotoSizeSelectLarge } from 'react-icons/md';
import classes from './CustomHeader.module.css';
import { SupportContext } from '../../Context/SupportContext';

const iconHeight = 20;
const iconWidth = 20;

export default function CustomHeader() {
    
    const supportContext = useContext(SupportContext);
    const configContext = useContext(ConfigurationContext);

    const items = [
        {
            icon: <IoSettingsOutline style={{ height: rem(iconHeight), width: rem(iconWidth) }} />,
            label: 'Configuration',
            action: () => {
                configContext.setConfig((prevState) => {
                    return { ...prevState, isDrawerOpened: !prevState.isDrawerOpened }
                })
            }
        },
        {
            icon: <FaRegHandshake style={{ height: rem(iconHeight), width: rem(iconWidth) }} />,
            label: 'Support',
            action: () => {
                supportContext.setOpen(true);
            }
        },
    ].map((link) => (
        <Tooltip label={link.label} key={link.label}>
            <ActionIcon
                size="lg"
                variant='outline'
                onClick={(event) => {
                    event.preventDefault();
                    link.action();
                }}
            >
                {link.icon}
            </ActionIcon>
        </Tooltip>
    ));

    return (
        <header className={classes.header}>
            <Container size="lg" className={classes.inner}>

                <Group gap={8}>
                    <MdPhotoSizeSelectLarge style={{ padding: 0, width: rem(32), height: rem(32), color: 'var(--mantine-color-blue-6)' }} />
                    <Text fz="lg" fw="bold" c="blue">{appName}</Text>
                </Group>

                <Group gap={10}>
                    {items}
                </Group>

            </Container>
        </header>
    );
}