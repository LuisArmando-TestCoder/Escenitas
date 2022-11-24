import Victor from "victor";
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

const scale = 4;
const distance = 5;
const height = 1;
const space = 3;

export default {
  pictures: {
    object: async () => {
      const hallway = new THREE.Group();

      //   const poems = await getImagesPromise({
      //     url: "https://luisarmando-testcoder.github.io/assets/poems/poem%20(###).png",
      //     max: 61,
      //     name: "poem"
      //   });

      //   hallway.add(...poems);

      const aiArtworks = await getImagesPromise({
        url: "https://luisarmando-testcoder.github.io/assets/ai-images/ai%20(###).png",
        max: 61,
        name: "ai-art",
      });

      hallway.add(...aiArtworks);

      return hallway;
    },
    onSetup({ object3D: hallway }: SceneExport) {
        const {length} = hallway.children

        hallway.children.forEach((picture, index) => {
            const opposite = Math.sign(index % 2 - .5)

            picture.translateX(distance * opposite)
            picture.rotateY(opposite * (Math.PI / 2))

            picture.position.z = (index - length / 2) * (scale + space)
            picture.position.y = height + scale / 2;
        })
    },
    onAnimation: ({ object3D: hallway }: SceneExport) => {
        const {length} = hallway.children

        hallway.children.forEach(({position}) => {
            position.z = ((position.z - .1) % ((length / 2) * (scale + space)))
        })
    },
  } as unknown as Scene,
} as Scenes;

async function getImagesPromise({
  url,
  min = 1,
  max,
  name,
}: {
  url: string;
  min?: number;
  max: number;
  name?: string;
}) {
  const imagesPromise: Promise<THREE.Group>[] = [];

  for (let index = min; index < max; index++) {
    const imgURL = url.replace(/###/g, String(index));
    const image = getImagePromise({ url: imgURL, scale, name });

    imagesPromise.push(image);
  }

  return Promise.all(imagesPromise);
}

async function getImagePromise({
  url,
  scale = 1,
  name,
}: {
  url: string;
  scale?: number;
  name?: string;
}): Promise<THREE.Group> {
  const textureLoader = new THREE.TextureLoader();
  const imageLoader = new THREE.ImageLoader();

  textureLoader.crossOrigin = "anonymous";
  imageLoader.crossOrigin = "anonymous";

  return new Promise((resolve) => {
    imageLoader.load(url, (image) => {
      const aspectRatio = image.width / image.height;
      const geometry = new THREE.PlaneGeometry(
        aspectRatio * scale,
        scale,
        1,
        1
      );
      const material = new THREE.MeshStandardMaterial({
        map: textureLoader.load(url),
        side: THREE.DoubleSide,
      });
      const imageObject = new THREE.Mesh(geometry, material);
      const resizedScale = scale * 1.02;
      const frameMaterial = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: "#eee",
      });
      const frameGeometry = new THREE.PlaneGeometry(
        aspectRatio * resizedScale,
        resizedScale,
        1,
        1
      );
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);

      frame.translateZ(0.01);

      const picture = new THREE.Group();

      picture.name = name || url;

      picture.add(frame);
      picture.add(imageObject);

      resolve(picture);
    });
  });
}
