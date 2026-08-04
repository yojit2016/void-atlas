import * as THREE from "three";
import { gsap } from "gsap";

export default class OrbitLabels {
  constructor(nodes, images) {
    this.group = new THREE.Group();
    this.sprites = [];

    this.build(nodes, images);
  }

  build(nodes, images) {
    nodes.forEach((node, index) => {
      const image = images[index];
      if (!image) return;

      const texture = this.generateLabelTexture(
        image.title,
        image.sourceName
      );

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(material);

      const worldPos = new THREE.Vector3();
      node.getWorldPosition(worldPos);

      sprite.position.copy(worldPos);
      sprite.position.y += 45;

      sprite.scale.set(80, 20, 1);

      this.group.add(sprite);
      this.sprites.push(sprite);
    });
  }

  generateLabelTexture(title, sourceName) {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 80;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.shadowColor = "rgba(100,220,255,0.5)";
    ctx.shadowBlur = 8;

    ctx.font = "300 18px Inter, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText(title, 12, 28);

    ctx.font = "400 12px Inter, sans-serif";
    ctx.fillStyle = "rgba(100,220,255,0.7)";
    ctx.fillText(sourceName || "", 12, 52);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return texture;
  }

  update(camera) {
    this.sprites.forEach((sprite) => {
      sprite.quaternion.copy(camera.quaternion);

      const dist = camera.position.distanceTo(sprite.position);

      const scale = Math.max(
        0.5,
        Math.min(2.0, dist * 0.04)
      );

      sprite.scale.set(
        80 * scale,
        20 * scale,
        1
      );
    });
  }

  setFocused(index) {
    this.sprites.forEach((sprite, i) => {
      const diff = Math.abs(i - index);
      const wrapped = Math.min(
        diff,
        this.sprites.length - diff
      );

      let opacity = 0;

      if (wrapped === 0) {
        opacity = 1;
      } else if (wrapped === 1) {
        opacity = 0.5;
      }

      gsap.to(sprite.material, {
        opacity,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }

  dispose() {
    this.sprites.forEach((sprite) => {
      if (sprite.material.map) {
        sprite.material.map.dispose();
      }

      sprite.material.dispose();
    });

    this.group.clear();
    this.sprites.length = 0;
  }
}