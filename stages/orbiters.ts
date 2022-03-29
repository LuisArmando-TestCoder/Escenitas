import * as THREE from "three";
import { consulters } from "scene-preset";
import { Scene, Scenes, SceneExport } from "scene-preset/lib/types/consulters";
import rainbowMaterial from "../materials/rainbow";

const rotationSpeed = .04;

export default {
  orbiters: {
    object: () => {
      const orbiterSize = 0.05;
      const orbitScale = 0.07;
      const orbitersAmount = 17;

      return consulters.getProceduralGroup([
        {
          dimensions: [orbitersAmount],
          material: rainbowMaterial,
          geometry: new THREE.SphereBufferGeometry(orbiterSize, 32, 12),
          getIntersectionMesh([x], mesh) {
            const group = new THREE.Group();
            const getRandomStep = () => Math.random() * Math.PI * 2;
            const randomStep = getRandomStep();

            group.add(mesh);

            group.rotation.set(randomStep, randomStep, randomStep);

            mesh.position.set(
              Math.sin(randomStep) * (x + 1) * orbitScale,
              0,
              Math.cos(randomStep) * (x + 1) * orbitScale
            );

            return group;
          },
        },
      ]);
    },
    onAnimation({ object3D }: SceneExport) {
      // object3D.rotation.y += rotationSpeed;

      object3D.children.forEach((orbit, index) => {
        orbit.rotation.y += rotationSpeed * ((index + 1) / 10);
      });
    },
  } as unknown as Scene,
} as Scenes;
