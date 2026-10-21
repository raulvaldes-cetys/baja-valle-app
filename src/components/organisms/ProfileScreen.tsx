import { useAuth } from "@/contexts/AuthContext";
import useSubmitMessage from "@/hooks/use-submit-message";
import { profileSchema, type ProfileForm } from "@/types/zod-schemas";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../atoms/Form";
import FormMessage from "../atoms/FormMessage";
import { ThemedButton } from "../atoms/ThemedButton";
import { ThemedText } from "../atoms/ThemedText";
import ChangeEmailFormSection from "../molecules/ChangeEmailForm";
import ChangePasswordFormSection from "../molecules/ChangePasswordForm";
import { ContactField } from "../molecules/ContactField";
import DeleteAccountFormSection from "../molecules/DeleteAccountForm";

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <View className="gap-3 border-t border-[#512432]/20 pt-6">
            <ThemedText weight="bold" className="text-base tracking-widest text-[#512432]">{title}</ThemedText>
            {children}
        </View>
    );
}

export default function ProfileScreen() {
    const { user, updateProfile, signOut, signOutEverywhere } = useAuth();
    const profile = useSubmitMessage();
    const sessions = useSubmitMessage();

    async function handleSignOut() {
        await signOut();
        router.navigate("/(tabs)");
    }

    async function handleSignOutEverywhere() {
        if (await sessions.run(signOutEverywhere)) router.navigate("/(tabs)");
    }

    return (
        <SafeAreaView className="flex-1 bg-[#512432]" edges={["top"]}>
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView className="bg-[#F9F9F2]" keyboardShouldPersistTaps="handled" contentContainerClassName="px-6 pt-10 pb-40 gap-6">
                    <ThemedText weight="bold" className="text-2xl text-center tracking-widest text-[#512432]">MI PERFIL</ThemedText>

                    <View className="gap-1">
                        <ThemedText weight="semibold" className="text-sm text-[#33232C]">Correo electrónico</ThemedText>
                        <ThemedText weight="regular" className="text-sm text-[#33232C]">{user?.email}</ThemedText>
                    </View>

                    <Form
                        key={user?.id}
                        schema={profileSchema}
                        defaultValues={{ firstName: user?.firstName ?? "", lastName: user?.lastName ?? "" }}
                        onSubmitSuccess={(values: ProfileForm) => profile.run(() => updateProfile(values), "Cambios guardados")}
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
                                <FormMessage message={profile.message} />
                                <View className="items-center">
                                    <ThemedButton variant="default" className="bg-[#99884C] px-14" onPress={handleSubmit} disabled={profile.isSubmitting}>
                                        {profile.isSubmitting ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
                                    </ThemedButton>
                                </View>
                            </View>
                        )}
                    </Form>

                    <Section title="CAMBIAR CORREO">
                        <ChangeEmailFormSection />
                    </Section>

                    <Section title="CAMBIAR CONTRASEÑA">
                        <ChangePasswordFormSection />
                    </Section>

                    <Section title="SESIONES">
                        <FormMessage message={sessions.message} />
                        <View className="items-center gap-2">
                            <ThemedButton variant="ghost" onPress={handleSignOut}>
                                Cerrar sesión
                            </ThemedButton>
                            <ThemedButton variant="ghost" onPress={handleSignOutEverywhere} disabled={sessions.isSubmitting}>
                                Cerrar sesión en todos los dispositivos
                            </ThemedButton>
                        </View>
                    </Section>

                    <Section title="ELIMINAR CUENTA">
                        <DeleteAccountFormSection />
                    </Section>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
