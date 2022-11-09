import * as THREE from "three";
import { consulters, types } from "scene-preset";
import { Scene, Scenes, SceneExport } from "scene-preset/lib/types/consulters";
import getDigit from "../../utils/getDigit";

function getNRoot(radicand: number, index: number = 3) {
  return Math.abs(radicand) ** (1 / index);
}

function getDancingWave(x: number, shrink: number) {
  const shrinkedX = x * shrink;

  return function waveByTime(time: number) {
    return (
      (getNRoot(Math.sin(shrinkedX)) + Math.sin(shrinkedX + time) ** 3) / shrink
    );
  };
}

const arraySize = 1024;
const getStep = (index: number) => (index / arraySize) * Math.PI * 2;
const distance = 0.5;
const getWaveDistance = (time: number, index: number) =>
  distance + getDancingWave(Math.sin(getStep(index)) * distance, 4)(time);

export default {
  dancingLines: {
    object: () => {
      const points = [...new Array(arraySize + 1)].map((_, index) => {
        const waveDistance = getWaveDistance(0, index);
        const vector = new THREE.Vector3(
          Math.sin(getStep(index)) * waveDistance,
          Math.cos(getStep(index)) * waveDistance,
          0
        );

        return vector;
      });

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: "#fff",
      });
      const line = new THREE.Line(geometry, material);

      return line;
    },
    onSetup(
      { object3D }: SceneExport,
      { audioProperties }: { audioProperties: types.utils.AudioProperties }
    ) {
      const mesh = object3D as THREE.Mesh;

      mesh.geometry.attributes.position.needsUpdate = true;

      return audioProperties;
    },
    onAnimation({ object3D, exported: { frequencies } }: SceneExport) {
      if (!frequencies) return;

      object3D.visible = getDigit(Date.now(), 2) % 3 === 0;

      if (!object3D.visible) return;

      const mesh = object3D as THREE.Mesh;


      const {
        geometry: {
          attributes: {
            position: { array: points },
          },
        },
      } = mesh;

      for (let index = 0; index < points.length; index++) {
        const waveDistance = getWaveDistance(Date.now() / 1000, index);

        // points[index++] = Math.sin(getStep(index)) * waveDistance;
        // points[index++] = Math.cos(getStep(index)) * waveDistance;
        // points[index++] = Math.sin(getStep(index)) * waveDistance;
      }
    },
  } as unknown as Scene,
} as Scenes;
