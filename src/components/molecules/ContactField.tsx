import { View } from "react-native";
import { ThemedInput, type ThemedInputProps } from "../atoms/ThemedInput";
import { ThemedText } from "../atoms/ThemedText";

export type ContactFieldProps = ThemedInputProps & {
    label: string;
    errorMessage?: string;
    className?: string;
    light?: boolean;
}

export function ContactField({ label, errorMessage, className, light, ...props }: ContactFieldProps) {
    return (
        <View className={`w-full gap-1 ${className ?? ""}`}>
            <ThemedText weight="semibold" 
            className={`text-sm ${light ? "text-[#F0EFDF]" : "text-[#33232C]"}`}
            >
                {label} *
            </ThemedText>

            <ThemedInput error={!!errorMessage} {...props} />
            {errorMessage && (
                <ThemedText weight="regular" className="text-xs text-[#A43F32]">{errorMessage}</ThemedText>
            )}
        </View> 
    );
}
