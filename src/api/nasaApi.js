const NASA_API_KEY =
  import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";// Replace with your actual NASA API key
export async function fetchNASAImageLibrary(query = 'nebula', count = 8) {
    try {
        const response = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`);
        const data = await response.json();
        const items = data?.collection?.items || [];
        
        const mapped = items.slice(0, 100).map((item, index) => {
            const dataObj = item.data?.[0] || {};
            const linkObj = item.links?.[0] || {};
            const previewUrl = linkObj.href || '';
            const imageUrl = previewUrl.replace(/~(thumb|medium|small|large)\.(jpg|jpeg|png)$/i, '~orig.$2');
            
            return {
                id: (dataObj.nasa_id || ('img-' + index)) + '-' + index,
                title: dataObj.title || 'Untitled Space Object',
                image: imageUrl,
                description: dataObj.description || dataObj.title || 'Beautiful cosmic imagery.',
                captureDate: dataObj.date_created ? dataObj.date_created.split('T')[0] : new Date().toISOString().split('T')[0],
                telescope: dataObj.secondary_creator || 'NASA Cosmic Archive',
                objectType: query.charAt(0).toUpperCase() + query.slice(1),
                constellation: 'Deep Space',
            };
        }).filter(item => item.image);
        
        return mapped;
    } catch (error) {
        console.error('NASA Image Library API error:', error);
        return [];
    }
}

export async function fetchAPODImages(count = 8) {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${count}`);
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error(data?.error?.message || 'NASA API returned non-array response');
        }
        const filtered= data.filter((item)=> item.media_type === 'image').map((item, index) => ({
            id: item.date + index, // Unique ID based on date and index
            
            title: item.title,
            image: item.url,
            description: item.explanation,
            captureDate: item.date,
            telescope:'NASA ASTRONOMY PICTURE OF THE DAY',
            objectType: 'Deep Space Object',
            constellation: 'Unknown',
        }));
        
        if (filtered.length > 0) {
            return filtered;
        }
        console.warn('NASA APOD API returned 0 images. Falling back to NASA Image Library...');
        return await fetchNASAImageLibrary('nebula', count);
    } catch (error) {
        console.error('NASA API error:', error);
        console.log('Attempting fallback to NASA Image Library...');
        return await fetchNASAImageLibrary('nebula', count);
    }
}