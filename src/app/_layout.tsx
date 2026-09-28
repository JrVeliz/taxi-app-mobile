import SplashScreen from "@/components/SplashScreen";
import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();
  const [isAppReady, setisAppReady] = useState(false);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-surface">
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
