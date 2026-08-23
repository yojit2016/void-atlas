import { useEffect, useRef, useState } from "react";
import VoidAtlasScene from "../../scene/VoidAtlasScene";
import { useCosmicData } from "../../hooks/useCosmicData";
import NodeDetailModal from "../ui/NodeDetailModal";
import ObservatoryHUD from "../hud/ObservatoryHUD";

function isWebGLSupported() {
  try {
    const canvas = document.createElement("canvas");

    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") ||
        canvas.getContext("webgl"))
    );
  } catch (e) {
    return false;
  }
}

export default function SceneCanvas() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  const [webGLSupported, setWebGLSupported] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const { images } = useCosmicData();

  // =========================
  // Create Three.js scene
  // =========================
  useEffect(() => {
    if (!canvasRef.current) return;

    if (!isWebGLSupported()) {
      setWebGLSupported(false);
      return;
    }

    const scene = new VoidAtlasScene(canvasRef.current);

    scene.onNodeClick = (nodeData) => {
      setSelectedItem(nodeData);
    };

    sceneRef.current = scene;

    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
  }, []);

  // =========================
  // Apply NASA images
  // =========================
  useEffect(() => {
    if (!sceneRef.current) return;
    if (!images || images.length === 0) return;

    sceneRef.current.carousel.setImages(images);
  }, [images]);

  // =========================
  // WebGL Fallback
  // =========================
  if (!webGLSupported) {
    return (
      <div
        className="fixed inset-0 overflow-y-auto"
        style={{
          background:
            "linear-gradient(180deg, #020208 0%, #0a0a1a 50%, #020208 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-8 py-24">
          <p
            className="text-xs uppercase tracking-widest mb-12"
            style={{
              color: "rgba(100,220,255,0.5)",
            }}
          >
            Interactive 3D mode requires WebGL — showing archive view
          </p>

          <div className="grid grid-cols-2 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedItem(img)}
                className="group block cursor-pointer"
              >
                <div
                  className="aspect-video overflow-hidden mb-3"
                  style={{
                    border: "1px solid rgba(100,220,255,0.15)",
                  }}
                >
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>

                <p className="text-sm font-light tracking-wide text-white/70 group-hover:text-white/90 transition-colors">
                  {img.title}
                </p>

                <p
                  className="text-xs mt-1"
                  style={{
                    color: "rgba(100,220,255,0.5)",
                  }}
                >
                  {img.sourceName}
                </p>
              </div>
            ))}
          </div>
        </div>
        {selectedItem && (
          <NodeDetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    );
  }

  // =========================
  // WebGL Canvas & HUD Overlay
  // =========================
  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full block bg-black"
      />
      <ObservatoryHUD count={images.length} />
      {selectedItem && (
        <NodeDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}