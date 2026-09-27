import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();
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
