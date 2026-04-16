import { Text, type TextProps } from "react-native";

export type FontWeight = "light" | "regular" | "medium" | "semibold" | "bold";

export type ThemedTextProps = TextProps & {
    weight: FontWeight;
};

export function ThemedText({weight, style, ...props}: ThemedTextProps) {
    return <Text {...props} style={[{fontFamily: fontWeight[weight]}, style]}/>;
}

const fontWeight: Record<FontWeight, string> = {
    light: "Montserrat_300Light",
    regular: "Montserrat_400Regular",
    medium: "Montserrat_500Medium",
    semibold: "Montserrat_600SemiBold",
    bold: "Montserrat_700Bold",
};