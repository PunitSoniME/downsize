import { createContext, useState } from 'react'

export const ImagesContext = createContext<any>(null);

export default function ImagesContextApi({ children }) {

    const [images, setImages] = useState([]);

    return (
        <ImagesContext.Provider value={{ images, setImages }}>
            {children}
        </ImagesContext.Provider>
    )
}
