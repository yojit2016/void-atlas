import CosmicCarousel from "../components/gallery/CosmicCarousel";
import Loader from "../components/ui/Loader";
import {useCosmicData} from "../hooks/useCosmicData";
export default function Home() {
  const { images, loading } = useCosmicData();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="relative z-10 h-screen overflow-hidden">
      <CosmicCarousel items={images} />
    </section> 
  );
}