import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

import { ThemedText } from "./ThemedText";

export type ThemedButtonVariant = "default" | "ghost";

export type ThemedButtonProps = TouchableOpacityProps & {
    variant?: ThemedButtonVariant;
    children: string;
};

export function ThemedButton({ variant = "default", children, ...props }: ThemedButtonProps) {
    if (variant === "ghost") {
        return (
            <TouchableOpacity {...props}>
                <ThemedText weight="regular" className="text-base underline">
                    {children}
                </ThemedText>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity className="items-center rounded-lg bg-blue-500 px-4 py-2" {...props}>
            <ThemedText weight="bold" className="text-base text-white">
                {children}
            </ThemedText>
        </TouchableOpacity>
    );
}
