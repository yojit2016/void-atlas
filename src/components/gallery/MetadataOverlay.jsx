import {motion} from "framer-motion";

export default function MetadataOverlay({ item , offset}) {
  return (
    <motion.div
    animate={{ x: offset.x * 0.5, y: offset.y * 0.5 }}
    transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
    className="absolute bottom-0 left-0 w-full p-10 z-20 bg-gradient-to-t from-black via-black/60 to-transparent text-white">

      <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-3">
        {item.objectType}
      </p>

      <h2 className="text-5xl md:text-6xl font-thin uppercase tracking-[0.1em]">
        {item.title}
      </h2>

      <div className="mt-6 flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-white/60">
        <span>{item.telescope}</span>
        <span>{item.captureDate}</span>
        <span>{item.constellation}</span>
      </div>
    </motion.div>
  );
}