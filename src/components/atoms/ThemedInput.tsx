import { TextInput, type TextInputProps } from "react-native";

export type ThemedInputVariant = "default" | "textarea"; // default = short text

export type ThemedInputProps = TextInputProps & {
    variant?: ThemedInputVariant;
    error?: boolean;
}

export function ThemedInput({ variant = "default", error = false, ...props }: ThemedInputProps) {
    return (
        <TextInput
            placeholderTextColor="#B8B8B8"
            className={`w-full border rounded-lg px-4 py-2 text-sm bg-[#F5F5EC] ${error ? "border border-[#A43F32]" : "border-gray-300"}`} multiline={variant === "textarea"}
            numberOfLines={variant === "textarea" ? 4 : 1}
            {...props}

        />

    );

}
