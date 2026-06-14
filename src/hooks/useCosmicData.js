import { useEffect, useState } from 'react'

import { fetchAPODImages, fetchNASAImageLibrary } from '../api/nasaApi'
import { fallbackSpaceData } from '../data/fallbackSpaceData'

function checkImageDimensions(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight,
        valid: img.naturalWidth >= 1280
      });
    };
    img.onerror = () => {
      resolve({
        width: 0,
        height: 0,
        aspectRatio: 0,
        valid: false
      });
    };
    img.src = url;
  });
}

export function useCosmicData() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true)

        // 1. Try APOD first
        console.log('Fetching live APOD images...');
        const apodImages = await fetchAPODImages(50)
        let verifiedAPOD = []

        if (apodImages.length > 0) {
          const checked = await Promise.all(
            apodImages.map(async (item) => {
              const dims = await checkImageDimensions(item.image);
              return { ...item, dims };
            })
          );

          verifiedAPOD = checked
            .filter((item) => {
              if (item.dims.valid) {
                return true;
              }
              console.warn(`Rejected live APOD image "${item.title}" because width ${item.dims.width}px is less than 1280px.`);
              return false;
            })
            .map((item) => ({
              ...item,
              width: item.dims.width,
              height: item.dims.height,
              aspectRatio: item.dims.aspectRatio
            }));
        }

        // If APOD gave us 5 or more verified high-res images, use them!
        if (verifiedAPOD.length >= 5) {
          console.log(`Loaded ${verifiedAPOD.length} high-res APOD images.`);
          setImages(verifiedAPOD.slice(0, 8))
          setLoading(false)
          return;
        }

        console.warn(`APOD yielded only ${verifiedAPOD.length} high-res images. Querying NASA Image Library...`);

        // 2. Try NASA Image Library
        const libraryImages = await fetchNASAImageLibrary('nebula', 50)
        let verifiedLibrary = []

        if (libraryImages.length > 0) {
          const checked = await Promise.all(
            libraryImages.map(async (item) => {
              const dims = await checkImageDimensions(item.image);
              return { ...item, dims };
            })
          );

          verifiedLibrary = checked
            .filter((item) => {
              if (item.dims.valid) {
                return true;
              }
              console.warn(`Rejected live library image "${item.title}" because width ${item.dims.width}px is less than 1280px.`);
              return false;
            })
            .map((item) => ({
              ...item,
              width: item.dims.width,
              height: item.dims.height,
              aspectRatio: item.dims.aspectRatio
            }));
        }

        // If NASA Image Library gave us 5 or more verified images, use them!
        if (verifiedLibrary.length >= 5) {
          console.log(`Loaded ${verifiedLibrary.length} high-res NASA Image Library images.`);
          setImages(verifiedLibrary.slice(0, 8))
          setLoading(false)
          return;
        }

        console.warn(`NASA Image Library yielded only ${verifiedLibrary.length} high-res images. Falling back to local archive...`);

        // 3. Fallback to local archive
        const checkedFallbacks = await Promise.all(
          fallbackSpaceData.map(async (item) => {
            const dims = await checkImageDimensions(item.image);
            return {
              ...item,
              width: dims.width,
              height: dims.height,
              aspectRatio: dims.aspectRatio
            };
          })
        );
        setImages(checkedFallbacks)
      } catch (err) {
        console.error(err)
        setError(true)

        // Fallback to local archive on error
        const checkedFallbacks = await Promise.all(
          fallbackSpaceData.map(async (item) => {
            const dims = await checkImageDimensions(item.image);
            return {
              ...item,
              width: dims.width,
              height: dims.height,
              aspectRatio: dims.aspectRatio
            };
          })
        );
        setImages(checkedFallbacks)
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  return {
    images,
    loading,
    error,
  }
}
