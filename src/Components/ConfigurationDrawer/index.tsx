import { Text, Slider, Drawer, Stack } from '@mantine/core'
import { useContext, useEffect } from 'react';
import { ConfigurationContext } from '../../Context/ConfigurationContext';
import { useDisclosure } from '@mantine/hooks';
import { ImagesContext } from '../../Context/ImagesContext';
import useCompress from '../../hooks/useCompress';

export default function ConfigurationDrawer() {

  const { compressAll } = useCompress();
  const configContext = useContext(ConfigurationContext);
  const imagesContext = useContext(ImagesContext);

  const { isDrawerOpened, initialQuality } = configContext.config;

  const [opened, { open, close }] = useDisclosure(isDrawerOpened);

  useEffect(() => {
    isDrawerOpened ? open() : close();
  }, [isDrawerOpened]);

  const updateImagesList = (property, value) => {
    imagesContext.setImages(prevState => {
      const newValues = prevState.map(m => { return { ...m, options: { ...m.options, [property]: value } } });
      return newValues;
    });
  }

  return (
    <Drawer
      size="xs"
      position="right"
      title="Default Configuration"
      opened={opened}
      withCloseButton={false}
      onClose={() => {
        configContext.setConfig(prevState => {
          return { ...prevState, isDrawerOpened: !prevState.isDrawerOpened }
        });

        if (imagesContext.images.length > 0) compressAll();
        close();
      }}
    >

      <Stack gap={26} mt={6}>
        {/* <Select
          value={fileType}
          label="File Type"
          placeholder="Select File Type"
          data={['Default', '.jpg', '.png', '.gif', 'webp', 'avif']}
          onChange={(selected) => {
            configContext.setConfig((prevState) => {
              return {
                ...prevState,
                fileType: selected
              }
            })
          }}
        /> */}

        {/* <Switch
          checked={alwaysKeepResolution}
          onChange={(event) => {
            const value = event.currentTarget.checked;

            configContext.setConfig((prevState) => {
              return {
                ...prevState,
                alwaysKeepResolution: value
              }
            });
            updateImagesList('alwaysKeepResolution', value);
          }}
          label="Keep default resolution ?"
        /> */}

        <div>
          <Text size="sm" fw={600} mb={8}>Quality</Text>
          <Slider
            defaultValue={initialQuality}
            value={initialQuality}
            color="blue"
            size="sm"
            onChange={(value) => {
              configContext.setConfig((prevState) => {
                return {
                  ...prevState,
                  initialQuality: value
                }
              });
              updateImagesList('initialQuality', value);
            }}
            min={50}
            marks={[
              { value: 60, label: '60%' },
              { value: 70, label: '70%' },
              { value: 80, label: '80%' },
              { value: 90, label: '90%' },
            ]}
          />
        </div>

      </Stack>

    </Drawer>
  )
}
