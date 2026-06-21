import { useEffect, useRef } from "react";
import VoidAtlasScene from "../../scene/VoidAtlasScene";

export default function SceneCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if(!canvasRef.current) return;
        const scene= new VoidAtlasScene(canvasRef.current);

        return () => {
            scene.destroy();
        };
    }, []);

    return (
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full block bg-black" />
    );
}