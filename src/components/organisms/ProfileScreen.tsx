import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedButton } from "../atoms/ThemedButton";
import { ThemedText } from "../atoms/ThemedText";

export default function ProfileScreen() {
    const { user, signOut } = useAuth();

    async function handleSignOut() {
        await signOut();
        router.navigate("/(tabs)");
    }

    return (
        <SafeAreaView className="flex-1 bg-[#512432]" edges={["top"]}>
            <View className="flex-1 bg-[#F9F9F2] px-6 pt-10 gap-4 items-center">
                <ThemedText weight="bold" className="text-2xl tracking-widest text-[#512432]">MI PERFIL</ThemedText>
                <ThemedText weight="semibold" className="text-lg text-[#33232C]">{user?.firstName} {user?.lastName}</ThemedText>
                <ThemedText weight="regular" className="text-sm text-[#33232C]">{user?.email}</ThemedText>
                <ThemedButton variant="default" className="bg-[#99884C] px-14 mt-4" onPress={handleSignOut}>
                    CERRAR SESIÓN
                </ThemedButton>
            </View>
        </SafeAreaView>
    );
}
