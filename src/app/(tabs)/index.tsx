import { Place, Suggestion, usePlaceSearch } from "@/hooks/usePlaceSearch";
import { computeRoute, LatLng, Route } from "@/services/google";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

const DEFAULT_COORD: LatLng = { latitude: -2.1962, longitude: -79.8862 };
const ZOOM = { latitudeDelta: 0.005, longitudeDelta: 0.005 };

export default function Index() {
  const mapRef = useRef<MapView>(null);
  const [user, setUser] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<Place | null>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [routing, setRouting] = useState(false);
  const { text, setText, suggestions, selectSuggestion, clearSearch } =
    usePlaceSearch(user);

  const flyTo = (c: LatLng) =>
    mapRef.current?.animateToRegion({ ...c, ...ZOOM }, 1000);

  // GPS del usuario (una sola vez)
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.High,
      });
      setUser(coords);
      flyTo(coords);
    })();
  }, []);

  const chooseDestination = (place: Place) => {
    setDestination(place);
    setRoute(null);
    flyTo(place);
  };

  const onSelectSuggestion = async (s: Suggestion) => {
    Keyboard.dismiss();
    try {
      chooseDestination(await selectSuggestion(s));
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  const onCalculateRoute = async () => {
    if (!user || !destination) return;
    setRouting(true);
    try {
      const r = await computeRoute(user, destination);
      setRoute(r);
      mapRef.current?.fitToCoordinates(r.coords, {
        edgePadding: { top: 150, right: 50, bottom: 300, left: 50 },
        animated: true,
      });
    } catch (e: any) {
      Alert.alert("No se pudo calcular la ruta", e.message);
    } finally {
      setRouting(false);
    }
  };

  // Un solo botón principal que cambia según el estado (evita JSX duplicado)
  const action = route
    ? {
        label: "Iniciar Viaje",
        icon: "play",
        bg: "bg-green-600",
        onPress: () => Alert.alert("¡Iniciando viaje!"),
      }
    : {
        label: routing ? "Calculando..." : "Calcular Ruta",
        icon: "navigate",
        bg: "bg-black",
        onPress: onCalculateRoute,
      };

  return (
    <View className="flex-1 bg-white">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={{ ...DEFAULT_COORD, ...ZOOM }}
        onPress={() => {
          Keyboard.dismiss();
          clearSearch();
        }}
        // El evento ya trae nombre y coordenadas: no hace falta llamar a Place Details (costo $0)
        onPoiClick={({ nativeEvent: { coordinate, name } }) =>
          chooseDestination({ ...coordinate, title: name, address: "" })
        }
      >
        {destination && (
          <Marker
            coordinate={destination}
            title={destination.title}
            description={destination.address}
          />
        )}
        {route && (
          <Polyline
            coordinates={route.coords}
            strokeWidth={5}
            strokeColor="#111827"
          />
        )}
      </MapView>

      {/* BUSCADOR */}
      <View className="absolute top-12 left-4 right-4 z-20">
        <View className="flex-row items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-lg border border-gray-100">
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            className="flex-1 text-gray-800 text-base"
            placeholder="¿A dónde vamos?"
            value={text}
            onChangeText={setText}
          />
          {text.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        {suggestions.length > 0 && (
          <ScrollView
            className="bg-white mt-2 rounded-xl shadow-lg max-h-60"
            keyboardShouldPersistTaps="handled"
          >
            {suggestions.map((s) => (
              <TouchableOpacity
                key={s.placeId}
                className="flex-row items-center gap-3 px-4 py-3 border-b border-gray-100"
                onPress={() => onSelectSuggestion(s)}
              >
                <Ionicons name="location-outline" size={20} color="#6b7280" />
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium" numberOfLines={1}>
                    {s.title}
                  </Text>
                  <Text
                    className="text-gray-500 text-xs mt-0.5"
                    numberOfLines={1}
                  >
                    {s.address}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* TARJETA INFERIOR */}
      {destination && (
        <View className="absolute bottom-8 left-4 right-4 bg-white p-5 rounded-3xl shadow-2xl border border-gray-100 z-10">
          <Text
            className="text-gray-900 font-bold text-lg mb-1"
            numberOfLines={1}
          >
            {destination.title}
          </Text>
          {!!destination.address && (
            <Text className="text-gray-500 text-sm mb-4" numberOfLines={2}>
              {destination.address}
            </Text>
          )}

          {route && (
            <View className="flex-row items-center gap-2 bg-gray-50 p-3 rounded-xl mb-4 border border-gray-200">
              <Ionicons name="time-outline" size={20} color="#1f2937" />
              <Text className="text-gray-800 font-bold">{route.duration}</Text>
              <View className="w-1.5 h-1.5 bg-gray-300 rounded-full mx-2" />
              <Ionicons name="car-outline" size={20} color="#1f2937" />
              <Text className="text-gray-800 font-bold">{route.distance}</Text>
            </View>
          )}

          <View className="flex-row gap-3">
            <TouchableOpacity
              className={`flex-1 ${action.bg} py-4 rounded-2xl items-center justify-center flex-row gap-2`}
              onPress={action.onPress}
              disabled={routing}
            >
              <Ionicons name={action.icon as any} size={20} color="white" />
              <Text className="text-white font-bold">{action.label}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-100 px-5 py-4 rounded-2xl items-center justify-center"
              onPress={() => {
                setDestination(null);
                setRoute(null);
              }}
            >
              <Ionicons name="close" size={22} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* BOTÓN CENTRAR */}
      <TouchableOpacity
        className="absolute right-5 bottom-56 bg-white p-3 rounded-full shadow-lg border border-gray-100 z-10"
        onPress={() => user && flyTo(user)}
      >
        <Ionicons name="locate" size={24} color="#1f2937" />
      </TouchableOpacity>
    </View>
  );
}
