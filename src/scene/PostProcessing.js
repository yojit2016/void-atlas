import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default class PostProcessing {
    constructor(renderer, scene, camera){
        this.renderer = renderer;
        
        this.composer = new EffectComposer(renderer);
        this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.composer.setSize(window.innerWidth, window.innerHeight);

        //-------------------
        //Base render
        //-------------------
        this.renderPass = new RenderPass(scene, camera);
        this.composer.addPass(this.renderPass);

        //-------------------
        //Bloom
        //-------------------
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.4, // strength
            0.6, // radius
            0.2  // threshold
        );
        
        this.composer.addPass(this.bloomPass);

        //=============================
        // Vignette Shader
        //=============================
        const vignetteShader = {
            uniforms: {
                tDiffuse: { value: null },
                offset: { value: 0.95 },
                darkness: { value: 1.6 }
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
          vec2 uv = (vUv - 0.5) * offset;
          float vignette = smoothstep(0.8, darkness, dot(uv, uv) * 2.0);
          color.rgb *= (1.0 - vignette * 0.55);
          gl_FragColor = color;
        }
      `
        };
        this.vignettePass = new ShaderPass(vignetteShader);
        this.composer.addPass(this.vignettePass);
    }

    render() {
        this.composer.render();
    }

    setSize(width, height) {
        this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.composer.setSize(width, height);
        if (this.bloomPass && this.bloomPass.resolution) {
            this.bloomPass.resolution.set(width, height);
        }
    }

    dispose() {
        if (this.bloomPass && typeof this.bloomPass.dispose === 'function') {
            this.bloomPass.dispose();
        }
        if (this.vignettePass && typeof this.vignettePass.dispose === 'function') {
            this.vignettePass.dispose();
        }
        this.composer.dispose();
    }
}
    
