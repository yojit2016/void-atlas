import mockSpaceData from "../../data/mockSpaceData";
import ImagePanel from "./ImagePanel";

export default function CosmicCarousel() {
  return (
    <div className=" flex
        h-screen
        w-full
        overflow-x-auto
        overflow-y-hidden
        snap-x
        snap-mandatory
        scroll-smooth">

      {mockSpaceData.map((item) => (
        <div key={item.id} 
        className="snap-center">
          <ImagePanel item={item} />
        </div>
      ))}

    </div>
  );
}