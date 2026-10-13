import { useAuthStore } from "@/utils/authStore";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const RANGOS_DETECCION = ["500 m", "1 km", "2 km", "5 km"];

export default function Perfil() {
  const { logOut } = useAuthStore();
  const [rangoSeleccionado, setRangoSeleccionado] = useState("1 km");

  // Info quemada del usuario
  const usuario = {
    nombre: "Takuto Maruki",
    foto: require("../../assets/maruki_taxi.jpeg"),
    unidad: "Toyota Corolla - ABC-123",
    cedula: "0912345678",
    rangoDeteccion: "500 m",
  };
  useEffect(() => {
    setRangoSeleccionado(usuario.rangoDeteccion);
  }, []);

  return (
    <View className="flex-1 items-center bg-surface-container-lowest px-4 pt-8">
      {/* Tarjeta de información del usuario */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="items-center"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 w-full max-w-md rounded-xl border  bg-surface-container p-6 items-center">
          <Image
            source={usuario.foto}
            className="mb-4 h-36 w-36 rounded-full border-2 border-primary"
            resizeMode="cover"
          />

          <Text className="mb-1 text-headline-lg font-heading text-on-surface">
            {usuario.nombre}
          </Text>
          <Text className="mb-6 text-body-lg text-on-surface-variant">
            Conductor
          </Text>

          <View className="w-full gap-3">
            <View className="flex-row items-center gap-3 rounded-lg bg-surface-container-high p-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-container">
                <Ionicons name="car-outline" size={20} color="#472a00" />
              </View>
              <View className="flex-1">
                <Text className="text-body-sm text-on-surface-variant">
                  Unidad que maneja
                </Text>
                <Text className="text-body-lg font-medium text-on-surface">
                  {usuario.unidad}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 rounded-lg bg-surface-container-high p-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-container">
                <Ionicons name="card-outline" size={20} color="#472a00" />
              </View>
              <View className="flex-1">
                <Text className="text-body-sm text-on-surface-variant">
                  Cédula
                </Text>
                <Text className="text-body-lg font-medium text-on-surface">
                  {usuario.cedula}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tarjeta de preferencias de detección */}
        <View className="mb-4 w-full max-w-md rounded-xl border bg-surface-container p-6">
          <View className="mb-4 flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-container">
              <Ionicons name="radio-outline" size={20} color="#472a00" />
            </View>
            <View className="flex-1">
              <Text className="text-body-lg font-bold text-on-surface">
                Rango de detección
              </Text>
              <Text className="text-body-sm text-on-surface-variant">
                Radio de detección de eventos cercanos
              </Text>
            </View>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {RANGOS_DETECCION.map((rango) => {
              const seleccionado = rango === rangoSeleccionado;
              return (
                <Pressable
                  key={rango}
                  onPress={() => setRangoSeleccionado(rango)}
                  className={`min-w-[76px] flex-1 items-center rounded-lg border px-3 py-2 ${
                    seleccionado
                      ? "border-primary bg-primary"
                      : "border-outline-variant bg-surface-container-high"
                  }`}
                >
                  <Text
                    className={`text-body-md font-medium ${
                      seleccionado ? "text-on-primary" : "text-on-surface"
                    }`}
                  >
                    {rango}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          onPress={logOut}
          className="mt-2 w-full max-w-md items-center rounded-lg bg-red-700 p-3"
        >
          <Text className="font-bold text-on-surface">Cerrar sesión</Text>
        </Pressable>
        <Text className="text-sm text-gray-500 mt-4 text-center">
          Versión 0.1 GestiTaxi
        </Text>
      </ScrollView>
    </View>
  );
}
