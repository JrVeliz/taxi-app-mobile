import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//SVGS iconos barra nav
import CarIcon from "../assets/icons/car.svg";
import HistoryIcon from "../assets/icons/history.svg";
import MapIcon from "../assets/icons/map.svg";
import ProfileIcon from "../assets/icons/perfil.svg";

const COLORS = {
  activeIcon: "#f59e0b", // primary-container
  inactiveIcon: "#d8c3ad", // on-surface-variant
};

// Sombra
const barShadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
  },
  android: {
    elevation: 8,
  },
});

const BAR_CONTENT_HEIGHT = 64; // altura
const ICON_SIZE = 22;

// Nombres de ruta -> componente SVG + label
const ICONS: Record<
  string,
  React.FC<{ color?: string; width?: number; height?: number }>
> = {
  index: MapIcon,
  nueva_carrera: CarIcon,
  historial_eventos: HistoryIcon,
  perfil: ProfileIcon,
};

const LABELS: Record<string, string> = {
  index: "Mapa",
  nueva_carrera: "Nueva Carrera",
  historial_eventos: "Historial",
  perfil: "Perfil",
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  // SafeArea
  const insets = useSafeAreaInsets();

  return (
    <View
      className="w-full flex-row items-center bg-surface"
      style={[
        barShadow,
        {
          height: BAR_CONTENT_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const IconComponent = ICONS[route.name];
        const label =
          (options.title as string) ?? LABELS[route.name] ?? route.name;
        const iconColor = isFocused ? COLORS.activeIcon : COLORS.inactiveIcon;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-1 items-center justify-center"
          >
            {IconComponent && (
              <IconComponent
                color={iconColor}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
            )}
            <Text
              className={`mt-xs text-body-sm font-body font-semibold ${
                isFocused ? "text-primary-container" : "text-on-surface-variant"
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
