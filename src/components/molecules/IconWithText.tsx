import { TouchableOpacity } from "react-native";
import { Icon, type IconProps } from "../atoms/Icon";
import { ThemedText } from "../atoms/ThemedText";

export type IconWithTextProps = IconProps & {
    label: string;
    className?: string;
    onPress?: () => void;
}

export function IconWithText({ name, label, className, onPress, ...props }: IconWithTextProps) {
    return (
        <TouchableOpacity 
            className={`items-center gap-2 ${className ?? ""}`}
            onPress={onPress}
        >
            <Icon name={name} {...props} />
            <ThemedText weight="light" className="text-sm text-center">{label}</ThemedText>
        </TouchableOpacity>
    );
}