import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

import './index.css'
import ConfigurationContextApi from './Context/ConfigurationContext.tsx';
import ImagesContextApi from './Context/ImagesContext.tsx';
import DialogContextApi from './Context/DialogContext.tsx';
import SupportContextApi from './Context/SupportContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <ConfigurationContextApi>
        <ImagesContextApi>
          <DialogContextApi>
            <SupportContextApi>
              <App />
            </SupportContextApi>
          </DialogContextApi>
        </ImagesContextApi>
      </ConfigurationContextApi>
    </MantineProvider>
  </React.StrictMode>,
)
