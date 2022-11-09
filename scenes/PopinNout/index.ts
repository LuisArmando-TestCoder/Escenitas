import * as THREE from "three";
import presetScene, { consulters, types, actions } from "scene-preset";
import scene from "./scene";

let sceneEvents: {
  sceneGroup: THREE.Group;
  onSetup(canvasState: types.state.CanvasState): void;
  onAnimation(canvasState: types.state.CanvasState): void;
};

export default (id: string) =>
  presetScene(
    {
      async setup(canvasState: types.state.CanvasState) {
        sceneEvents = await consulters.getSceneLifeCycle(scene);

        sceneEvents?.onSetup(canvasState);

        if (canvasState.camera) {
          canvasState.camera.position.z = -5;
        }

        // actions.blacklistControls([
        //   "setCanvasAutoFocus",
        //   "setFirstPersonDirection",
        //   "setFirstPersonFlying",
        //   "setFirstPersonZoom",
        // ]);
      },
      animate(canvasState: types.state.CanvasState) {
        sceneEvents?.onAnimation(canvasState);
      },
    },
    `#${id}`
  );
