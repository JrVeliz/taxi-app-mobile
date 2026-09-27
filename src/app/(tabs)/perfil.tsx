import { useAuthStore } from "@/utils/authStore";
import { Pressable, Text, View } from "react-native";

export default function Perfil() {
  const { logOut } = useAuthStore();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Perfil del taxista
      </Text>
      <Pressable
        onPress={logOut}
        className="bg-blue-600 rounded-lg items-center p-3"
      >
        <Text className="text-white font-semibold">Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}
