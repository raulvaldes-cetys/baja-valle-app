import { useAuth } from "@/contexts/AuthContext";
import { getApiErrorMessage } from "@/lib/api-error";
import { profileSchema, type ProfileForm } from "@/types/zod-schemas";
import { router } from "expo-router";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../atoms/Form";
import { ThemedButton } from "../atoms/ThemedButton";
import { ThemedText } from "../atoms/ThemedText";
import { ContactField } from "../molecules/ContactField";

export default function ProfileScreen() {
    const { user, updateProfile, signOut } = useAuth();
    const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    async function handleSave(values: ProfileForm) {
        setIsSaving(true);
        setMessage(null);
        try {
            await updateProfile(values);
            setMessage({ text: "Cambios guardados", isError: false });
        } catch (e) {
            setMessage({ text: getApiErrorMessage(e), isError: true });
        } finally {
            setIsSaving(false);
        }
    }

    async function handleSignOut() {
        await signOut();
        router.navigate("/(tabs)");
    }

    return (
        <SafeAreaView className="flex-1 bg-[#512432]" edges={["top"]}>
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView className="bg-[#F9F9F2]" keyboardShouldPersistTaps="handled" contentContainerClassName="px-6 pt-10 pb-40 gap-4">
                    <ThemedText weight="bold" className="text-2xl text-center tracking-widest text-[#512432]">MI PERFIL</ThemedText>

                    <View className="gap-1">
                        <ThemedText weight="semibold" className="text-sm text-[#33232C]">Correo electrónico</ThemedText>
                        <ThemedText weight="regular" className="text-sm text-[#33232C]">{user?.email}</ThemedText>
                    </View>

                    <Form
                        key={user?.id}
                        schema={profileSchema}
                        defaultValues={{ firstName: user?.firstName ?? "", lastName: user?.lastName ?? "" }}
                        onSubmitSuccess={handleSave}
                    >
                        {(handleSubmit, form) => (
                            <View className="gap-3">
                                <Controller
                                    control={form.control}
                                    name="firstName"
                                    render={({ field: { value, onChange } }) => (
                                        <ContactField label="Nombre" value={value} onChangeText={onChange} errorMessage={form.formState.errors.firstName?.message} />
                                    )}
                                />
                                <Controller
                                    control={form.control}
                                    name="lastName"
                                    render={({ field: { value, onChange } }) => (
                                        <ContactField label="Apellido" value={value} onChangeText={onChange} errorMessage={form.formState.errors.lastName?.message} />
                                    )}
                                />

                                {message && (
                                    <ThemedText weight="regular" className={`text-sm text-center ${message.isError ? "text-[#A43F32]" : "text-[#4C7A3D]"}`}>
                                        {message.text}
                                    </ThemedText>
                                )}

                                <View className="items-center mt-2">
                                    <ThemedButton variant="default" className="bg-[#99884C] px-14" onPress={handleSubmit} disabled={isSaving}>
                                        {isSaving ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
                                    </ThemedButton>
                                </View>
                            </View>
                        )}
                    </Form>

                    <View className="items-center mt-6">
                        <ThemedButton variant="ghost" onPress={handleSignOut}>
                            Cerrar sesión
                        </ThemedButton>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
