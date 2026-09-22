import { login } from "@/services/authService";
import { useAuthStore } from "@/utils/authStore";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuthStore();

  async function handleLogin() {
    setError("");
    setLoading(true);
    try {
      await login(user, password);
      logIn();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="justify-center flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Inicia Sesión.</Text>

      <TextInput
        placeholder="Usuario"
        onChangeText={setUser}
        className="border border-gray-300 rounded-lg px-3 py-3 mb-3"
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPassword}
        className="border border-gray-300 rounded-lg px-3 py-3 mb-3"
      />

      <Pressable
        onPress={handleLogin}
        className="bg-blue-600 rounded-lg py-3 items-center"
      >
        <Text className="text-white font-semibold">Iniciar sesión</Text>
        {loading && <Text className="text-slate-950">Cargando...</Text>}
      </Pressable>
    </View>
  );
}
