import { useDisclosure } from "@mantine/hooks";
import { SupportContext } from "../../Context/SupportContext";
import { useContext, useEffect } from "react";
import { ActionIcon, Button, Divider, Group, Modal, Stack, Title, Tooltip } from "@mantine/core";
import { BsGithub, BsTwitterX } from "react-icons/bs";

export default function Support() {

    const supportContext = useContext(SupportContext);

    const [opened, { close, open }] = useDisclosure(supportContext.open);

    useEffect(() => {
        supportContext.open ? open() : close();
    }, [supportContext.open]);

    return (
        <Modal
            withCloseButton={false}
            centered
            opened={opened}
            onClose={() => {
                supportContext.setOpen(false);
            }}
        >
            <Stack gap={8}>

                <Group gap={8}>
                    <Title order={5} fw={500}>
                        Follow me on
                    </Title>

                    <Tooltip label="Github">
                        <ActionIcon size="sm" variant="transparent" onClick={() => {
                            window.open('https://github.com/punitsonime', '_target')
                        }}>
                            <BsGithub style={{ height: 18, width: 18 }} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Twitter ( X )">
                        <ActionIcon size="sm" variant="transparent" onClick={() => {
                            window.open('https://twitter.com/punitsonime', '_target')
                        }}>
                            <BsTwitterX style={{ height: 16, width: 16 }} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Stack>

            <Divider my={12} />

            <Title order={5} fw={500}>
                Support me on <Button px={5} variant="transparent" onClick={() => {
                    window.open('https://patreon.com/PunitSoniME', '_target')
                }}>
                    Patreon
                </Button>
            </Title>

        </Modal>
    )
}
