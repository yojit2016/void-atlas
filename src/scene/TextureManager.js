import * as THREE from "three";

export default class TextureManager {
  constructor(images = []) {
    this.images = images;

    this.loader = new THREE.TextureLoader();

    this.cache = new Map();

    this.onTextureReady = null;

    // ----------------------------------
    // 1x1 transparent placeholder
    // ----------------------------------
    const data = new Uint8Array([0, 0, 0, 0]);

    this.placeholder = new THREE.DataTexture(
      data,
      1,
      1,
      THREE.RGBAFormat
    );

    this.placeholder.needsUpdate = true;

    this.focusedIndex = -1;
  }

  // =====================================================
  // Returns cached texture immediately
  // =====================================================
  getTexture(index) {
    return (
      this.cache.get(index) ??
      this.placeholder
    );
  }

  // =====================================================
  // Update focus window
  // =====================================================
  setFocused(index) {
    if (
      index === this.focusedIndex ||
      index < 0
    ) {
      return;
    }

    this.focusedIndex = index;

    // ----------------------------------
    // Load window [index-3 ... index+3]
    // ----------------------------------
    for (
      let i = index - 3;
      i <= index + 3;
      i++
    ) {
      this.loadIndex(i);
    }

    // ----------------------------------
    // Preload ahead
    // ----------------------------------
    this.loadIndex(index + 4);

    // ----------------------------------
    // Dispose distant textures
    // ----------------------------------
    for (const [
      cachedIndex,
      texture,
    ] of this.cache.entries()) {
      if (
        Math.abs(
          cachedIndex - index
        ) > 6
      ) {
        texture.dispose();

        this.cache.delete(cachedIndex);
      }
    }
  }

  // =====================================================
  // Internal loader
  // =====================================================
  loadIndex(index) {
    if (
      index < 0 ||
      index >= this.images.length
    ) {
      return;
    }

    if (this.cache.has(index)) {
      return;
    }

    const image =
      this.images[index];

    if (!image?.image) {
      return;
    }

    this.loader.load(
      image.image,
      (texture) => {
        texture.colorSpace =
          THREE.SRGBColorSpace;

        this.cache.set(
          index,
          texture
        );

        if (
          this.onTextureReady
        ) {
          this.onTextureReady(
            index,
            texture
          );
        }
      },
      undefined,
      (err) => {
        console.error(
          "Texture failed",
          image.image,
          err
        );
      }
    );
  }

  // =====================================================
  // Cleanup
  // =====================================================
  dispose() {
    for (const texture of this.cache.values()) {
      texture.dispose();
    }

    this.cache.clear();

    this.placeholder.dispose();
  }
}