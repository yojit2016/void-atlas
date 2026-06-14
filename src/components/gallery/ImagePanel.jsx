import { motion } from 'framer-motion'

import MetadataOverlay from './MetadataOverlay'

import useMouseParallax from '../../hooks/useMouseParallax'

export default function ImagePanel({ item }) {
  const offset = useMouseParallax()

  return (
    <section className="relative h-screen min-w-full snap-center overflow-hidden">
      <motion.img 
        src={item.image}
        alt={item.title}
        animate={{
          x:offset.x,
          y:offset.y,
          scale:1.08,
        }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.6,
        }}
        className="h-full w-full object-cover opacity-[0.82] mix-blend-lighten" />
        <div className='absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40' />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
        <MetadataOverlay item={item} offset={offset} />
        
    </section>
  )
}