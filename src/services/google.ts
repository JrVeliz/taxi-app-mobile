// Llave en .env → EXPO_PUBLIC_GOOGLE_API_KEY (restringida a Places API (New) y Routes API)
export const KEYS = {
  lugares: process.env.EXPO_PUBLIC_LUGARES ?? "",
  rutas: process.env.EXPO_PUBLIC_RUTAS ?? "",
};

export const PLACES_URL = "https://places.googleapis.com/v1/places";
const ROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

// TRAFFIC_AWARE es más preciso pero se factura en un nivel más caro que TRAFFIC_UNAWARE.
const ROUTING_PREFERENCE = "TRAFFIC_AWARE";
const ROUTE_CACHE_MS = 3 * 60 * 1000;

export type LatLng = { latitude: number; longitude: number };
export type Route = { coords: LatLng[]; distance: string; duration: string };

// Un solo lugar para headers, FieldMask y manejo de errores de Google.
export async function googleFetch(
  url: string,
  init: RequestInit & { key: string; fieldMask?: string },
) {
  const { key, fieldMask, ...options } = init;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      ...(fieldMask && { "X-Goog-FieldMask": fieldMask }),
    },
  });
  const data = await res.json();
  if (!res.ok)
    throw new Error(data.error?.message ?? `Google API ${res.status}`);
  return data;
}

// Agrupa autocompletado + selección en UNA sesión de facturación.
export const newSessionToken = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });

// Decodifica el "encoded polyline" de Google a una lista de coordenadas.
export function decodePolyline(encoded: string): LatLng[] {
  const points: LatLng[] = [];
  let index = 0,
    lat = 0,
    lng = 0;

  const readValue = () => {
    let result = 0,
      shift = 0,
      b: number;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    return result & 1 ? ~(result >> 1) : result >> 1;
  };

  while (index < encoded.length) {
    lat += readValue();
    lng += readValue();
    points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return points;
}

// Routes API con caché en memoria: misma ruta en pocos minutos = 0 llamadas extra.
const routeCache = new Map<string, { route: Route; at: number }>();

export async function computeRoute(from: LatLng, to: LatLng): Promise<Route> {
  const key = [from, to]
    .map((p) => `${p.latitude.toFixed(4)},${p.longitude.toFixed(4)}`)
    .join("|");
  const cached = routeCache.get(key);
  if (cached && Date.now() - cached.at < ROUTE_CACHE_MS) return cached.route;

  const waypoint = (p: LatLng) => ({
    location: { latLng: { latitude: p.latitude, longitude: p.longitude } },
  });
  const data = await googleFetch(ROUTES_URL, {
    key: KEYS.rutas,
    method: "POST",
    fieldMask:
      "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
    body: JSON.stringify({
      origin: waypoint(from),
      destination: waypoint(to),
      travelMode: "DRIVE",
      routingPreference: ROUTING_PREFERENCE,
      polylineQuality: "OVERVIEW", // menos puntos = respuesta más liviana
    }),
  });

  const r = data.routes?.[0];
  if (!r) throw new Error("No hay ruta disponible.");

  const route: Route = {
    coords: decodePolyline(r.polyline.encodedPolyline),
    distance: `${(r.distanceMeters / 1000).toFixed(1)} km`,
    duration: `${Math.ceil(parseInt(r.duration) / 60)} min`, // Google devuelve "123s"
  };
  routeCache.set(key, { route, at: Date.now() });
  return route;
}
