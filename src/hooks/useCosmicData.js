import { useState, useEffect } from "react";
import { localSpaceArchive } from "../data/fallbackSpaceData";

export function useCosmicData() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Shuffle the archive and pick 12 images for this session
    // Different 12 every page load = fresh experience each visit
    const shuffled = [...localSpaceArchive].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 12);
    setImages(selected);
    setLoading(false);
  }, []);

  return { images, loading };
}
