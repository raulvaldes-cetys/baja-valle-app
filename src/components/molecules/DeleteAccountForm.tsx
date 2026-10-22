import { useAuth } from "@/contexts/AuthContext";
import useSubmitMessage from "@/hooks/use-submit-message";
import { deleteAccountSchema, type DeleteAccountForm } from "@/types/zod-schemas";
import { router } from "expo-router";
import { Controller } from "react-hook-form";
import { Alert, View } from "react-native";
import Form from "../atoms/Form";
import FormMessage from "../atoms/FormMessage";
import { ThemedButton } from "../atoms/ThemedButton";
import { ContactField } from "./ContactField";

export default function DeleteAccountFormSection() {
    const { deleteAccount } = useAuth();
    const { message, isSubmitting, run } = useSubmitMessage();

    // La cuenta solo se elimina después de que el usuario confirma en la alerta
    function confirmDelete({ currentPassword }: DeleteAccountForm) {
        Alert.alert(
            "Eliminar cuenta",
            "Se eliminará tu cuenta y tus datos. Esta acción no se puede deshacer.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        if (await run(() => deleteAccount(currentPassword))) router.navigate("/(tabs)");
                    },
                },
            ],
        );
    }

    return (
        <Form schema={deleteAccountSchema} defaultValues={{ currentPassword: "" }} onSubmitSuccess={confirmDelete}>
            {(handleSubmit, form) => (
                <View className="gap-3">
                    <Controller
                        control={form.control}
                        name="currentPassword"
                        render={({ field: { value, onChange } }) => (
                            <ContactField label="Contraseña actual" value={value} onChangeText={onChange} errorMessage={form.formState.errors.currentPassword?.message} secureTextEntry autoCapitalize="none" />
                        )}
                    />
                    <FormMessage message={message} />
                    <View className="items-center">
                        <ThemedButton variant="default" className="bg-[#A43F32] px-14" onPress={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? "ELIMINANDO..." : "ELIMINAR CUENTA"}
                        </ThemedButton>
                    </View>
                </View>
            )}
        </Form>
    );
}
