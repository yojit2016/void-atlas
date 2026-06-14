export default function Loader() {
  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-cyan-300" />
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
        Synchronizing Cosmic Archive
        </p>
      </div>
    </div>
      
  );
}