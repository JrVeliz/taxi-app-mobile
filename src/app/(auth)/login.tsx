import { login } from "@/services/authService";
import { useAuthStore } from "@/utils/authStore";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import LockIcon from "../../assets/lock.svg";

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "padding"}
      className="flex-1 bg-background"
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center p-4"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center justify-center mb-4">
          {/* Glow detrás de la imagen*/}
          <Svg height={400} width={400} style={{ position: "absolute" }}>
            <Defs>
              <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#F97316" stopOpacity="0.30" />
                <Stop offset="100%" stopColor="#F97316" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Rect width="400" height="400" fill="url(#glow)" />
          </Svg>

          <Image
            source={require("../../assets/take_your_time.jpg")}
            className="self-center w-48 h-48"
            resizeMode="center"
          />
        </View>
        <Text className="text-4xl font-bold mb-4 text-center">
          <Text className="color-white">Cooperativa </Text>
          <Text className="color-primary-container">NombreCooperativa</Text>
        </Text>
        <Text className="mb-4 color-outline text-center">
          Plataforma Privada de Socios Conductores
        </Text>
        <View className="flex-row items-center justify-center gap-1 mb-4">
          <LockIcon color="#F97316" width={18} height={18} />
          <Text className="text-warning">
            Acceso restringido a personal autorizado
          </Text>
        </View>
        <View className="bg-surface-container p-4 rounded-lg">
          <Text className="text-sm font-medium text-primary mb-1">Usuario</Text>
          <TextInput
            onChangeText={setUser}
            className="rounded-lg px-3 py-3 mb-4 bg-surface-container-high text-on-background"
          />
          <Text className="text-sm font-medium text-primary mb-1">
            Contraseña
          </Text>
          <TextInput
            secureTextEntry
            onChangeText={setPassword}
            className="rounded-lg px-3 py-3 mb-4 bg-surface-container-high text-on-background"
          />
          <Pressable
            onPress={handleLogin}
            className="bg-primary-container rounded-lg py-3 items-center"
          >
            <Text className="text-background font-semibold">
              Iniciar sesión
            </Text>
            {loading && <Text className="text-slate-950">Cargando...</Text>}
          </Pressable>
          {error && (
            <Text className="text-critical font-bold text-center pt-4">
              Error de conexión...
            </Text>
          )}
        </View>

        <Text className="text-xs text-gray-500 mt-4 text-center">
          Versión 0.1 GestiTaxi
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
