import os
import sys
from modules.main import executeConditionalPath, createFile

sceneName = input("Scene name: ")
folderPath = f"../scenes/{sceneName}"

executeConditionalPath(
    folderPath,
    lambda path: os.makedirs(path)
)

executeConditionalPath(
    f"{folderPath}/index.ts",
    lambda path: createFile(
        path,
        "import * as THREE from \"three\";\n" +
        "import presetScene, { consulters, types } from \"scene-preset\";\n" +
        "import scene from \"./scene\";\n" +
        "\n" +
        "let sceneEvents: {\n" +
        "  sceneGroup: THREE.Group;\n" +
        "  onSetup(canvasState: { [index: string]: any }): void;\n" +
        "  onAnimation(canvasState: { [index: string]: any }): void;\n" +
        "};\n" +
        "\n" +
        "export default (id: string) =>\n" +
        "  presetScene(\n" +
        "    {\n" +
        "      async setup(canvasState: { [index: string]: any }) {\n" +
        "        sceneEvents = await consulters.getSceneLifeCycle(scene);\n" +
        "\n" +
        "        sceneEvents?.onSetup(canvasState);\n" +
        "      },\n" +
        "      animate(canvasState: { [index: string]: any }) {\n" +
        "        sceneEvents?.onAnimation(canvasState);\n" +
        "      },\n" +
        "    },\n" +
        "    `#${id}`\n" +
        "  );\n"
    )
)

executeConditionalPath(
    f"{folderPath}/scene.ts",
    lambda path: createFile(
        path,
        "import Victor from \"victor\";\n" +
        "import * as THREE from \"three\";\n" +
        "import { events, consulters } from \"scene-preset\";\n" +
        "import { CanvasState } from \"scene-preset/lib/types/state\";\n" +
        "import { Scene, Scenes, SceneExport } from \"scene-preset/lib/types/consulters\";\n" +
        "import gsap from \"gsap\";\n" +
        "\n" +
        "import Image from \"../../meshes/Image\";\n" +
        "import Text from \"../../meshes/Text\";\n" +
        "import Model from \"../../meshes/Model\";\n" +
        "import getTextureMaterial from \"../../materials/getTextureMaterial\";\n" +
        "import getQuixelMaterial from \"../../materials/getQuixelMaterial\";\n" +
        "import wavyMaterial from \"../../materials/wavy\";\n" +
        "import rainbowMaterial from \"../../materials/rainbow\";\n" 
        "import PointLightSet from \"../../meshes/PointLightSet\";\n" +
        "\n" +
        "export default {\n" +
        "  \n" +
        "} as Scenes;\n"
    )
)

executeConditionalPath(
    f"../pages/{sceneName.lower()}.tsx",
    lambda path: createFile(
        path,
        "import Head from 'next/head'\n" +
        "import * as Components from '../components'\n" +
        "\n" +
        f"function {sceneName}() " + "{\n" +
        "    return (\n" +
        "        <div>\n" +
        "            <Head>\n" +
        f"                <title>{sceneName} | Home for 3D experiments</title>\n" +
        f"                <meta name=\"description\" content=\"{sceneName}\" />\n" +
        "                <link rel=\"icon\" href=\"/favicon.ico\" />\n" +
        "            </Head>\n" +
        "            <Components.L1.Canvas3D\n" +
        "                id={'" + sceneName + "'}\n" +
        "                scenes={[\n" +
        f"                    'Default',\n" +
        f"                    '{sceneName}',\n" +
        "                ]}\n" +
        "            />\n" +
        "        </div>\n" +
        "    )\n" +
        "}\n\n" +
        f"export default {sceneName};"
    )
)

import modules.export