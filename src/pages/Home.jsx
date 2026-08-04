import SceneCanvas from "../components/canvas/SceneCanvas";

export default function Home() {

  return (
    <>
      <div
        style={{ height: "800vh"}}
        className="pointer-events-none"
        aria-hidden="true"
        />
      <SceneCanvas />
    </>
  )
}