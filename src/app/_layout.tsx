import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";
import React from "react";
import "../../global.css";

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();
  return (
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
  );
}
