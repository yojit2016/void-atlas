import StarCursor from '../components/ui/StarCursor'
import Home from '../pages/Home'


export default function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background: Starfield at z-0 */}
      
      
      {/* Atmosphere: Subtle vignette and atmospheric haze throughout */}
      <div className="fixed inset-0 z-5 pointer-events-none bg-radial-at-center from-transparent via-black/5 to-black/20" />
      
      {/* UI: Star Cursor */}
      <StarCursor />
      
      {/* Content: Home/gallery at dynamic z-layers */}
      <Home />
    </div>
  )
}
