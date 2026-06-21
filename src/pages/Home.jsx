import Loader from "../components/ui/Loader";
import ObservatoryHUD from "../components/hud/ObservatoryHUD";
import SceneCanvas from "../components/canvas/SceneCanvas";
import { useCosmicData } from "../hooks/useCosmicData";

export default function Home(){
  const {images, loading}= useCosmicData();

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <SceneCanvas />
      <div className="relative z-10">
        <ObservatoryHUD count={images.length} />
      </div>
    </section>
  );
}