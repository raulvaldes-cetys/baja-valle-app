import { useAuth } from "@/contexts/AuthContext";
import useSubmitMessage from "@/hooks/use-submit-message";
import { changePasswordSchema, type ChangePasswordForm } from "@/types/zod-schemas";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import Form from "../atoms/Form";
import FormMessage from "../atoms/FormMessage";
import { ThemedButton } from "../atoms/ThemedButton";
import { ContactField } from "./ContactField";

export default function ChangePasswordFormSection() {
    const { changePassword } = useAuth();
    const { message, isSubmitting, run } = useSubmitMessage();

    return (
        <Form
            schema={changePasswordSchema}
            defaultValues={{ currentPassword: "", newPassword: "" }}
            onSubmitSuccess={async (values: ChangePasswordForm, form) => {
                const done = await run(() => changePassword(values), "Contraseña actualizada. Se cerró la sesión en tus otros dispositivos");
                if (done) form.reset();
            }}
        >
            {(handleSubmit, form) => (
                <View className="gap-3">
                    <Controller
                        control={form.control}
                        name="currentPassword"
                        render={({ field: { value, onChange } }) => (
                            <ContactField label="Contraseña actual" value={value} onChangeText={onChange} errorMessage={form.formState.errors.currentPassword?.message} secureTextEntry autoCapitalize="none" />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="newPassword"
                        render={({ field: { value, onChange } }) => (
                            <ContactField label="Contraseña nueva (mínimo 10 caracteres)" value={value} onChangeText={onChange} errorMessage={form.formState.errors.newPassword?.message} secureTextEntry autoCapitalize="none" />
                        )}
                    />
                    <FormMessage message={message} />
                    <View className="items-center">
                        <ThemedButton variant="default" className="bg-[#99884C] px-14" onPress={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? "GUARDANDO..." : "CAMBIAR CONTRASEÑA"}
                        </ThemedButton>
                    </View>
                </View>
            )}
        </Form>
    );
}
