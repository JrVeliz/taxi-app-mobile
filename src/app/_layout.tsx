import SplashScreen from "@/components/SplashScreen";
import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

const SPLASH_MIN_TIME = 5000; // tiempo simulado de comprobación inicial

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function prepareApp() {
      try {
        console.log("Comprobando info de sesión...");

        // Simula la carga de información (token, perfil, configuración, etc)
        await new Promise((resolve) => setTimeout(resolve, SPLASH_MIN_TIME));

        // logica real await useAuthStore.getState().restoreSession();
      } catch (e) {
        console.warn("Error preparando la app", e);
      } finally {
        if (!cancelled) setIsAppReady(true);
      }
    }
    prepareApp();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface">
      <StatusBar barStyle={"light-content"} />
      <React.Fragment>
        <Stack>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </React.Fragment>
    </SafeAreaView>
  );
}
