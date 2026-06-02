import { IconName } from "@/components/atoms/Icon";

export type CategoryId =
  | "vinicolas"
  | "precosecha"
  | "vinedos"
  | "planta"
  | "corchos"
  | "riego";

interface Category {
  id: CategoryId;
  label: string;
  iconName: IconName;
}

export const CATEGORIES: Category[] = [
  {
    id: "vinicolas",
    label: "Material para Vinícolas",
    iconName: "wineGlass",
  },
  {
    id: "precosecha",
    label: "Pre-cosecha",
    iconName: "truck",
  },
  {
    id: "vinedos",
    label: "Material para Viñedos",
    iconName: "grapes",
  },
  {
    id: "planta",
    label: "Material para Planta",
    iconName: "plant",
  },
  {
    id: "corchos",
    label: "Corchos",
    iconName: "cork",
  },
  {
    id: "riego",
    label: "Material de Riego",
    iconName: "waterDrop",
  }
];
