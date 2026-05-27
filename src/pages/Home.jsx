import { motion } from 'framer-motion'
 
export default function Home() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-6 text-sm uppercase tracking-[0.5em] text-white/40"
      >
        Live Obervation Feed
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="max-w-6xl text-6xl md:text-8xl font-thin uppercase tracking-[0.15em] leading-tight"
      >
        Drift Through
        <br />
        Deep Space
      </motion.h1>
    </section>
  )
}
