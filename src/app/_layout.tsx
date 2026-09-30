import SplashScreen from "@/components/SplashScreen";
import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { useAppReadyStore } from "../hooks/appReadyStore";

const SPLASH_MIN_TIME = 5000; // tiempo simulado de comprobación inicial
const SPLASH_MAX_TIME = 8000; // salvavidas si una imagen nunca reporta onLoadEnd

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();
  const loginReady = useAppReadyStore((s) => s.loginReady);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [splashHidden, setSplashHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function prepareApp() {
      try {
        console.log("Comprobando info de sesión...");
        await new Promise((resolve) => setTimeout(resolve, SPLASH_MIN_TIME));
        // Aqui aplicar logica real
      } catch (e) {
        console.warn("Error preparando la app", e);
      } finally {
        if (!cancelled) setSessionChecked(true);
      }
    }

    prepareApp();
    const maxTimer = setTimeout(() => {
      if (!cancelled) setSplashHidden(true);
    }, SPLASH_MAX_TIME);

    return () => {
      cancelled = true;
      clearTimeout(maxTimer);
    };
  }, []);

  // Se oculta una sola vez: sesión comprobada y (login pintado o ya hay sesión)
  useEffect(() => {
    if (sessionChecked && (loginReady || isLoggedIn)) {
      setSplashHidden(true);
    }
  }, [sessionChecked, loginReady, isLoggedIn]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView edges={["top"]} className="flex-1 bg-surface">
        <StatusBar barStyle="light-content" />
        <Stack>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </SafeAreaView>

      {!splashHidden && (
        <View style={StyleSheet.absoluteFill}>
          <SplashScreen />
        </View>
      )}
    </View>
  );
}
