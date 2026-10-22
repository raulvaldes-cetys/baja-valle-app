import { getApiErrorMessage } from "@/lib/api-error";
import { useState } from "react";

export interface SubmitMessage {
    text: string;
    isError: boolean;
}

// Ejecuta una acción de la API y guarda el mensaje de éxito o de error para mostrarlo
export default function useSubmitMessage() {
    const [message, setMessage] = useState<SubmitMessage | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function run(action: () => Promise<void>, successText?: string) {
        setIsSubmitting(true);
        setMessage(null);
        try {
            await action();
            if (successText) setMessage({ text: successText, isError: false });
            return true;
        } catch (e) {
            setMessage({ text: getApiErrorMessage(e), isError: true });
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }

    return { message, isSubmitting, run };
}
