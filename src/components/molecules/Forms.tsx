import { useMutation } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { View } from "react-native";
import WaveSvg from "@/assets/expo.icon/Assets/waves.svg";
import { Api } from "@/api/api";
import { contactSchema, type ContactForm } from "@/types/zod-schemas";
import Form from "../atoms/Form";
import { ThemedButton } from "../atoms/ThemedButton";
import { ThemedText } from "../atoms/ThemedText";
import { ContactField } from "./ContactField";
import SuccessModal from "./SuccessModal";
import WaveDivider from "./WaveDivider";

export default function Forms() {
    const [showSuccess, setShowSuccess] = useState(false);
    const { mutate, isPending } = useMutation({
        mutationFn: (data: ContactForm) => Api.postMailContact(data),
    });

    return (
        <View className="flex-1 pb-0">
            <SuccessModal
                visible={showSuccess}
                onClose={() => setShowSuccess(false)}
                message="¡Solicitud enviada correctamente!"
            />

            <WaveDivider variant="top" />

            <View className="w-full bg-[#99884C] px-4 pt-6 pb-0 gap-4">
                <ThemedText weight="bold" className="text-2xl text-center text-[#F0EFDF]">CONTÁCTANOS</ThemedText>

                <Form
                    schema={contactSchema}
                    defaultValues={{ nombre: "", apellido: "", correo: "", mensaje: "" }}
                    onSubmitSuccess={(data, form) => mutate(data, { onSuccess: () => { form.reset(); setShowSuccess(true); } })}
                >
                    {(handleSubmit, form) => (
                        <>
                            <View className="flex-row gap-3">
                                <Controller
                                    control={form.control}
                                    name="nombre"
                                    render={({ field: { value, onChange } }) => (
                                        <ContactField className="flex-1" light label="Nombre" value={value} onChangeText={onChange} placeholder="Ingrese su nombre" errorMessage={form.formState.errors.nombre?.message} />
                                    )}
                                />
                                <Controller
                                    control={form.control}
                                    name="apellido"
                                    render={({ field: { value, onChange } }) => (
                                        <ContactField className="flex-1" light label="Apellido" value={value} onChangeText={onChange} placeholder="Ingrese su apellido" errorMessage={form.formState.errors.apellido?.message} />
                                    )}
                                />
                            </View>

                            <View className="gap-3">
                                <Controller
                                    control={form.control}
                                    name="correo"
                                    render={({ field: { value, onChange } }) => (
                                        <ContactField light label="Correo electrónico" value={value} onChangeText={onChange} placeholder="Ingrese su correo electrónico" errorMessage={form.formState.errors.correo?.message} keyboardType="email-address" autoCapitalize="none" />
                                    )}
                                />
                                <Controller
                                    control={form.control}
                                    name="mensaje"
                                    render={({ field: { value, onChange } }) => (
                                        <ContactField light label="Mensaje" value={value} onChangeText={onChange} placeholder="Escriba su mensaje" variant="textarea" errorMessage={form.formState.errors.mensaje?.message} />
                                    )}
                                />
                            </View>

                            <View className="items-center mt-2">
                                <ThemedButton variant="primary" onPress={handleSubmit} disabled={isPending || !contactSchema.safeParse(form.watch()).success}>
                                    {isPending ? "ENVIANDO..." : "ENVIAR"}
                                </ThemedButton>
                            </View>
                        </>
                    )}
                </Form>

                <View className="relative h-64 -mx-4">
                    <WaveSvg
                        width="100%"
                        height="100%"
                        preserveAspectRatio="none"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>
        </View>
    );
}
