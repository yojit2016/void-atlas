import { useState, useCallback } from 'react';
import SceneCanvas from '../components/canvas/SceneCanvas';
import VoidAtlasUI from '../components/ui/VoidAtlasUI';

export default function Home() {
  const [scrollController, setScrollController] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  const handleNodeClick = useCallback((nodeData) => {
    setActiveNode(nodeData);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <VoidAtlasUI
        modalOpen={modalOpen}
        onModalClose={handleModalClose}
        activeNode={activeNode}
      />
      <div style={{ height: '1400vh' }} aria-hidden="true" />
      <SceneCanvas
        onSceneReady={setScrollController}
        onNodeClick={handleNodeClick}
      />
    </>
  );
}