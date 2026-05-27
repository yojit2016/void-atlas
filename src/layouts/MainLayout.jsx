import Navbar from '../components/ui/Navbar'
import StarCursor from '../components/ui/StarCursor'
import Home from '../pages/Home'
import StarfieldCanvas from '../components/cosmic/StarfieldCanvas'

export default function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background: Starfield at z-0 */}
      <StarfieldCanvas />
      
      {/* Atmosphere: Subtle vignette and atmospheric haze throughout */}
      <div className="fixed inset-0 z-5 pointer-events-none bg-radial-at-center from-transparent via-black/5 to-black/20" />
      
      {/* UI: Navbar and cursor at top */}
      <StarCursor />
      <Navbar />
      
      {/* Content: Home/gallery at dynamic z-layers */}
      <Home />
    </div>
  )
}
