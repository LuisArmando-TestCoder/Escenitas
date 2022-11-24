import * as THREE from "three";
import { consulters, types } from "scene-preset";
import { Scene, Scenes, SceneExport } from "scene-preset/lib/types/consulters";
import getInterpolatedColor from "./getInterpolatedColor";

const rotationSpeed = 0.01;
const switchSpeeder = 8;
const wobbleReduction = 2;

export default {
  randomRingAngel: {
    object: () => {
      const circleAmount = 120;
      const initialSize = 0.1;
      const heightLayers = 7;
      const ringsAmount = 3;
      const randomTreshold = 0.5;

      return consulters.getProceduralGroup([
        {
          dimensions: [ringsAmount],
          getIntersectionMesh([z]: number[]) {
            const size = initialSize * (z + 1);
            return consulters.getProceduralGroup([
              {
                material: new THREE.MeshStandardMaterial({
                  color: getInterpolatedColor(
                    z / (ringsAmount - 1),
                    [255, 255, 0, 1],
                    [255, 255, 255, 1]
                  ),
                }),
                geometry: new THREE.BoxBufferGeometry(size, size, size),
                dimensions: [heightLayers, circleAmount],
                getIntersectionMesh([y, x]: number[], mesh: THREE.Mesh) {
                  const xStep = (x / circleAmount) * Math.PI * 2;
                  const yDisplacement = Math.round(y / 2) * Math.sign((y % 2) - .5);
                  const distance =
                    (circleAmount / 12) * size * 2 -
                    Math.abs(yDisplacement) * size;

                  mesh.rotation.y = xStep;
                  mesh.position.set(
                    Math.sin(xStep) * distance,
                    yDisplacement * size,
                    Math.cos(xStep) * distance
                  );

                  mesh.visible = Math.random() < randomTreshold;

                  return mesh;
                },
              },
            ]);
          },
        },
      ]);
    },
    onSetup(
      _: any,
      {
        audioProperties,
      }: {
        audioProperties: { [index: string]: any };
      }
    ) {
      return audioProperties;
    },
    onAnimation({ object3D, exported: { frequencies } }: SceneExport) {
      const maxFrecuency = frequencies?.reduce((a: number, b: number) => {
        return a > b ? a : b;
      });

      object3D.children.forEach((ring, index) => {
        ring.rotation.y += rotationSpeed;
        ring.rotation.z = Math.sin(ring.rotation.y + index) / wobbleReduction;

        ring.children.forEach((child, index) => {
          if (
            Math.round(Date.now()) % (ring.children.length / switchSpeeder) ===
            index / switchSpeeder
          ) {
            child.visible = !child.visible;
          }

          if (child.visible) {
            const scale = (frequencies?.[index] ?? 1) / maxFrecuency;

            child.scale.set(scale, scale, scale);
          }
        });
      });
    },
  } as unknown as Scene,
} as Scenes;
