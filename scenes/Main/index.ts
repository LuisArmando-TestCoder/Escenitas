import * as THREE from "three";
import presetScene, { consulters, types, events } from "scene-preset";
import scene from "./scene";

let sceneEvents: {
  sceneGroup: THREE.Group;
  onSetup(canvasState: { [index: string]: any }): void;
  onAnimation(canvasState: { [index: string]: any }): void;
};

function toggleAudio(audio: HTMLAudioElement) {
  return () => {
    console.log(audio.paused)
    audio[audio.paused ? "play" : "pause"]()
  };
}

export default (id: string) =>
  presetScene(
    {
      async setup(canvasState: { [index: string]: any }) {
        sceneEvents = await consulters.getSceneLifeCycle(scene);

        const audio = document?.querySelector("audio") as HTMLAudioElement;

        events.onKey("p").end(toggleAudio(audio));

        const audioProperties = consulters.getAudioProperties(audio);

        sceneEvents?.onSetup(
          {
            ...canvasState, audioProperties
          } as unknown as { [index: string]: any }
        );
      },
      animate(canvasState: { [index: string]: any }) {
        sceneEvents?.onAnimation(canvasState);
      },
    },
    `#${id}`
  );
