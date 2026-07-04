import * as THREE from "three";

export default function createAxisPole() {
    const group = new THREE.Group();

    const strandCount = 2;
    const pointsPerStrand = 2500;

    const helixRadius = 50;
    const helixPitch = 0.08;
    const helixHeight = 400;

    for(let strand = 0; strand< strandCount; strand++)
    {
        const positions =[];
        const colors =[];

        for(let i=0; i< pointsPerStrand; i++)
        {
            const t = (i/ pointsPerStrand)* helixHeight;
            const angle = (t * helixPitch) + strand * Math.PI;
            const x= helixRadius*Math.cos(angle);
            const z= helixRadius*Math.sin(angle);
            const y = t- helixHeight/2;
            positions.push(x, y, z);
             
            const mix = i/pointsPerStrand;
            const color = new THREE.Color().lerpColors(
                new THREE.Color("#e0fbff"),
                new THREE.Color("#0040ff"),
                mix
            );

            colors.push(
                color.r,
                color.g,
                color.b
            );
        }
        const geometry =new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(
                positions,
                3
            )
        );
        geometry.setAttribute
        (
            "color",
             new THREE.Float32BufferAttribute
            (
             colors,
            3
            )
        );
        const material = new THREE.PointsMaterial({
            size: 1.8,
            vertexColors: true,
            transparent: true,
            opacity: 0.95,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true,
        });
        const points =new THREE.Points(
            geometry,
            material
        );
        group.add(points);

    }
    group.update =(delta) =>
    {
        group.rotation.y += delta*0.12;

    };
    return group;
}