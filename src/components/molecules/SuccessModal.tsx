import CancelIconSvg from "@/assets/expo.icon/Assets/cancel-icon.svg";
import SuccessIconSvg from "@/assets/expo.icon/Assets/success-icon.svg";
import { ThemedText } from "@/components/atoms/ThemedText";
import { BlurView } from "expo-blur";
import { Modal, Pressable, View } from "react-native";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({ visible, onClose, message }: SuccessModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <BlurView intensity={40} tint="dark" className="flex-1 items-center justify-center px-8">
        <View
          className="w-full bg-[#F9F9F2] items-center px-8 py-10"
          style={{ borderRadius: 4 }}
        >
          <Pressable onPress={onClose} className="absolute top-4 right-4" hitSlop={12}>
            <CancelIconSvg width={14} height={14} color="#31242C" />
          </Pressable>

          <SuccessIconSvg width={60} height={60} />

          <ThemedText weight="bold" className="text-[#33232C] text-2xl text-center mt-6">
            {message}
          </ThemedText>
        </View>
      </BlurView>
    </Modal>
  );
}
