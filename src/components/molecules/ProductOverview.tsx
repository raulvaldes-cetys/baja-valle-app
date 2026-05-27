import { View } from "react-native";
import { type IconName } from "../atoms/Icon";
import { ThemedText } from "../atoms/ThemedText";
import { IconWithText } from "./IconWithText";

const productos: { name: IconName; label: string }[] = [
    { name: "wineGlass", label: "Material para\nVinícolas" },
    { name: "truck", label: "Pre-cosecha" },
    { name: "grapes", label: "Material para\nViñedos" },
    { name: "plant", label: "Material para\nPlanta" },
    { name: "cork", label: "Corchos" },
    { name: "waterDrop", label: "Material de\nRiego" },
];

export default function ProductOverview() {
    return (
        <View className="bg-[#F0EFDF] px-6 py-8 gap-6">
            <ThemedText weight="bold" className="text-2xl text-center tracking-widest text-[#33232C]">
                NUESTROS PRODUCTOS
            </ThemedText>

            <View className="flex-row flex-wrap">
                {productos.map((producto) => (
                    <IconWithText
                        key={producto.name}
                        name={producto.name}
                        label={producto.label}
                        className="w-1/3 py-3"
                        onPress={() => console.log("presionado")} 
                    />
                ))}
            </View>
        </View>
    );
}