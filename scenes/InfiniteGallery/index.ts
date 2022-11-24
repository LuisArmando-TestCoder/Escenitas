import * as THREE from "three";
import presetScene, { consulters, types } from "scene-preset";
import scene from "./scene";

let sceneEvents: {
  sceneGroup: THREE.Group;
  onSetup(canvasState: { [index: string]: any }): void;
  onAnimation(canvasState: { [index: string]: any }): void;
};

export default (id: string) =>
  presetScene(
    {
      async setup(canvasState: { [index: string]: any }) {
        sceneEvents = await consulters.getSceneLifeCycle(scene);

        sceneEvents?.onSetup(canvasState);
      },
      animate(canvasState: { [index: string]: any }) {
        sceneEvents?.onAnimation(canvasState);
      },
    },
    `#${id}`
  );
