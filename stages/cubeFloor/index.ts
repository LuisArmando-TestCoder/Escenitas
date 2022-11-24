import * as THREE from "three";
import { consulters, types } from "scene-preset";
import { Scene, Scenes, SceneExport } from "scene-preset/lib/types/consulters";
import getSquareSpiralPositions from "./getSquareSpiralPositions";
import material from "../../materials/liquidMetal";
import getDigit from "../../utils/getDigit";

const rotationSpeed = -.001;
const stretchScale = 100;

export default {
  cubeFloor: {
    properties: {
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Vector3(Math.PI, 0, 0),
    },
    object() {
      const squareSpiralPositions = getSquareSpiralPositions(1024);
      const space = 0.005;

      return consulters.getProceduralGroup([
        {
          geometry: new THREE.BoxBufferGeometry(0.1, 0.01, 0.1),
          material: material,
          getIntersectionMesh([index]: number[], mesh: THREE.Mesh) {
            mesh.position.set(
              squareSpiralPositions[index].x * space,
              0,
              squareSpiralPositions[index].y * space
            );

            return mesh as THREE.Object3D;
          },
          dimensions: [squareSpiralPositions.length],
        },
      ]);
    },
    onSetup(
      _: any,
      { audioProperties }: { audioProperties: { [index: string]: any } }
    ) {
      return audioProperties;
    },
    onAnimation: ({ object3D, exported: { frequencies } }: SceneExport) => {
      object3D.visible = getDigit(Date.now(), 2) % 3 === 1;

      if (!object3D.visible) return;

      const maxFrecuency = frequencies?.reduce((a: number, b: number) => {
        return a > b ? a : b;
      });

      object3D.rotation.y -= rotationSpeed;

      (
        object3D.children as any as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.Material | THREE.Material[]
        >[]
      ).forEach((mesh: THREE.Mesh, index: number) => {
        if (mesh.geometry instanceof THREE.TorusGeometry) {
          return;
        }

        mesh.scale.y = frequencies?.[index] / maxFrecuency * stretchScale;
        mesh.castShadow = !!mesh.scale.y;
        mesh.visible = !!mesh.scale.y;
      });
    },
  } as unknown as Scene,
} as Scenes;
