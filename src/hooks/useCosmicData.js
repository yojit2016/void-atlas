import { useState, useEffect } from 'react';
import { localSpaceArchive } from '../data/fallbackSpaceData';

function shuffleAndSlice(arr, count) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
}

export function useCosmicData() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('Local Archive');

  useEffect(() => {
    // Load directly from curated local archive of NASA imagery
    // Fast, offline-ready, no API rate limits or network failures
    setImages(localSpaceArchive);
    setLoading(false);
  }, []);

  return { images, loading, source };
}

export default useCosmicData;
