import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import * as THREE from 'three';

const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    offset: { value: 0.92 },
    darkness: { value: 1.8 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float offset;
    uniform float darkness;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      vec2 uv = (vUv - vec2(0.5)) * vec2(offset);
      float vignette = 1.0 - dot(uv, uv) * darkness;
      color.rgb *= clamp(vignette, 0.0, 1.0);
      gl_FragColor = color;
    }
  `
};

export default class PostProcessing {
  constructor(renderer, scene, camera) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.composer = new EffectComposer(renderer);
    this.composer.setSize(width, height);

    // Pass 1 — base render
    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    // Pass 2 — bloom
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.45,   // strength
      1.0,    // radius
      0.25    // threshold
    );
    this.composer.addPass(this.bloomPass);

    // Pass 3 — vignette
    const vignettePass = new ShaderPass(VignetteShader);
    vignettePass.renderToScreen = true;
    this.composer.addPass(vignettePass);
  }

  render() {
    this.composer.render();
  }

  setSize(width, height) {
    this.composer.setSize(width, height);
    if (this.bloomPass && typeof this.bloomPass.setSize === 'function') {
      this.bloomPass.setSize(width, height);
    }
  }

  dispose() {
    this.composer.dispose();
  }
}
