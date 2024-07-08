// hooks/useConfig.js
import { useMemo } from 'react';

function useConfig() {
  // Usamos useMemo para asegurarnos de que los valores no se recalculan con cada render
  const config = useMemo(() => ({
    API_URL: 'https://api.themoviedb.org/3',
    API_KEY: '3d0a683ff62e01abe696957e1641fa3b',
    IMAGE_PATH: 'https://image.tmdb.org/t/p/original',
    URL_IMAGE: 'https://image.tmdb.org/t/p/original'
  }), []);

  return config;
}

export default useConfig;
