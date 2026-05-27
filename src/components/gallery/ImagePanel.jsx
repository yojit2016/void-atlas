import {motion} from "framer-motion";   
import MetadataOverlay from "./MetadataOverlay";
import useMouseParallax from "../../hooks/useMouseParallax";

export default function ImagePanel({ item }) {
  // Use refined easing for smooth, atmospheric drift (0.08 = slower, more cinematic feel)
  const offset = useMouseParallax(35, 0.08);

  return (
    <div className="relative h-screen w-screen flex-shrink-0 overflow-hidden bg-black">
      {/* Atmospheric fog layer - creates depth separation */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none" />

      <motion.img
        src={item.imageUrl}
        alt={item.title}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
        className="h-full w-full object-cover scale-110 opacity-82 mix-blend-lighten"
      />

      {/* Slightly darker overlay to enhance depth and starfield visibility */}
      <div className="absolute inset-0 bg-black/12 mix-blend-multiply" />

      <MetadataOverlay item={item} offset={offset} />
    </div>
  );
}