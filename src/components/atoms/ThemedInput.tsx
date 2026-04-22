import { StyleSheet, TextInput, type TextInputProps } from "react-native";

export type ThemedInputVariant = "default" | "textarea"; // default = short text

export type ThemedInputProps = TextInputProps & {
    variant?: ThemedInputVariant;
    error?: boolean;
}

export function ThemedInput({ variant = "default", error = false, ...props }: ThemedInputProps) {
    return (
        <TextInput
        style = {[
            styles.input, 
            error && styles.inputError
        ]}
        multiline = {variant === "textarea"}
        numberOfLines = {variant === "textarea" ? 4 : 1}
        {...props}

        />

    );

}

const styles = StyleSheet.create({
    input:{
        width: "100%",
        borderWidth: 1,
        borderColor: "#7F6E42",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
        color: "#33232C",
        backgroundColor: "#FFFFFF",
    },
    inputError: {
        borderColor: "#EE5237",

    },

});