import CancelIconSvg from "@/assets/expo.icon/Assets/cancel-icon.svg";
import FooterDecorationSvg from "@/assets/images/footer-decoration.svg";
import { ThemedButton } from "@/components/atoms/ThemedButton";
import { ThemedText } from "@/components/atoms/ThemedText";
import SuccessModal from "@/components/molecules/SuccessModal";
import { useProductCart } from "@/contexts/ProductCartContext";
import useZodForm from "@/hooks/use-zod-form";
import { usePostMailCart } from "@/services/mutations/use-post-mail-cart";
import { router } from "expo-router";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(1, "Campo requerido"),
  apellido: z.string().min(1, "Campo requerido"),
  telefono: z.string().min(1, "Campo requerido"),
  correo: z.string().email("Correo inválido"),
  ubicacion: z.string().min(1, "Campo requerido"),
});

type CheckoutForm = z.infer<typeof schema>;

const inputStyle = {
  borderWidth: 1,
  borderColor: "rgba(81,36,50,0.2)",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  backgroundColor: "white",
  color: "#33232C",
  fontFamily: "Montserrat_400Regular",
  fontSize: 13,
};

const TAB_BAR_HEIGHT = 80;

export default function CartCheckoutScreen() {
  const { cartItems, clearCart } = useProductCart();
  const { mutate, isPending } = usePostMailCart();
  const { control, handleSubmit, formState: { errors } } = useZodForm(schema);
  const insets = useSafeAreaInsets();
  const [showSuccess, setShowSuccess] = useState(false);

  function onSubmit(data: CheckoutForm) {
    mutate(
      {
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        ubicacion: data.ubicacion,
        items: cartItems.map((item) => ({
          nombre: item.name,
          cantidad: item.Quantity ?? 1,
        })),
      },
      {
        onSuccess: () => {
          clearCart();
          setShowSuccess(true);
        },
      }
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#512432]" edges={["top"]}>
      <SuccessModal
        visible={showSuccess}
        onClose={() => { setShowSuccess(false); router.navigate('/(tabs)/shoppingCart'); }}
        message="¡Cotización enviada correctamente!"
      />
      <View className="absolute bottom-0 left-0 right-0">
        <FooterDecorationSvg width="100%" height={160} preserveAspectRatio="xMidYMin slice" />
      </View>

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 48,
            paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 32,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedText weight="bold" className="text-white text-4xl text-center mb-6">
            Mis Datos
          </ThemedText>

          <Pressable onPress={() => router.navigate('/(tabs)/shoppingCart')} className="flex-row items-center gap-2 mb-3">
            <CancelIconSvg width={12} height={12} />
            <ThemedText weight="regular" className="text-white text-sm">
              Regresar
            </ThemedText>
          </Pressable>
          <View className="h-px bg-white mb-6" />

          <ThemedText weight="light" className="text-white text-xs mb-6 text-center">
            Ingrese su información para enviar su solicitud
          </ThemedText>

          <View className="gap-4">
            <View className="flex-row gap-3">
              <View className="flex-1 gap-1">
                <ThemedText weight="regular" className="text-white text-xs">Nombre:*</ThemedText>
                <Controller
                  control={control}
                  name="nombre"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={inputStyle}
                      value={value}
                      onChangeText={onChange}
                      placeholderTextColor="rgba(51,35,44,0.3)"
                    />
                  )}
                />
                {errors.nombre && (
                  <ThemedText weight="regular" className="text-red-300 text-[10px]">
                    {errors.nombre.message}
                  </ThemedText>
                )}
              </View>

              <View className="flex-1 gap-1">
                <ThemedText weight="regular" className="text-white text-xs">Apellido:*</ThemedText>
                <Controller
                  control={control}
                  name="apellido"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={inputStyle}
                      value={value}
                      onChangeText={onChange}
                      placeholderTextColor="rgba(51,35,44,0.3)"
                    />
                  )}
                />
                {errors.apellido && (
                  <ThemedText weight="regular" className="text-red-300 text-[10px]">
                    {errors.apellido.message}
                  </ThemedText>
                )}
              </View>
            </View>

            <View className="gap-1">
              <ThemedText weight="regular" className="text-white text-xs">Número telefónico:*</ThemedText>
              <Controller
                control={control}
                name="telefono"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={inputStyle}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                    placeholderTextColor="rgba(51,35,44,0.3)"
                  />
                )}
              />
              {errors.telefono && (
                <ThemedText weight="regular" className="text-red-300 text-[10px]">
                  {errors.telefono.message}
                </ThemedText>
              )}
            </View>

            <View className="gap-1">
              <ThemedText weight="regular" className="text-white text-xs">Correo electrónico:*</ThemedText>
              <Controller
                control={control}
                name="correo"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={inputStyle}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="rgba(51,35,44,0.3)"
                  />
                )}
              />
              {errors.correo && (
                <ThemedText weight="regular" className="text-red-300 text-[10px]">
                  {errors.correo.message}
                </ThemedText>
              )}
            </View>

            <View className="gap-1">
              <ThemedText weight="regular" className="text-white text-xs">Ubicación:*</ThemedText>
              <Controller
                control={control}
                name="ubicacion"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={inputStyle}
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="rgba(51,35,44,0.3)"
                  />
                )}
              />
              {errors.ubicacion && (
                <ThemedText weight="regular" className="text-red-300 text-[10px]">
                  {errors.ubicacion.message}
                </ThemedText>
              )}
            </View>
          </View>

          <ThemedText weight="light" className="text-white text-[10px] mt-4 mb-24 text-center">
            * Indica campo obligatorio
          </ThemedText>

          <ThemedButton
            variant="pill"
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? "Enviando..." : "Enviar Cotización"}
          </ThemedButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
