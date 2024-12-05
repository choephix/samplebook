import { Vector3, MeshBuilder, StandardMaterial, Color3, Mesh } from '@babylonjs/core';
import { createBabylonScene } from '../utils/babylonUtils';
import { createTweakerUI } from '../lib/tweaker/TweakerUI';
import type { SampleFunction } from '../types/sample';

export const SpinningCube: SampleFunction = () => {
  const { canvas, scene } = createBabylonScene({ withGrid: true, withOrbitalCamera: true });

  // Create a cube
  const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
  box.position = new Vector3(0, 1, 0);

  // Add material
  const material = new StandardMaterial('boxMaterial', scene);
  material.diffuseColor = new Color3(0.4, 0.6, 0.9);
  box.material = material;

  // Animation
  scene.registerBeforeRender(() => {
    box.rotation.y += 0.01;
  });

  return canvas;
};

export const ColoredSphere: SampleFunction = () => {
  const { canvas, scene } = createBabylonScene({ withGrid: true, withOrbitalCamera: true });

  // Create a sphere
  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
  sphere.position = new Vector3(0, 1, 0);

  // Add material
  const material = new StandardMaterial('sphereMaterial', scene);
  material.diffuseColor = new Color3(0.9, 0.4, 0.5);
  sphere.material = material;

  return canvas;
};

export const TweakableCube: SampleFunction = () => {
  const { canvas, scene } = createBabylonScene({ withGrid: true, withOrbitalCamera: true });

  // State
  let rotationSpeed = 0.01;
  let isSpinning = true;
  let currentShape = 'cube';
  let mesh: Mesh;

  // Material setup
  const material = new StandardMaterial('meshMaterial', scene);
  material.diffuseColor = new Color3(0.4, 0.6, 0.9);

  // Create mesh function
  const createMesh = (type: string) => {
    if (mesh) {
      mesh.dispose();
    }

    switch (type) {
      case 'sphere':
        mesh = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
        break;
      case 'cylinder':
        mesh = MeshBuilder.CreateCylinder('cylinder', { height: 2, diameter: 2 }, scene);
        break;
      case 'cube':
      default:
        mesh = MeshBuilder.CreateBox('box', { size: 2 }, scene);
        break;
    }

    mesh.position = new Vector3(0, 1, 0);
    mesh.material = material;
    return mesh;
  };

  // Initial mesh creation
  mesh = createMesh(currentShape);

  // Animation
  scene.registerBeforeRender(() => {
    if (isSpinning && mesh) {
      mesh.rotation.y += rotationSpeed;
    }
  });

  // Create tweaker UI
  const tweaker = createTweakerUI();

  tweaker.addButton({
    label: () => isSpinning ? "Stop Spinning" : "Start Spinning",
    trigger: () => {
      isSpinning = !isSpinning;
    }
  });

  tweaker.addRangeInput({
    label: () => `Rotation Speed: ${rotationSpeed.toFixed(3)}`,
    get: () => rotationSpeed,
    set: (value) => { rotationSpeed = value; },
    start: 0,
    end: 0.1,
    step: 0.001
  });

  tweaker.addDropdown({
    label: "Shape",
    get: () => currentShape,
    set: (value) => {
      currentShape = value;
      mesh = createMesh(value);
    },
    options: [
      { label: 'Cube', value: 'cube' },
      { label: 'Sphere', value: 'sphere' },
      { label: 'Cylinder', value: 'cylinder' }
    ]
  });

  tweaker.addVectorInput({
    label: () => `Position (${mesh.position.x.toFixed(2)}, ${mesh.position.y.toFixed(2)}, ${mesh.position.z.toFixed(2)})`,
    get: () => [mesh.position.x, mesh.position.y, mesh.position.z],
    set: ([x, y, z]) => {
      mesh.position.set(x, y, z);
    },
    step: 0.1
  });

  tweaker.addVectorInput({
    label: () => `Scale (${mesh.scaling.x.toFixed(2)}, ${mesh.scaling.y.toFixed(2)}, ${mesh.scaling.z.toFixed(2)})`,
    get: () => [mesh.scaling.x, mesh.scaling.y, mesh.scaling.z],
    set: ([x, y, z]) => {
      mesh.scaling.set(x, y, z);
    },
    step: 0.1,
    min: 0.1
  });

  tweaker.addStringInput({
    label: () => `Color (${material.diffuseColor.toHexString()})`,
    get: () => material.diffuseColor.toHexString(),
    set: (value) => {
      material.diffuseColor = Color3.FromHexString(value);
    }
  });

  return [canvas, tweaker.dom];
};