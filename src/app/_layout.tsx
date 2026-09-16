import { Stack } from "expo-router";
import React from "react";
import "../../global.css";

export default function RootLayout() {
  return (
    <React.Fragment>
      <Stack>
        <Stack.Protected guard={false}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={true}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </React.Fragment>
  );
}
