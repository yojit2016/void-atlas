import { useState } from 'react';
import SceneCanvas from '../components/canvas/SceneCanvas';
import Navbar from '../components/ui/Navbar';

export default function Home() {
  const [scrollController, setScrollController] = useState(null);

  return (
    <>
      <Navbar scrollController={scrollController} />
      <div style={{ height: '800vh' }} aria-hidden="true" />
      <SceneCanvas onSceneReady={setScrollController} />
    </>
  );
}