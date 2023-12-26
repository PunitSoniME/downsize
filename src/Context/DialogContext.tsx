import { createContext, useState } from 'react'

export const DialogContext = createContext<any>(null);

export default function DialogContextApi({ children }) {

    const [dialog, setDialog] = useState({
        open: false,
        content: ''
    });

    return (
        <DialogContext.Provider value={{ dialog, setDialog }}>
            {children}
        </DialogContext.Provider>
    )
}
