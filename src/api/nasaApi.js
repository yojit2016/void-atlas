const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
const APOD_BASE = 'https://api.nasa.gov/planetary/apod';
const IMAGE_LIBRARY_BASE = 'https://images-api.nasa.gov/search';

export async function fetchAPODImages(count = 12) {
  const res = await fetch(
    `${APOD_BASE}?api_key=${NASA_API_KEY}&count=${count}`
  );
  if (!res.ok) throw new Error(`APOD fetch failed: ${res.status}`);
  const data = await res.json();
  return data
    .filter(item => item.media_type === 'image' && item.url)
    .map(item => ({
      id: item.date,
      title: item.title,
      image: item.hdurl || item.url,
      description: item.explanation,
      captureDate: item.date,
      telescope: item.copyright ? `© ${item.copyright}` : 'NASA APOD',
      objectType: 'Astronomy Picture',
      constellation: '',
      sourceName: 'NASA APOD',
      sourceUrl: `https://apod.nasa.gov/apod/ap${item.date.replace(/-/g, '').slice(2)}.html`,
    }));
}

export async function fetchNASAImageLibrary(query = 'nebula galaxy', count = 12) {
  const res = await fetch(
    `${IMAGE_LIBRARY_BASE}?q=${encodeURIComponent(query)}&media_type=image&page_size=${count}`
  );
  if (!res.ok) throw new Error(`NASA Image Library fetch failed: ${res.status}`);
  const data = await res.json();
  const items = data.collection?.items || [];
  return items
    .filter(item => item.links?.[0]?.href)
    .map(item => {
      const meta = item.data?.[0] || {};
      return {
        id: meta.nasa_id || Math.random().toString(36).slice(2),
        title: meta.title || 'Untitled',
        image: item.links[0].href,
        description: meta.description || '',
        captureDate: meta.date_created?.slice(0, 10) || '',
        telescope: meta.secondary_creator || meta.center || 'NASA',
        objectType: meta.keywords?.[0] || 'Deep Space',
        constellation: '',
        sourceName: 'NASA Image Library',
        sourceUrl: `https://images.nasa.gov/details/${meta.nasa_id}`,
      };
    });
}