import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Mapa" }} />
      <Tabs.Screen name="nueva_carrera" options={{ title: "Nueva Carrera" }} />
      <Tabs.Screen name="historial_eventos" options={{ title: "Historial" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
