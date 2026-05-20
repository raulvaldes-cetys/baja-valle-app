import CorkSvg from "@/assets/expo.icon/Assets/cork.svg";
import GrapesSvg from "@/assets/expo.icon/Assets/grapes.svg";
import PlantSvg from "@/assets/expo.icon/Assets/plant.svg";
import TruckSvg from "@/assets/expo.icon/Assets/truck.svg";
import WaterDropSvg from "@/assets/expo.icon/Assets/water-drop.svg";
import WineGlassSvg from "@/assets/expo.icon/Assets/wine-glass.svg";
import { View } from "react-native";

export type IconName = "cork" | "grapes" | "plant" | "truck" | "waterDrop" | "wineGlass";

const iconBgColors: Record<IconName, string> = {
    wineGlass: "#A43F32",
    truck: "#33232C",
    grapes: "#99884C",
    plant: "#7F6E42",
    cork: "#5C3D2E",
    waterDrop: "#1E3A5F",
}

export type IconProps = {
    name: IconName;
    size?: number;
}

export function Icon({ name, size = 48 }: IconProps) {
    const icons = {
        wineGlass: WineGlassSvg,
        cork: CorkSvg,
        grapes: GrapesSvg,
        plant: PlantSvg,
        truck: TruckSvg,
        waterDrop: WaterDropSvg,
    };

    const SvgIcon = icons[name];
    const iconSize = size * 0.58;

    return (
        <View className="items-center justify-center"
            style={{
                width: size,
                height: size,
                borderRadius: size * 0.19,
                backgroundColor: iconBgColors[name],
            }}
        >

            <SvgIcon width={iconSize} height={iconSize} fill="white" color="white" />
        </View>

    );
}






