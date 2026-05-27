export default function Navbar() {
  return (
    <nav className='fixed top-0 left-0 z-50 w-full px-8 py-6 flex items-center justify-between'>
      <h1 className="text-lg uppercase tracking-[0.45em] font-light">Void Atlas</h1>
      <div className="flex gap-8 text-sm uppercase tracking-[0.2em] text-white/50">
        <button>Deepfield</button>
        <button>Nebulae</button>
        <button>Signals</button>
      </div>
    </nav>
  );
}
