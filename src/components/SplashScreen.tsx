import LottieView from "lottie-react-native";
import { ComponentProps } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PantallaCargaBase from "../assets/lotties/PantallaCargaBase.json";

type LottieSource = ComponentProps<typeof LottieView>["source"];

interface SplashScreenProps {
  source?: LottieSource;
  loop?: boolean;
  onAnimationFinish?: (isCancelled: boolean) => void;
}

export default function SplashScreen({
  source = PantallaCargaBase,
  loop = true,
  onAnimationFinish,
}: SplashScreenProps) {
  return (
    <SafeAreaView edges={[]} className="flex-1 bg-surface">
      <StatusBar barStyle="light-content" />
      <LottieView
        source={source}
        autoPlay
        resizeMode="cover"
        loop={loop}
        onAnimationFinish={onAnimationFinish}
        style={{ flex: 1, width: "100%" }}
      />
    </SafeAreaView>
  );
}
