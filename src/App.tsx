import { lazy, Suspense, useContext, useEffect } from 'react';
import { Container, Stack, Modal } from '@mantine/core';

import { DialogContext } from './Context/DialogContext';
import { useDisclosure } from '@mantine/hooks';

import './App.css'

const ImageUpload = lazy(() => import('./Components/ImageUpload'));
const Items = lazy(() => import('./Components/Items'));
const Features = lazy(() => import('./Components/Features'));
const CustomHeader = lazy(() => import('./Components/CustomHeader'));
const ConfigurationDrawer = lazy(() => import('./Components/ConfigurationDrawer'));
const MidOptions = lazy(() => import('./Components/MidOptions'));
const Support = lazy(() => import('./Components/Support'));

function App() {
  const dialogContext = useContext(DialogContext);

  const [opened, { close, open }] = useDisclosure(dialogContext.dialog.open);

  useEffect(() => {
    dialogContext.dialog.open ? open() : close();
  }, [dialogContext.dialog.open]);

  return (
    <>
      <Suspense fallback={<></>}>
        <CustomHeader />
      </Suspense>

      <Suspense fallback={<></>}>
        <ConfigurationDrawer />
      </Suspense>

      <Container size="lg" pb={100}>

        <Stack gap={20} mt={32}>

          <Suspense fallback={<></>}>
            <Features />
          </Suspense>

          <Suspense fallback={<></>}>
            <ImageUpload />
          </Suspense>

          <Suspense fallback={<></>}>
            <MidOptions />
          </Suspense>

          <Suspense fallback={<></>}>
            <Items />
          </Suspense>

        </Stack>

        <Modal
          centered
          opened={opened}
          title="Congratulations"
          onClose={() => {
            dialogContext.setDialog({
              open: false,
              content: ''
            });

            close();
          }}
        >
          {dialogContext.dialog.content}
        </Modal>

        <Suspense fallback={<></>}>
          <Support />
        </Suspense>

      </Container>

    </>
  )
}

export default App
