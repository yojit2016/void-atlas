import { useState } from 'react';
import SceneCanvas from '../components/canvas/SceneCanvas';
import VoidAtlasUI from '../components/ui/VoidAtlasUI';

export default function Home() {
  const [scrollController, setScrollController] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  const handleNodeClick = (nodeData) => {
    setActiveNode(nodeData);
    setModalOpen(true);
  };

  return (
    <>
      <VoidAtlasUI
        onDeepfield={() => scrollController?.scrollToSection('deepfield')}
        onNebulae={() => scrollController?.scrollToSection('nebulae')}
        onSignals={() => scrollController?.scrollToSection('signals')}
        modalOpen={modalOpen}
        onModalClose={() => setModalOpen(false)}
        activeNode={activeNode}
      />
      <div style={{ height: '800vh' }} aria-hidden="true" />
      <SceneCanvas
        onSceneReady={setScrollController}
        onNodeClick={handleNodeClick}
      />
    </>
  );
}