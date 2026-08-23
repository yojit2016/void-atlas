import * as THREE from "three";
import gsap from "gsap";

import StarField3D from "./StarField3D";
import GalaxyCore from "./AxisPole";
import CameraRig from "./CameraRig";
import CosmicCarousel3D from "./CosmicCarousel3D";
import ScrollController from "./ScrollController";
import PostProcessing from "./PostProcessing";

export default class VoidAtlasScene {
  constructor(canvas) {
    this.canvas = canvas;

    // =========================
    // Scene
    // =========================
    this.scene = new THREE.Scene();

    // =========================
    // Timer
    // =========================
    this.clock = new THREE.Clock();

    // =========================
    // Camera Rig
    // =========================
    this.cameraRig = new CameraRig();
    this.scene.add(this.cameraRig.group);
    this.camera = this.cameraRig.camera;

    // =========================
    // Renderer
    // =========================
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
    });

    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    this.renderer.setClearColor("#020208");

    // =========================
    // Post Processing
    // =========================
    this.postProcessing = new PostProcessing(
      this.renderer,
      this.scene,
      this.camera
    );

    // =========================
    // Raycaster
    // =========================
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // =========================
    // Starfield
    // =========================
    this.starField = new StarField3D();
    this.scene.add(this.starField.points);

    // =========================
    // Galaxy Core
    // =========================
    this.galaxyCore = new GalaxyCore();
    this.galaxyCore.group.rotation.x = -0.42;
    this.scene.add(this.galaxyCore.group);

    // Ambient Galaxy Core Light
    const coreLight = new THREE.PointLight(0xfff4d6, 1.2, 500);
    coreLight.position.set(0, 80, 0);
    this.scene.add(coreLight);

    // =========================
    // Orbit Carousel
    // =========================
    this.carousel = new CosmicCarousel3D();
    this.scene.add(this.carousel.group);
    this.carousel.group.rotation.x = 0.25;

    // =========================
    // Bloom pulse when focus changes
    // =========================
    this.carousel.onFocusChange = (index) => {
      gsap.to(this.postProcessing.bloomPass, {
        strength: 0.65,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          gsap.to(this.postProcessing.bloomPass, {
            strength: 0.35,
            duration: 0.6,
            ease: "power2.in",
          });
        },
      });
    };

    // =========================
    // Scroll Controller
    // =========================
    this.scrollController = new ScrollController();

    this.scrollController.onWarp = (factor) => {
      gsap.to(this.starField, {
        warpFactor: factor,
        duration: 0.1,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          gsap.to(this.starField, {
            warpFactor: 1.0,
            duration: 0.4,
            ease: "power2.in",
          });
        },
      });
    };

    this.unsubscribeScroll =
      this.scrollController.onProgressChange(
        (progress) => {
          // Drive camera rig deep into space along Z path
          gsap.to(this.cameraRig.group.position, {
            z: THREE.MathUtils.lerp(0, -1350, progress),
            x: Math.sin(progress * Math.PI) * 90,
            y: Math.cos(progress * Math.PI) * 40,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });

          // Cinematic pitch and tilt relative to scroll
          gsap.to(this.cameraRig.group.rotation, {
            x: Math.sin(progress * Math.PI) * -0.12,
            z: Math.sin(progress * Math.PI * 2) * 0.05,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });

          // Rotate orbit carousel around central axis
          gsap.to(this.carousel.group.rotation, {
            y: progress * Math.PI * 2.5,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      );

    // =========================
    // Bindings
    // =========================
    this.animate = this.animate.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);

    // =========================
    // Events
    // =========================
    window.addEventListener("resize", this.handleResize);

    this.renderer.domElement.addEventListener(
      "pointerdown",
      this.handlePointerDown
    );

    this.renderer.domElement.addEventListener(
      "pointermove",
      this.handlePointerMove
    );

    // Start render loop
    this.animationFrame = requestAnimationFrame(this.animate);
  }

  // =========================================
  // Raycaster hover handler
  // =========================================
  handlePointerMove(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

    if (this.cameraRig) {
      this.cameraRig.setMouse(this.pointer.x, this.pointer.y);
    }

    if (!this.carousel || !this.carousel.nodes) return;

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersections = this.raycaster.intersectObjects(
      this.carousel.nodes,
      false
    );

    if (intersections.length > 0) {
      const node = intersections[0].object;
      if (this.hoveredNode !== node) {
        if (this.hoveredNode) this.unhighlightNode(this.hoveredNode);
        this.hoveredNode = node;
        this.highlightNode(node);
      }
    } else if (this.hoveredNode) {
      this.unhighlightNode(this.hoveredNode);
      this.hoveredNode = null;
    }
  }

  highlightNode(node) {
    if (!node) return;
    gsap.to(node.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
    if (node.userData?.borderMesh) {
      gsap.to(node.userData.borderMesh.material, {
        opacity: 0.9,
        duration: 0.3,
      });
      node.userData.borderMesh.material.color.set("#00ffff");
    }
    this.onNodeHover?.(node.userData);
  }

  unhighlightNode(node) {
    if (!node) return;
    gsap.to(node.scale, {
      x: 1.0,
      y: 1.0,
      z: 1.0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
    if (node.userData?.borderMesh) {
      gsap.to(node.userData.borderMesh.material, {
        opacity: 0.4,
        duration: 0.3,
      });
      node.userData.borderMesh.material.color.set("#00d2ff");
    }
    this.onNodeHover?.(null);
  }

  // =========================================
  // Raycaster click handler
  // =========================================
  handlePointerDown(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersections = this.raycaster.intersectObjects(
      this.carousel.nodes,
      false
    );

    if (intersections.length === 0) return;

    const node = intersections[0].object;
    if (node.userData) {
      if (this.onNodeClick) {
        this.onNodeClick(node.userData);
      } else if (node.userData.sourceUrl) {
        window.open(node.userData.sourceUrl, "_blank", "noopener,noreferrer");
      }
    }
  }

  animate() {
    const delta = this.clock.getDelta();

    // =========================
    // Update Components
    // =========================
    this.starField.update(delta);

    this.galaxyCore.update(delta);

    this.carousel.update(delta);
    this.carousel.updateFocus(this.camera);

    // ---------- NEW ----------
    if (this.carousel.labels) {
      if (
        !this.carousel.labels.group.parent
      ) {
        this.scene.add(
          this.carousel.labels.group
        );
      }

      this.carousel.labels.update(
        this.camera
      );
    }
    // -------------------------

    this.cameraRig.update(delta);

    // =========================
    // Render
    // =========================
    this.postProcessing.render();

    this.animationFrame =
      requestAnimationFrame(this.animate);
  }

  handleResize() {
    this.cameraRig.handleResize(
      window.innerWidth,
      window.innerHeight
    );

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    this.postProcessing.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }

  destroy() {
    cancelAnimationFrame(
      this.animationFrame
    );

    window.removeEventListener(
      "resize",
      this.handleResize
    );

    this.renderer.domElement.removeEventListener(
      "pointerdown",
      this.handlePointerDown
    );

    this.renderer.domElement.removeEventListener(
      "pointermove",
      this.handlePointerMove
    );

    if (this.unsubscribeScroll) {
      this.unsubscribeScroll();
    }

    if (this.scrollController) {
      this.scrollController.destroy();
    }

    if (this.carousel) {
      if (this.carousel.labels) {
        this.carousel.labels.dispose();
      }

      this.carousel.dispose();
    }

    this.postProcessing.dispose();
    this.renderer.dispose();
  }
}