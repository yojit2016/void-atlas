import { useEffect, useState } from "react";

import {
  fetchAPODImages,
  fetchNASAImageLibrary,
} from "../api/nasaApi";

import { fallbackSpaceData } from "../data/fallbackSpaceData";

function checkImageDimensions(url) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio:
          img.naturalWidth / img.naturalHeight,
        valid: img.naturalWidth >= 1280,
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

        console.log(
          "Fetching NASA APOD images..."
        );

        // --------------------------------------------------
        // 1. NASA APOD
        // --------------------------------------------------

        const apodImages =
          await fetchAPODImages(50);

        let verifiedAPOD = [];

        if (apodImages.length > 0) {
          const checked =
            await Promise.all(
              apodImages.map(async (item) => {
                const dims =
                  await checkImageDimensions(
                    item.image
                  );

                return {
                  ...item,
                  dims,
                };
              })
            );

          verifiedAPOD = checked
            .filter((item) => {
              if (item.dims.valid) {
                return true;
              }

              console.warn(
                `Rejected APOD image "${item.title}" (${item.dims.width}px wide)`
              );

              return false;
            })
            .map((item) => ({
              ...item,

              width: item.dims.width,

              height: item.dims.height,

              aspectRatio:
                item.dims.aspectRatio,
            }));
        }

        if (verifiedAPOD.length >= 5) {
          console.log(
            `Loaded ${verifiedAPOD.length} verified APOD images.`
          );

          setImages(
            verifiedAPOD.slice(0, 8)
          );

          return;
        }

        console.warn(
          `Only ${verifiedAPOD.length} APOD images passed validation. Falling back to NASA Image Library...`
        );

        // --------------------------------------------------
        // 2. NASA IMAGE LIBRARY
        // --------------------------------------------------

        const libraryImages =
          await fetchNASAImageLibrary(
            "nebula",
            50
          );

        let verifiedLibrary = [];

        if (libraryImages.length > 0) {
          const checked =
            await Promise.all(
              libraryImages.map(
                async (item) => {
                  const dims =
                    await checkImageDimensions(
                      item.image
                    );

                  return {
                    ...item,
                    dims,
                  };
                }
              )
            );

          verifiedLibrary = checked
            .filter((item) => {
              if (item.dims.valid) {
                return true;
              }

              console.warn(
                `Rejected NASA Library image "${item.title}" (${item.dims.width}px wide)`
              );

              return false;
            })
            .map((item) => ({
              ...item,

              width: item.dims.width,

              height: item.dims.height,

              aspectRatio:
                item.dims.aspectRatio,
            }));
        }

        if (verifiedLibrary.length >= 5) {
          console.log(
            `Loaded ${verifiedLibrary.length} verified NASA Library images.`
          );

          setImages(
            verifiedLibrary.slice(0, 8)
          );

          return;
        }

        console.warn(
          "NASA Image Library also failed validation. Using bundled fallback images."
        );

        // --------------------------------------------------
        // 3. LOCAL FALLBACK
        // --------------------------------------------------

        const checkedFallbacks =
          await Promise.all(
            fallbackSpaceData.map(
              async (item) => {
                const dims =
                  await checkImageDimensions(
                    item.image
                  );

                return {
                  ...item,

                  width: dims.width,

                  height: dims.height,

                  aspectRatio:
                    dims.aspectRatio,
                };
              }
            )
          );

        setImages(checkedFallbacks);
      } catch (err) {
        console.error(err);

        setError(true);

        const checkedFallbacks =
          await Promise.all(
            fallbackSpaceData.map(
              async (item) => {
                const dims =
                  await checkImageDimensions(
                    item.image
                  );

                return {
                  ...item,

                  width: dims.width,

                  height: dims.height,

                  aspectRatio:
                    dims.aspectRatio,
                };
              }
            )
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
