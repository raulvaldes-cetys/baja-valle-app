import { useAuth } from "@/contexts/AuthContext";
import useSubmitMessage from "@/hooks/use-submit-message";
import { changeEmailSchema, type ChangeEmailForm } from "@/types/zod-schemas";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import Form from "../atoms/Form";
import FormMessage from "../atoms/FormMessage";
import { ThemedButton } from "../atoms/ThemedButton";
import { ContactField } from "./ContactField";

export default function ChangeEmailFormSection() {
    const { changeEmail } = useAuth();
    const { message, isSubmitting, run } = useSubmitMessage();

    return (
        <Form
            schema={changeEmailSchema}
            defaultValues={{ newEmail: "", currentPassword: "" }}
            onSubmitSuccess={async (values: ChangeEmailForm, form) => {
                if (await run(() => changeEmail(values), "Correo actualizado")) form.reset();
            }}
        >
            {(handleSubmit, form) => (
                <View className="gap-3">
                    <Controller
                        control={form.control}
                        name="newEmail"
                        render={({ field: { value, onChange } }) => (
                            <ContactField label="Correo nuevo" value={value} onChangeText={onChange} errorMessage={form.formState.errors.newEmail?.message} keyboardType="email-address" autoCapitalize="none" />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="currentPassword"
                        render={({ field: { value, onChange } }) => (
                            <ContactField label="Contraseña actual" value={value} onChangeText={onChange} errorMessage={form.formState.errors.currentPassword?.message} secureTextEntry autoCapitalize="none" />
                        )}
                    />
                    <FormMessage message={message} />
                    <View className="items-center">
                        <ThemedButton variant="default" className="bg-[#99884C] px-14" onPress={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? "GUARDANDO..." : "CAMBIAR CORREO"}
                        </ThemedButton>
                    </View>
                </View>
            )}
        </Form>
    );
}
