import { type SubmitMessage } from "@/hooks/use-submit-message";
import { ThemedText } from "./ThemedText";

export default function FormMessage({ message }: { message: SubmitMessage | null }) {
    if (!message) return null;

    return (
        <ThemedText weight="regular" className={`text-sm text-center ${message.isError ? "text-[#A43F32]" : "text-[#4C7A3D]"}`}>
            {message.text}
        </ThemedText>
    );
}
