import { createContext, useState } from 'react'
import { Options } from 'browser-image-compression';

export const ConfigurationContext = createContext<any>(null);

type ConfigurationOptions = Options & {
    isDrawerOpened: boolean;
}

export default function ConfigurationContextApi({ children }) {

    const [config, setConfig] = useState<ConfigurationOptions>({
        isDrawerOpened: false,
        maxSizeMB: 1,
        fileType: null,
        useWebWorker: true,
        initialQuality: 80,
        alwaysKeepResolution: true,
    });

    return (
        <ConfigurationContext.Provider value={{ config, setConfig }}>
            {children}
        </ConfigurationContext.Provider>
    )
}
