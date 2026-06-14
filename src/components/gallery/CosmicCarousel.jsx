import ImagePanel from "./ImagePanel";
export default function CosmicCarousel({ items }) {
  return (
    <div className="flex h-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth"
      style={{ scrollbarWidth: 'none' }}>
        {items.map((item) => (
          <ImagePanel key={item.id} item={item} />
        ))}
    </div>
  );
}
      