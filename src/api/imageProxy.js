export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({
            error:"Missing image URL.",
        });
    }

    try {

        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).json({
                error:'Unable to fetch remote image.',
            });

        }
        const contentType = response.headers.get("Content-type")||"image/jpeg";
        res.setHeader("Content-type", contentType);
        // Cache images for one day
        res.setHeader("Cache-Control", "public, max-age=86400");

        //Allow browser access
        res.setHeader("Access-Control-Allow-Origin", "*");

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.status(200).send(buffer);
    } catch (error) {
        console.error("Image proxy error:", error);
        res.status(500).json({
            error:"Image proxy failed.",
        });
    }


}