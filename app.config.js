export default ({ config }) => ({
  ...config,
  ios: {
    ...config.ios,
    config: { googleMapsApiKey: process.env.EXPO_PUBLIC_MAPAS },
  },
  android: {
    ...config.android,
    config: { googleMaps: { apiKey: process.env.EXPO_PUBLIC_MAPAS } },
  },
});
