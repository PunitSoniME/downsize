import { lazy, useState, Suspense } from 'react';
import Image from './types/Image';
import './App.css'
import { Container, Stack } from '@mantine/core';

const ImageUpload = lazy(() => import('./Components/ImageUpload'));
const CompressedList = lazy(() => import('./Components/CompressedList'));
const Features = lazy(() => import('./Components/Features'));
const CustomHeader = lazy(() => import('./Components/CustomHeader'));

function App() {

  const [result, setResult] = useState<Image[]>([]);

  return (
    <>
      <Suspense fallback={<></>}>
        <CustomHeader />
      </Suspense>

      <Container size="lg">

        <Stack gap={12} mt={32}>

          <Suspense fallback={<></>}>
            <ImageUpload uploadedFiles={(files: Image[]) => {
              setResult(prevState => {
                return [...prevState, ...files];
              });
            }} />
          </Suspense>

          <Suspense fallback={<></>}>
            <CompressedList files={result} />
          </Suspense>

          <Suspense fallback={<></>}>
            <Features />
          </Suspense>

        </Stack>
      </Container>

    </>
  )
}

export default App
