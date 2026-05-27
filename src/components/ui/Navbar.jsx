export default function Navbar() {
  return (
    <nav className='fixed top-0 left-0 z-40 w-full px-8 py-6 flex items-center justify-between backdrop-blur-sm bg-black/10 border-b border-white/5'>
      <h1 className="text-lg uppercase tracking-[0.45em] font-light">Void Atlas</h1>
      <div className="flex gap-8 text-sm uppercase tracking-[0.2em] text-white/50 hover:text-white/70 transition-colors">
        <button className="hover:text-white/90 transition-colors">Deepfield</button>
        <button className="hover:text-white/90 transition-colors">Nebulae</button>
        <button className="hover:text-white/90 transition-colors">Signals</button>
      </div>
    </nav>
  );
}
