import { useContext } from "react";
import { ModalContext } from "../context/modalContext";

export function UseHandleModal(){
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useHandleModal must be used within a ModalProvider');
    }
    return context;
}