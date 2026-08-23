import { useEffect, useState } from "react";

import { fetchNASAImageLibrary } from "../api/nasaApi";
import { fallbackSpaceData } from "../data/fallbackSpaceData";

function checkImageDimensions(url) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight,
        valid: img.naturalWidth >= 300,
      });
    };

    img.onerror = () => {
      resolve({
        width: 0,
        height: 0,
        aspectRatio: 0,
        valid: false,
      });
    };

    img.src = url;
  });
}

export function useCosmicData() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);

        console.log("Fetching NASA Image Library...");

        const libraryImages = await fetchNASAImageLibrary(
          "nebula",
          50
        );

        let verifiedImages = [];

        if (libraryImages.length > 0) {
          const checked = await Promise.all(
            libraryImages.map(async (item) => {
              const dims = await checkImageDimensions(
                item.image
              );

              return {
                ...item,
                dims,
              };
            })
          );

          verifiedImages = checked
            .filter((item) => {
              if (item.dims.valid) {
                return true;
              }

              console.warn(
                `Rejected "${item.title}" (${item.dims.width}px wide)`
              );

              return false;
            })
            .map((item) => ({
              ...item,
              width: item.dims.width,
              height: item.dims.height,
              aspectRatio: item.dims.aspectRatio,
            }));
        }

        if (verifiedImages.length >= 8) {
          console.log(
            `Loaded ${verifiedImages.length} verified NASA images.`
          );

          setImages(verifiedImages.slice(0, 8));
          return;
        }

        console.warn(
          "NASA Image Library returned too few valid images. Using fallback archive."
        );

        const checkedFallbacks = await Promise.all(
          fallbackSpaceData.map(async (item) => {
            const dims = await checkImageDimensions(
              item.image
            );

            return {
              ...item,
              width: dims.width,
              height: dims.height,
              aspectRatio: dims.aspectRatio,
            };
          })
        );

        setImages(checkedFallbacks);
      } catch (err) {
        console.error(err);

        setError(true);

        const checkedFallbacks = await Promise.all(
          fallbackSpaceData.map(async (item) => {
            const dims = await checkImageDimensions(
              item.image
            );

            return {
              ...item,
              width: dims.width,
              height: dims.height,
              aspectRatio: dims.aspectRatio,
            };
          })
        );

        setImages(checkedFallbacks);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  return {
    images,
    loading,
    error,
  };
}
