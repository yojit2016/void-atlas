import Navbar from '../components/ui/Navbar'
import StarCursor from '../components/ui/StarCursor'
import Home from '../pages/Home'
import StarfieldCanvas from '../components/cosmic/StarfieldCanvas'

export default function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cosmic-black text-white">
      <StarCursor />
      <StarfieldCanvas />
      <Navbar />
      <Home />
      
    </div>
  )
}
