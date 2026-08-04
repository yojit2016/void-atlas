import * as THREE from "three";
import gsap from "gsap";

import StarField3D from "./StarField3D";
import createAxisPole from "./AxisPole";
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
    // Helix
    // =========================
    this.axisPole = createAxisPole();
    this.scene.add(this.axisPole);
    this.axisPole.position.y = -50;

    // =========================
    // Orbit Carousel
    // =========================
    this.carousel = new CosmicCarousel3D();
    this.scene.add(this.carousel.group);
    this.carousel.group.rotation.x = 0.25;

    // =========================
    // Bloom pulse when focus changes
    // =========================
    this.carousel.onFocusChange = () => {
      gsap.to(this.postProcessing.bloomPass, {
        strength: 0.7,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          gsap.to(this.postProcessing.bloomPass, {
            strength: 0.4,
            duration: 0.5,
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
          gsap.to(this.cameraRig.group.position, {
            z: THREE.MathUtils.lerp(
              0,
              -300,
              progress
            ),
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });

          gsap.to(this.carousel.group.rotation, {
            y: progress * Math.PI * 2,
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
    this.handlePointerDown =
      this.handlePointerDown.bind(this);

    // =========================
    // Events
    // =========================
    window.addEventListener(
      "resize",
      this.handleResize
    );

    this.renderer.domElement.addEventListener(
      "pointerdown",
      this.handlePointerDown
    );

    // =========================
    // Start render loop
    // =========================
    this.animationFrame =
      requestAnimationFrame(this.animate);
  }

  // =========================================
  // Raycaster click handler
  // =========================================
  handlePointerDown(event) {
    const rect =
      this.renderer.domElement.getBoundingClientRect();

    this.pointer.x =
      ((event.clientX - rect.left) / rect.width) * 2 - 1;

    this.pointer.y =
      -(
        ((event.clientY - rect.top) /
          rect.height) *
          2 -
        1
      );

    this.raycaster.setFromCamera(
      this.pointer,
      this.camera
    );

    const intersections =
      this.raycaster.intersectObjects(
        this.carousel.nodes,
        false
      );

    if (intersections.length === 0) return;

    const node = intersections[0].object;
    const sourceUrl =
      node.userData?.sourceUrl;

    if (sourceUrl) {
      window.open(
        sourceUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }

  animate() {
    const delta = this.clock.getDelta();

    // =========================
    // Update Components
    // =========================
    this.starField.update(delta);

    this.axisPole.update(delta);

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