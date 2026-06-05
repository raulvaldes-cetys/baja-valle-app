import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

import { ThemedText } from "./ThemedText";

export type ThemedButtonVariant = "default" | "ghost" | "primary" | "pill";

export type ThemedButtonProps = TouchableOpacityProps & {
    variant?: ThemedButtonVariant;
    children: string;
};

export function ThemedButton({ variant = "default", children, className, ...props }: ThemedButtonProps) {
    if (variant === "pill") {
        return (
            <TouchableOpacity
                className={`items-center rounded-full py-2.5 ${props.disabled ? "bg-white/40" : "bg-white"} ${className ?? ""}`}
                {...props}
            >
                <ThemedText
                    weight="bold"
                    className="text-sm tracking-widest"
                    style={{ color: props.disabled ? "rgba(81,36,50,0.45)" : "#512432" }}
                >
                    {children}
                </ThemedText>
            </TouchableOpacity>
        );
    }

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
            <TouchableOpacity
                className={`items-center rounded-lg px-14 py-2 mx-4 ${props.disabled ? "bg-[#F5F5EC]/50" : "bg-[#F5F5EC]"}`}
                {...props}
            >
                <ThemedText weight="bold" className={`text-base tracking-widest ${props.disabled ? "text-[#7F6E42]/50" : "text-[#7F6E42]"}`}>
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
