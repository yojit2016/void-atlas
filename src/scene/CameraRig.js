import * as THREE from "three";

export default class CameraRig {
    constructor() {
        //Parent object will move through the world
        this.group = new THREE.Group();

        //camera

        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            5000
        );

        //initial viewing position
        this.camera.position.set(0, 0, 10);

        //Parent camera to rig
        this.group.add(this.camera);
        //Mouse targets 
        this.targetX = 0;
        this.targetY = 0;

        this.currentX = 0;
        this.currentY = 0;

        this.lookStrength = 5;
        this.smoothing = 0.08;

    }
    setMouse(x,y){
        this.targetX = x;
        this.targetY = y;
    }
    update(){

        this.currentX += (this.targetX - this.currentX) * this.smoothing;
        this.currentY += (this.targetY - this.currentY) * this.smoothing;

        this.camera.position.x += this.currentX * this.lookStrength;
        this.camera.position.y += this.currentY * this.lookStrength;
    }

    handleResize(width, height){
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
    
}