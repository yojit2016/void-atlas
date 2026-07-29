import * as THREE from "three";

export default class CosmicCarousel3D {
  constructor() {
    this.group = new THREE.Group();

    // ---------- Layout ----------
    this.orbitRadius = 320;
    this.layerSpacing = 300;
    this.nodesPerLayer = 6;
    this.layerCount = 1;

    this.nodeWidth = 80;
    this.nodeHeight = 52;

    this.nodes = [];

    // NEW
    this.textureLoader = new THREE.TextureLoader();

    this.build();
  }

  build() {
    for (
      let layer = 0;
      layer < this.layerCount;
      layer++
    ) {
      const layerGroup = new THREE.Group();

      layerGroup.position.z =
        -(layer * this.layerSpacing);

      for (
        let i = 0;
        i < this.nodesPerLayer;
        i++
      ) {
        const angle =
          (i / this.nodesPerLayer) *
          Math.PI *
          2;

        const geometry = new THREE.PlaneGeometry(
          this.nodeWidth,
          this.nodeHeight
        );

        const material =
          new THREE.MeshBasicMaterial({
            color: "#4a4a4a",
            transparent: true,
            opacity: 0.65,
            side: THREE.DoubleSide,
          });

        const plane = new THREE.Mesh(
          geometry,
          material
        );

        plane.position.set(
          Math.cos(angle) *
            this.orbitRadius,
          0,
          Math.sin(angle) *
            this.orbitRadius
        );

        // Face camera position
        plane.lookAt(new THREE.Vector3(0, 0, 800));

        layerGroup.add(plane);

        this.nodes.push(plane);
      }

      this.group.add(layerGroup);
    }
  }

  // =====================================================
  // NEW
  // Apply image textures to every orbit node
  // =====================================================
  setImages(images) {
    console.log("setImages called",images);
    if (!images || !images.length) return;

    this.nodes.forEach((node, index) => {
      const image =
        images[index % images.length];

      if (!image?.image) return;

      this.textureLoader.load(
        image.image,
        (texture) => {
          console.log("Loaded texture", image.title);
          texture.colorSpace =
            THREE.SRGBColorSpace;

          node.material.map = texture;
          node.material.color.set("#ffffff");
          node.material.opacity = 1;
          node.material.transparent = false;

          node.material.needsUpdate = true;

          // Save metadata for later
          node.userData = {
            title: image.title,
            sourceUrl: image.sourceUrl,
            sourceName: image.sourceName,
            image,
          };
          (err) =>{console.error("Texture failed", image.image, err);}
        }
      );
    });
  }

  update(delta) {
    // Reserved for future rotation.
  }
}