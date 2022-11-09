import Victor from "Victor";
import * as THREE from "three";
import { events, consulters } from "scene-preset";
import { CanvasState } from "scene-preset/lib/types/state";
import { Scene, Scenes, SceneExport } from "scene-preset/lib/types/consulters";
import gsap from "gsap";

import Text from "../meshes/Text";

const characters =
  ",.;:-()¿?¡!`'\"/aeiouáéíóúAEIOUÁÉÍÓÚbcdfghjklmnñpqrstvwxyzBCDFGHJKLMNÑPQRSTVWXYZ";
const charactersMeshPoolPromises: { [index: string]: THREE.Mesh } =
  Object.fromEntries(characters.split("").map(getLetterInitialEntry));

export default {
  reactiveLetters: {
    object: async () => {
      const poolPerCharacter = 10;
      const charactersPool = await getCharactersPool(poolPerCharacter);
      const charactersGroup = new THREE.Group();
      const allCharacterMeshes = Object.values(charactersPool)
        .flat()
        .map((mesh) => {
          const letterWrapper = new THREE.Group();

          letterWrapper.add(mesh);

          return letterWrapper;
        });

      allCharacterMeshes.forEach((group) => {
        const randomStepX = Math.random() * Math.PI * 2;
        const randomStepY = Math.random() * Math.PI * 2;
        const randomStepZ = Math.random() * Math.PI * 2;
        const [mesh] = group.children;

        group.rotation.set(randomStepX, randomStepY, randomStepZ);
        mesh.position.z = 10;
      });

      charactersGroup.add(...allCharacterMeshes);

      return {
        object3D: charactersGroup,
        exported: charactersPool,
      };
    },
    onSetup({ object3D, exported }: SceneExport) {
      console.log(exported, object3D);

      const timeline = gsap.timeline({/*repeat: 2, repeatDelay: 1*/});

      timeline.to(object3D.children[0].children[0].position, {x: 0, y: 2, z: 0, duration: 10});
      timeline.to(object3D.children[0].rotation, {x: 0, y: 0, z: 0, duration: 10});
    },
  } as unknown as Scene,
} as Scenes;

type MappedLetterMeshes = { [index: string]: THREE.Object3D[] };

function getInitialMappedLettersForText(
  mappedLetterMeshes: MappedLetterMeshes,
  text: string
) {
  const mappedLetters: {
    [index: string]: { meshes: THREE.Object3D[]; space: number };
  } = {};
  let space = 0;

  text.split("").forEach((letter) => {
    space++;

    if (!mappedLetterMeshes[letter]) {
      return;
    }

    if (!mappedLetters[letter]) {
      mappedLetters[letter] = {
        meshes: [mappedLetterMeshes[letter][0]],
        space,
      };

      return;
    }
  });
}

function getLetterInitialEntry(letter: string) {
  return [
    letter,
    Text({
      text: letter,
      path: "./fonts/Montserrat_Regular.json",
      size: 0.1,
      thickness: 0.025,
      color: "white",
    }),
  ];
}

async function getCharactersPool(poolPerCharacter = 10) {
  const letters = await Promise.all(Object.values(charactersMeshPoolPromises));

  return Object.fromEntries(
    letters.map((mesh, index) => {
      return [
        characters[index],
        [...new Array(poolPerCharacter)].map(() => {
          return mesh.clone();
        }),
      ];
    })
  );
}
