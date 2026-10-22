import { useAuth } from "@/contexts/AuthContext";
import { getApiErrorMessage } from "@/lib/api-error";
import { loginSchema } from "@/types/zod-schemas";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../atoms/Form";
import { ThemedButton } from "../atoms/ThemedButton";
import { ThemedText } from "../atoms/ThemedText";
import { ContactField } from "../molecules/ContactField";
import PhishingNotice from "../molecules/PhishingNotice";

export default function LoginScreen() {
    const { signIn } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleLogin(values: { email: string; password: string }) {
        setIsSubmitting(true);
        setError(null);
        try {
            await signIn(values);
            if (router.canGoBack()) router.back();
            else router.replace("/(tabs)");
        } catch (e) {
            setError(getApiErrorMessage(e));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-[#512432]">
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView className="bg-[#F9F9F2]" keyboardShouldPersistTaps="handled" contentContainerClassName="px-6 py-8 gap-4">
                    <ThemedText weight="bold" className="text-2xl text-center tracking-widest text-[#512432]">INICIAR SESIÓN</ThemedText>

                    <Form schema={loginSchema} defaultValues={{ email: "", password: "" }} onSubmitSuccess={handleLogin}>
                        {(handleSubmit, form) => (
                            <View className="gap-3">
                                <Controller
                                    control={form.control}
                                    name="email"
                                    render={({ field: { value, onChange } }) => (
                                        <ContactField label="Correo electrónico" value={value} onChangeText={onChange} placeholder="Ingrese su correo electrónico" errorMessage={form.formState.errors.email?.message} keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
                                    )}
                                />
                                <Controller
                                    control={form.control}
                                    name="password"
                                    render={({ field: { value, onChange } }) => (
                                        <ContactField label="Contraseña" value={value} onChangeText={onChange} placeholder="Ingrese su contraseña" errorMessage={form.formState.errors.password?.message} secureTextEntry autoCapitalize="none" autoComplete="current-password" />
                                    )}
                                />

                                {error && <ThemedText weight="regular" className="text-sm text-center text-[#A43F32]">{error}</ThemedText>}

                                <View className="items-center mt-2">
                                    <ThemedButton variant="default" className="bg-[#99884C] px-14" onPress={handleSubmit} disabled={isSubmitting}>
                                        {isSubmitting ? "ENTRANDO..." : "ENTRAR"}
                                    </ThemedButton>
                                </View>
                            </View>
                        )}
                    </Form>

                    <PhishingNotice />

                    <View className="items-center">
                        <ThemedButton variant="ghost" onPress={() => router.replace("/register")}>
                            ¿No tienes cuenta? Crea una
                        </ThemedButton>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
