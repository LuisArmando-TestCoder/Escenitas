import Victor from "Victor";
import * as THREE from "three";
import { events, consulters, types } from "scene-preset";
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
import lightFollower from "../../stages/lightFollower";
import nightSkyReflectors from "../../stages/nightSkyReflectors";
import randomRingAngel from "../../stages/randomRingAngel";
import orbiters from "../../stages/orbiters";
import cubeFloor from "../../stages/cubeFloor";
import dancingLines from "../../stages/dancingLines";

export default {
  ...lightFollower,
  ...nightSkyReflectors,
  ...randomRingAngel,
  ...orbiters,
  ...cubeFloor,
  ...dancingLines,
} as Scenes;
