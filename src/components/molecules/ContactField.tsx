import { View } from "react-native";
import { ThemedInput, type ThemedInputProps } from "../atoms/ThemedInput";
import { ThemedText } from "../atoms/ThemedText";

export type ContactFieldProps = ThemedInputProps & {
    label: string;
    errorMessage?: string;
}

export function ContactField({ label, errorMessage, ...props }: ContactFieldProps) {
    return (
        <View>
            <ThemedText weight="regular">{label} *</ThemedText>
            <ThemedInput error={!!errorMessage} {...props} />
            {errorMessage && (
                <ThemedText weight="regular">{errorMessage}</ThemedText>
            )}
        </View> 
    );
}
