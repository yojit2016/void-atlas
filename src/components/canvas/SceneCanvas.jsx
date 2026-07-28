import { useEffect, useRef } from "react";
import VoidAtlasScene from "../../scene/VoidAtlasScene";
import { useCosmicData } from "../../hooks/useCosmicData";

export default function SceneCanvas() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  const { images } = useCosmicData();

  // Create Three.js scene once
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new VoidAtlasScene(canvasRef.current);
    sceneRef.current = scene;

    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
  }, []);

  // Apply NASA images when they finish loading
  useEffect(() => {
    if (!sceneRef.current) return;
    if (!images || images.length === 0) return;

    sceneRef.current.carousel.setImages(images);
  }, [images]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full block bg-black"
    />
  );
}