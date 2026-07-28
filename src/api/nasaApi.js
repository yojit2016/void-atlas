const NASA_API_KEY =
  import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
const proxyImage = (url) =>
  `/api/imageProxy?url=${encodeURIComponent(url)}`;
/**
 * NASA Image Library
 */
export async function fetchNASAImageLibrary(
  query = "nebula",
  count = 8
) {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(
        query
      )}&media_type=image`
    );

    const data = await response.json(); 

    const items = data?.collection?.items || [];

    const mapped = items
      .slice(0, Math.max(count, 100))
      .map((item, index) => {
        const dataObj = item.data?.[0] || {};
        const linkObj = item.links?.[0] || {};

        const previewUrl = linkObj.href || "";

        const imageUrl = previewUrl;//replace(/~(thumb|medium|small|large)\.(jpg|jpeg|png)$/i,"~orig.$2");

        return {
          id:
            (dataObj.nasa_id || `img-${index}`) +
            "-" +
            index,

          title:
            dataObj.title ||
            "Untitled Space Object",

          image: proxyImage(item.hdurl || item.url),

          description:
            dataObj.description ||
            dataObj.title ||
            "Beautiful cosmic imagery.",

          captureDate: dataObj.date_created
            ? dataObj.date_created.split("T")[0]
            : new Date()
                .toISOString()
                .split("T")[0],

          telescope:
            dataObj.secondary_creator ||
            "NASA Image Library",

          objectType:
            query.charAt(0).toUpperCase() +
            query.slice(1),

          constellation: "Deep Space",

          sourceUrl: dataObj.nasa_id
            ? `https://images.nasa.gov/details/${dataObj.nasa_id}`
            : "https://images.nasa.gov/",

          sourceName: "NASA Image Library",
        };
      })
      .filter((item) => item.image);

    return mapped.slice(0, count);
  } catch (error) {
    console.error(
      "NASA Image Library API error:",
      error
    );
    return [];
  }
}

/**
 * NASA Astronomy Picture of the Day
 */
export async function fetchAPODImages(
  count = 8
) {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${count}`
    );

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(
        data?.error?.message ||
          "NASA APOD returned invalid response."
      );
    }

    const filtered = data
      .filter(
        (item) =>
          item.media_type === "image"
      )
      .map((item, index) => ({
        id: `${item.date}-${index}`,

        title: item.title,

        image:
          item.hdurl || item.url,

        description:
          item.explanation,

        captureDate: item.date,

        telescope:
          "NASA Astronomy Picture of the Day",

        objectType:
          "Deep Space Object",

        constellation:
          "Unknown",

        sourceUrl:
          "https://apod.nasa.gov/apod/astropix.html",

        sourceName:
          "NASA APOD",
      }));

    if (filtered.length > 0) {
      return filtered;
    }

    console.warn(
      "NASA APOD returned no usable images. Falling back to NASA Image Library..."
    );

    return await fetchNASAImageLibrary(
      "nebula",
      count
    );
  } catch (error) {
    console.error(
      "NASA APOD API error:",
      error
    );

    console.warn(
      "Falling back to NASA Image Library..."
    );

    return await fetchNASAImageLibrary(
      "nebula",
      count
    );
  }
}