import MetadataOverlay from "./MetadataOverlay";

export default function ImagePanel({ item }) {
  return (
    <div className="relative h-screen w-screen flex-shrink-0 overflow-hidden">

      <img
        src={item.imageUrl}
        alt={item.title}
        className="h-full w-full object-cover scale-105 opacity-90 mix-blend-screen"
      />

      <MetadataOverlay item={item} />
    </div>
  );
}