import {motion} from "framer-motion";
import { formatDate, truncateText } from '../../utils/formatters';
export default function MetadataOverlay({ item, offset }) {
  return (
    <motion.div
    animate={{ x: offset.x * 0.5, y: offset.y * 0.5 }} // Subtle parallax for metadata
    transition={{ type: "tween",  ease: "easeOut",duration: 0.6 }}
    className="absolute bottom-0 left-0 z-20 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-8"
  >
    <div className="max-w-3xl  space-y-4">
      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
      {item.telescope}</p>
      <h2 className="text-4xl font-light tracking-wide text-white md:text-6xl">{item.title}</h2>
      <p className="max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">{truncateText(item.description, 220)}</p>
    <div className="flex flex-wrap gap-6 pt-2 text-sm uppercase tracking-[0.25em] text-white/60">
      <span>{formatDate(item.captureDate)}</span>
      <span>{item.objectType}</span>
      <span>{item.constellation}</span>
    </div>
    </div>
  </motion.div>
  )
}