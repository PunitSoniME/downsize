import { createContext, useState } from 'react'

export const SupportContext = createContext<any>(null);

export default function SupportContextApi({ children }) {

    const [open, setOpen] = useState(false);

    return (
        <SupportContext.Provider value={{ open, setOpen }}>
            {children}
        </SupportContext.Provider>
    )
}
