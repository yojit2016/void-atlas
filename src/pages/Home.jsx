import { useState, useEffect, useCallback } from 'react';
import SceneCanvas from '../components/canvas/SceneCanvas';
import VoidAtlasUI from '../components/ui/VoidAtlasUI';
import { useCosmicData } from '../hooks/useCosmicData';

export default function Home() {
  const [scrollController, setScrollController] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { images } = useCosmicData();
  const totalCount = images.length || 32;

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
    Math.floor(scrollProgress * totalCount) + 1,
    totalCount
  );

  return (
    <>
      <VoidAtlasUI
        modalOpen={modalOpen}
        onModalClose={handleModalClose}
        activeNode={activeNode}
        scrollProgress={scrollProgress}
        currentImage={currentImage}
        totalImages={totalCount}
      />
      <div style={{ height: `${totalCount * 80}vh` }} aria-hidden="true" />
      <SceneCanvas
        onSceneReady={setScrollController}
        onNodeClick={handleNodeClick}
      />
    </>
  );
}