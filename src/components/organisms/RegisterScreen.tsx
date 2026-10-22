import { useAuth } from "@/contexts/AuthContext";
import { getApiErrorMessage } from "@/lib/api-error";
import { registerSchema, type RegisterForm } from "@/types/zod-schemas";
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

export default function RegisterScreen() {
    const { signUp } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleRegister(values: RegisterForm) {
        setIsSubmitting(true);
        setError(null);
        try {
            await signUp(values);
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
                    <ThemedText weight="bold" className="text-2xl text-center tracking-widest text-[#512432]">CREAR CUENTA</ThemedText>

                    <Form schema={registerSchema} defaultValues={{ firstName: "", lastName: "", email: "", password: "" }} onSubmitSuccess={handleRegister}>
                        {(handleSubmit, form) => (
                            <View className="gap-3">
                                <View className="flex-row gap-3">
                                    <Controller
                                        control={form.control}
                                        name="firstName"
                                        render={({ field: { value, onChange } }) => (
                                            <ContactField className="flex-1" label="Nombre" value={value} onChangeText={onChange} placeholder="Su nombre" errorMessage={form.formState.errors.firstName?.message} autoComplete="given-name" />
                                        )}
                                    />
                                    <Controller
                                        control={form.control}
                                        name="lastName"
                                        render={({ field: { value, onChange } }) => (
                                            <ContactField className="flex-1" label="Apellido" value={value} onChangeText={onChange} placeholder="Su apellido" errorMessage={form.formState.errors.lastName?.message} autoComplete="family-name" />
                                        )}
                                    />
                                </View>
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
                                        <ContactField label="Contraseña (mínimo 10 caracteres)" value={value} onChangeText={onChange} placeholder="Cree una contraseña" errorMessage={form.formState.errors.password?.message} secureTextEntry autoCapitalize="none" autoComplete="new-password" />
                                    )}
                                />

                                {error && <ThemedText weight="regular" className="text-sm text-center text-[#A43F32]">{error}</ThemedText>}

                                <View className="items-center mt-2">
                                    <ThemedButton variant="default" className="bg-[#99884C] px-14" onPress={handleSubmit} disabled={isSubmitting}>
                                        {isSubmitting ? "CREANDO..." : "CREAR CUENTA"}
                                    </ThemedButton>
                                </View>
                            </View>
                        )}
                    </Form>

                    <PhishingNotice />

                    <View className="items-center">
                        <ThemedButton variant="ghost" onPress={() => router.replace("/login")}>
                            ¿Ya tienes cuenta? Inicia sesión
                        </ThemedButton>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
