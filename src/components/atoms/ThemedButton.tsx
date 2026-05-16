import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

import { ThemedText } from "./ThemedText";

export type ThemedButtonVariant = "default" | "ghost" | "primary";

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

    if (variant === "primary") {
        return (
             <TouchableOpacity className="items-center rounded-lg bg-[#F5F5EC] px-14 py-2 mx-4" {...props}>
            <ThemedText weight="bold" className="text-base tracking-widest text-[#7F6E42]">
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
