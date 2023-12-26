import { useState } from 'react';
import { Container, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './CustomHeader.module.css';
import { CiImageOn } from 'react-icons/ci';

const links = [
    { link: '/donate', label: 'Donate' },
];

export default function CustomHeader() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <Container size="lg" className={classes.inner}>
                {/* <MantineLogo size={28} /> */}
                <CiImageOn style={{ width: rem(32), height: rem(32), color: 'var(--mantine-color-dimmed)' }} />

                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </header>
    );
}