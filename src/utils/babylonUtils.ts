import {
  Scene,
  Engine,
  Vector3,
  HemisphericLight,
  ArcRotateCamera,
  MeshBuilder,
  Color3,
  StandardMaterial
} from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials/grid';
import '@babylonjs/core/Materials/standardMaterial';
import '@babylonjs/core/Materials/Textures/Loaders/envTextureLoader';

interface SceneOptions {
  withGrid?: boolean;
  withOrbitalCamera?: boolean;
}

export function createBabylonScene(options: SceneOptions = {}) {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.style.touchAction = 'none';

  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);

  // Default light
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // Camera setup
  if (options.withOrbitalCamera) {
    const camera = new ArcRotateCamera('camera', 0, Math.PI / 3, 10, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 20;
  }

  // Grid setup
  if (options.withGrid) {
    const gridMaterial = new GridMaterial('gridMaterial', scene);
    gridMaterial.majorUnitFrequency = 5;
    gridMaterial.minorUnitVisibility = 0.3;
    gridMaterial.gridRatio = 1;
    gridMaterial.backFaceCulling = false;
    gridMaterial.mainColor = new Color3(1, 1, 1);
    gridMaterial.lineColor = new Color3(0.2, 0.2, 0.2);

    const ground = MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);
    ground.material = gridMaterial;
  }

  // Handle canvas resize
  const resizeObserver = new ResizeObserver(() => {
    engine.resize();
  });

  resizeObserver.observe(canvas);

  // Start rendering loop
  engine.runRenderLoop(() => {
    scene.render();
  });

  return { canvas, scene, engine };
}