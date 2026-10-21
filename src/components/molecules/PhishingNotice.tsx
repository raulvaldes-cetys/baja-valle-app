import { View } from "react-native";
import { ThemedText } from "../atoms/ThemedText";

export default function PhishingNotice() {
    return (
        <View className="rounded-lg bg-[#F0EFDF] px-4 py-3">
            <ThemedText weight="regular" className="text-xs text-center text-[#512432]">
                Baja Valle nunca te pedirá tu contraseña por correo ni por teléfono
            </ThemedText>
        </View>
    );
}
