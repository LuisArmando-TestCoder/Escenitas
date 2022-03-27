import Victor from "Victor";
import * as THREE from "three";
import { events, consulters } from "scene-preset";
import { CanvasState } from "scene-preset/lib/types/state";
import { Scene, Scenes, SceneExport } from "scene-preset/lib/types/consulters";
import gsap from "gsap";

import Image from "../../meshes/Image";
import Text from "../../meshes/Text";
import Model from "../../meshes/Model";
import getTextureMaterial from "../../materials/getTextureMaterial";
import getQuixelMaterial from "../../materials/getQuixelMaterial";
import wavyMaterial from "../../materials/wavy";
import rainbowMaterial from "../../materials/rainbow";
import PointLightSet from "../../meshes/PointLightSet";
import nightSkyReflectors from "../../stages/nightSkyReflectors";
import getInterpolatedColor from "./getInterpolatedColor";

const rotationSpeed = 0.01;

export default {
  ...nightSkyReflectors,
  randomRingAngel: {
    object: () => {
      const circleAmount = 120;
      const initialSize = 0.02;
      const height = 10;
      const ringsAmount = 3;
      const randomTreshold = 0.5;

      return consulters.getProceduralGroup([
        {
          dimensions: [ringsAmount],
          getIntersectionMesh([z]) {
            const size = initialSize * (z + 1);
            return consulters.getProceduralGroup([
              {
                material: new THREE.MeshStandardMaterial({
                  color: getInterpolatedColor(
                    z / (ringsAmount - 1),
                    [255, 0, 0, 1],
                    [0, 0, 255, 1]
                  )
                }),
                geometry: new THREE.BoxBufferGeometry(size, size, size),
                dimensions: [circleAmount, height],
                getIntersectionMesh([x, y], mesh) {
                  const xStep = (x / circleAmount) * Math.PI * 2;
                  const distance = (circleAmount / 12) * size * 2;

                  mesh.rotation.y = xStep;
                  mesh.position.set(
                    Math.sin(xStep) * distance,
                    y * size,
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
    onAnimation({ object3D }: SceneExport) {
      object3D.children.forEach((ring, index) => {
        ring.rotation.y += rotationSpeed;
        ring.rotation.z = Math.sin(ring.rotation.y + index) / 2;
      });
    },
  } as unknown as Scene,
} as Scenes;
