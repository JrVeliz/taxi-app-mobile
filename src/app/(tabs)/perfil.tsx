import { useAuthStore } from "@/utils/authStore";
import { Pressable, Text, View } from "react-native";

export default function Perfil() {
  const { logOut } = useAuthStore();
  return (
    <View className="flex-1 items-center bg-surface-container-lowest">
      <View className="bg-surface p-4 mt-5 mb-5 rounded-lg">
        <Text className="text-lg font-medium text-primary mb-1">Foto</Text>
        <Text className="text-lg font-medium text-primary mb-1">Nombre</Text>
        <Text className="text-lg font-medium text-primary mb-1">Unidad</Text>
        <Text className="text-lg font-medium text-primary mb-1">Cedula</Text>
      </View>

      <Pressable
        onPress={logOut}
        className="bg-blue-600 rounded-lg items-center p-3"
      >
        <Text className="text-white font-semibold">Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}
