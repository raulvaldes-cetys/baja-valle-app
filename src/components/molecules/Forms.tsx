import { useState } from "react";
import { View } from "react-native";
import { ThemedButton } from "../atoms/ThemedButton";
import { ThemedText } from "../atoms/ThemedText";
import { ContactField } from "./ContactField";
import WaveDivider from "./WaveDivider";

export default function Forms() {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const [errors, setErrors] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        mensaje: "",
    })

    function handleEnviar() {
        const newErrors = { nombre: "", apellido: "", correo: "", mensaje: "" }

        if (!nombre) newErrors.nombre = "El nombre es requerido"
        if (!apellido) newErrors.apellido = "El apellido es requerido"
        if (!correo) {
            newErrors.correo = "El correo es requerido"
        } else if (!correo.includes("@")) {
            newErrors.correo = "Ingresa un correo válido"
        }
        if (!mensaje) newErrors.mensaje = "El mensaje es requerido"

        setErrors(newErrors)
    }

    return (

        <View className="flex-1 pb-32">

            <WaveDivider variant="top" />

            <View className="w-full bg-[#99884C] px-4 py-6 gap-4">

                <ThemedText weight="bold" className="text-2xl text-center text-[#F0EFDF]">CONTÁCTANOS</ThemedText>

                <View className="flex-row gap-3">
                    <ContactField className="flex-1" light label="Nombre" value={nombre} onChangeText={setNombre} placeholder="Ingrese su nombre" errorMessage={errors.nombre} />
                    <ContactField className="flex-1" light label="Apellido" value={apellido} onChangeText={setApellido} placeholder="Ingrese su apellido" errorMessage={errors.apellido} />
                </View>

                <View className="gap-3">
                    <ContactField light label="Correo electrónico" value={correo} onChangeText={setCorreo} placeholder="Ingrese su correo electrónico" errorMessage={errors.correo} />
                    <ContactField light label="Mensaje" value={mensaje} onChangeText={setMensaje} placeholder="Escriba su mensaje" variant="textarea" errorMessage={errors.mensaje} />
                </View>

                <View className="items-center mt-2">
                    <ThemedButton variant="primary" onPress={handleEnviar}>ENVIAR</ThemedButton>
                </View>
            </View>
            <WaveDivider variant="bottom" />  
            
        </View>


    )
}