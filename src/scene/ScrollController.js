import * as THREE from 'three';

export default class ScrollController {
    constructor(){
        this.progress = 0;
        this.callbacks = new Set();

        this.handleScroll = this.handleScroll.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);

        this.touchStartY = 0;
        window.addEventListener("scroll", this.handleScroll,{passive: true});

        window.addEventListener("touchstart",this.handleTouchStart,{passive: true});
        window.addEventListener("touchmove",this.handleTouchMove,{passive: true});
        //Initialize immediately
        this.handleScroll();

        this.lastProgress = 0;
        this.lastTimestamp = performance.now();
        this.onWarp = null;
        
    }

    clamp(value){
        return THREE.MathUtils.clamp(value,0,1);
    }
    computeProgress(){
        const maxScroll = documentElement.scrollHeight - window.innerHeight;

        if(maxScroll <= 0) return 0;

        return this.clamp(window.scrollY / maxScroll);

    }
    setProgress(value){
        const next = this.clamp(value);

        if(Math.abs(next - this.progress) < 0.0001) return;

        this.progress = next;
        this.callbacks.forEach((callback) => callback(this.progress));
    }
    handleScroll(){
        const progress = this.computeProgress();

        const now = performance.now();
        const timeDelta = Math.max(now - this.lastTimestamp,1);

        const velocity = Math.abs(progress - this.lastProgress)/ timeDelta;

        this.lastProgress = progress;
        this.lastTimestamp = now;

        if(velocity > 0.003){
            this.onWarp?.(Math.min(velocity*80,5.0));
        }
        this.setProgress(progress);
    }
    handleTouchStart(event){
        if (event.touches.length === 0) return;

        this.touchStartY = event.touches[0].clientY;
    }
    handleTouchMove(event){
        // Native browser scrolling already changes
        // window.scrollY on mobile
        //We simply refresh the normalized value

        this.handleScroll();
    }
    getProgress(){
        return this.progress;

    }
    onProgressChange(callback){
        this.callbacks.add(callback);
        // Fire immediately with curent values
        callback(this.progress);

        return () => {
            this.callbacks.delete(callback);
        };
    }
    destroy(){
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("touchstart", this.handleTouchStart);
        window.removeEventListener("touchmove", this.handleTouchMove);
        this.callbacks.clear();


        
    }


    }

    






