import { Pressable, Text, View } from "react-native";

export default function Test() {
  return (
    <View className="flex-1 bg-background px-lg py-md">
      {/* Título con headline-xl + color on-background (texto sobre el fondo) */}
      <Text className="text-headline-xl font-extrabold text-on-background mb-md">
        Panel de Despacho
      </Text>

      {/* Tarjeta usando surface-container + rounded-lg + spacing lg */}
      <View className="bg-surface-container rounded-lg p-lg mb-md">
        {/* headline-md + on-surface (texto sobre superficie elevada) */}
        <Text className="text-headline-md font-bold text-on-surface mb-sm">
          Reporte #4821
        </Text>

        {/* body-md + on-surface-variant (texto secundario/metadata) */}
        <Text className="text-body-md text-on-surface-variant mb-md">
          Av. 9 de Octubre y Malecón — hace 3 min
        </Text>

        {/* Badge de estado crítico: bg-critical con opacidad + rounded-full (píldora) */}
        <View className="bg-critical/15 border border-critical rounded-full px-md py-xs self-start mb-md">
          <Text className="text-body-sm font-bold text-critical uppercase">
            Crítico
          </Text>
        </View>

        {/* Badge de advertencia (checkpoint) */}
        <View className="bg-warning/15 border border-warning rounded-full px-md py-xs self-start mb-md">
          <Text className="text-body-sm font-bold text-warning uppercase">
            Punto de control
          </Text>
        </View>

        {/* Badge operacional (todo normal) */}
        <View className="bg-operational/15 border border-operational rounded-full px-md py-xs self-start">
          <Text className="text-body-sm font-bold text-operational uppercase">
            Activo
          </Text>
        </View>
      </View>

      {/* Botón primario: bg-primary + on-primary (texto que va SOBRE ese fondo) */}
      <Pressable className="bg-primary rounded-xl h-14 items-center justify-center mb-sm">
        <Text className="text-body-lg font-bold text-on-primary">
          Reportar Incidente
        </Text>
      </Pressable>

      {/* Botón secundario: bg-secondary + on-secondary */}
      <Pressable className="bg-secondary rounded-lg h-12 items-center justify-center mb-sm">
        <Text className="text-body-md font-bold text-on-secondary">
          Ver Historial
        </Text>
      </Pressable>

      {/* Botón terciario (tertiary) */}
      <Pressable className="bg-tertiary rounded-lg h-12 items-center justify-center mb-sm">
        <Text className="text-body-md font-bold">Contactar Cooperativa</Text>
      </Pressable>

      {/* Botón de error/peligro: error + on-error + error-container */}
      <View className="bg-error-container rounded-md p-md mb-sm">
        <Text className="text-body-sm text-on-error">
          No se pudo enviar el reporte. Intenta de nuevo.
        </Text>
      </View>

      {/* Superficie más oscura (container-lowest) para un panel hundido */}
      <View className="bg-surface-container-lowest rounded-sm p-sm mb-sm">
        <Text className="text-body-sm text-on-surface-variant">
          GPS: 2.1894° S, 79.8891° W
        </Text>
      </View>

      {/* Outline: borde sutil usando el color outline */}
      <View className="border border-outline rounded-md p-md">
        <Text className="text-body-sm text-on-surface">
          Zona verificada de cooperativa
        </Text>
      </View>

      {/* Telemetry (color azul de navegación/ruta) */}
      <Text className="text-telemetry text-headline-sm font-bold mt-md">
        Próximo giro: 200m
      </Text>

      {/* Caution (amarillo de congestión/precaución) */}
      <Text className="text-caution text-body-sm mt-xs">
        ⚠ Tráfico denso reportado adelante
      </Text>
    </View>
  );
}
