import LottieView from "lottie-react-native";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PantallaCarga from "../assets/lotties/PantallaCarga.json";

export default function SplashScreen() {
  return (
    <SafeAreaView edges={[]} className="flex-1 bg-surface justify-items-center">
      <StatusBar barStyle={"light-content"} />
      <LottieView
        source={PantallaCarga}
        autoPlay
        resizeMode="cover"
        loop={true}
        style={{ flex: 1, width: "100%" }}
      />
    </SafeAreaView>
  );
}
