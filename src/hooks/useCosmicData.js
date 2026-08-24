import { useState, useEffect } from 'react';
import { fetchAPODImages, fetchNASAImageLibrary } from '../api/nasaApi';
import { localSpaceArchive } from '../data/fallbackSpaceData';

function shuffleAndSlice(arr, count) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
}

export function useCosmicData() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');

  useEffect(() => {
    async function loadImages() {
      try {
        // Try NASA APOD first
        const apodImages = await fetchAPODImages(8);
        const libraryImages = await fetchNASAImageLibrary('nebula galaxy hubble', 8);
        const combined = [...apodImages, ...libraryImages];

        if (combined.length >= 6) {
          const valid = combined.filter(img => img.image && img.title);
          setImages(shuffleAndSlice(valid, 12));
          setSource('NASA Live Archive');
          return;
        }
      } catch (err) {
        console.warn('NASA API unavailable, using local archive:', err.message);
      }

      // Fallback to local archive
      setImages(shuffleAndSlice(localSpaceArchive, 12));
      setSource('Local Archive');
    }

    loadImages().finally(() => setLoading(false));
  }, []);

  return { images, loading, source };
}

export default useCosmicData;
