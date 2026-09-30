import { useEffect, useRef, useState } from "react";
import {
    googleFetch,
    KEYS,
    LatLng,
    newSessionToken,
    PLACES_URL,
} from "../services/google";

export type Suggestion = { placeId: string; title: string; address: string };
export type Place = LatLng & { title: string; address: string };

export function usePlaceSearch(center: LatLng | null) {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const session = useRef(newSessionToken());
  const cache = useRef(new Map<string, Suggestion[]>());

  useEffect(() => {
    const query = text.trim().toLowerCase();
    if (query.length < 3) return setSuggestions([]);
    if (cache.current.has(query))
      return setSuggestions(cache.current.get(query)!);

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const data = await googleFetch(`${PLACES_URL}:autocomplete`, {
          key: KEYS.rutas,
          method: "POST",
          signal: controller.signal,
          body: JSON.stringify({
            input: query,
            languageCode: "es",
            sessionToken: session.current,
            includedRegionCodes: ["ec"],
            ...(center && {
              locationBias: { circle: { center, radius: 30000 } },
            }),
          }),
        });
        const results: Suggestion[] = (data.suggestions ?? [])
          .filter((s: any) => s.placePrediction)
          .map(({ placePrediction: p }: any) => ({
            placeId: p.placeId,
            title: p.structuredFormat.mainText.text,
            address: p.structuredFormat.secondaryText?.text ?? "",
          }));
        cache.current.set(query, results);
        setSuggestions(results);
      } catch (e: any) {
        if (e.name !== "AbortError") console.error("Autocomplete:", e);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [text]);

  const clearSearch = () => {
    setText("");
    setSuggestions([]);
  };

  // Al elegir: pedimos SOLO la ubicación (título y dirección ya los tenemos) y cerramos la sesión.
  const selectSuggestion = async (s: Suggestion): Promise<Place> => {
    const data = await googleFetch(
      `${PLACES_URL}/${s.placeId}?sessionToken=${session.current}`,
      {
        key: KEYS.lugares,
        fieldMask: "location",
      },
    );
    session.current = newSessionToken();
    clearSearch();
    return { ...data.location, title: s.title, address: s.address };
  };

  return { text, setText, suggestions, selectSuggestion, clearSearch };
}
