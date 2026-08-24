import { useState, useEffect, useCallback } from 'react';
import SceneCanvas from '../components/canvas/SceneCanvas';
import VoidAtlasUI from '../components/ui/VoidAtlasUI';

export default function Home() {
  const [scrollController, setScrollController] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNodeClick = useCallback((nodeData) => {
    setActiveNode(nodeData);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const currentImage = Math.min(
    Math.floor(scrollProgress * 12) + 1,
    12
  );

  return (
    <>
      <VoidAtlasUI
        modalOpen={modalOpen}
        onModalClose={handleModalClose}
        activeNode={activeNode}
        scrollProgress={scrollProgress}
        currentImage={currentImage}
        totalImages={12}
      />
      <div style={{ height: `${12 * 150}vh` }} aria-hidden="true" />
      <SceneCanvas
        onSceneReady={setScrollController}
        onNodeClick={handleNodeClick}
      />
    </>
  );
}