import * as THREE from "three";
import { gsap } from "gsap";

export default class CosmicCarousel3D {
  constructor() {
    this.group = new THREE.Group();
    this.nodes = [];
    this.focusedIndex = -1;
    this.onFocusChange = null;

    // Layout — tuned for camera at z=380, y=60:
    this.orbitRadius = 220;
    this.nodeWidth = 120;
    this.nodeHeight = 78;
  }

  build(imageCount) {
    // Clear any existing nodes
    this.nodes.forEach((node) => this.group.remove(node));
    this.nodes = [];

    const count = imageCount || 12;
    this.orbitRadius = Math.max(220, count * 18);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;

      // Main image plane
      const geometry = new THREE.PlaneGeometry(
        this.nodeWidth,
        this.nodeHeight
      );
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0, // starts invisible, fades in when texture loads
        side: THREE.FrontSide,
        depthWrite: false,
      });
      const plane = new THREE.Mesh(geometry, material);

      plane.position.set(
        Math.cos(angle) * this.orbitRadius,
        45, // 45 units above galaxy plane — nodes float above the disk
        Math.sin(angle) * this.orbitRadius
      );
      plane.lookAt(new THREE.Vector3(0, 60, 380));

      // Border frame — thin PlaneGeometry slightly larger than image
      // Color: #00d4ff at opacity 0.25
      const borderGeo = new THREE.PlaneGeometry(
        this.nodeWidth + 3,
        this.nodeHeight + 3
      );
      const borderMat = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.0, // fades in with image
        side: THREE.FrontSide,
        depthWrite: false,
      });
      const border = new THREE.Mesh(borderGeo, borderMat);
      border.position.z = -0.5; // slightly behind image plane
      plane.add(border);
      plane.userData.border = border;
      plane.userData.borderMesh = border;

      this.group.add(plane);
      this.nodes.push(plane);
    }

    // Orbit ring is flat in world space
    this.group.rotation.x = 0;
  }

  setImages(images) {
    if (!images || !images.length) return;

    this.build(images.length);

    // Load textures
    const loader = new THREE.TextureLoader();
    this.nodes.forEach((node, index) => {
      const img = images[index % images.length];
      if (!img?.image) return;

      loader.load(img.image, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        node.material.map = texture;
        node.material.needsUpdate = true;

        // Fade in
        gsap.to(node.material, {
          opacity: 1.0,
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to(node.userData.border.material, {
          opacity: 0.2,
          duration: 1.2,
          ease: "power2.out",
        });

        node.userData = {
          ...node.userData,
          title: img.title,
          sourceUrl: img.sourceUrl,
          sourceName: img.sourceName,
          description: img.description,
          telescope: img.telescope,
          constellation: img.constellation,
          objectType: img.objectType,
          captureDate: img.captureDate,
          image: img,
        };
      });
    });
  }

  updateFocus(camera) {
    if (!this.nodes.length) return;

    const camPos = new THREE.Vector3();
    camera.getWorldPosition(camPos);

    let closestIndex = 0;
    let closestDist = Infinity;

    this.nodes.forEach((node, i) => {
      const nodePos = new THREE.Vector3();
      node.getWorldPosition(nodePos);
      const dist = camPos.distanceTo(nodePos);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    if (closestIndex === this.focusedIndex) return;
    this.focusedIndex = closestIndex;

    if (this.onFocusChange) this.onFocusChange(closestIndex);
    if (this.labels) this.labels.setFocused(closestIndex);

    this.nodes.forEach((node, i) => {
      const diff = Math.abs(i - closestIndex);
      const wrapped = Math.min(diff, this.nodes.length - diff);

      let scale, borderOpacity;
      if (wrapped === 0) {
        scale = 1.18;
        borderOpacity = 0.55;
      } else if (wrapped === 1) {
        scale = 0.97;
        borderOpacity = 0.15;
      } else {
        scale = 0.82;
        borderOpacity = 0.06;
      }

      gsap.to(node.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
      if (node.userData.border) {
        gsap.to(node.userData.border.material, {
          opacity: borderOpacity,
          duration: 0.5,
          overwrite: "auto",
        });
      }
    });

    if (this.textureManager) {
      this.textureManager.setFocused(closestIndex);
    }
  }

  update(delta) {}
}