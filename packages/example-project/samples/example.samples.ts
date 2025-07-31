import * as THREE from "three";

export function cubeScene(): HTMLElement {
  // Create scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(400, 300);
  renderer.setClearColor(0x222222);

  // Create a cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  return renderer.domElement;
}

export function sphereScene(): HTMLElement {
  // Create scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(400, 300);
  renderer.setClearColor(0x001122);

  // Create a sphere
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  camera.position.z = 3;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  return renderer.domElement;
}

export function torusScene(): HTMLElement {
  // Create scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(400, 300);
  renderer.setClearColor(0x112200);

  // Create a torus
  const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  camera.position.z = 4;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  animate();

  return renderer.domElement;
}

export function multipleShapes(): HTMLElement {
  // Create scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(400, 300);
  renderer.setClearColor(0x220011);

  // Create multiple shapes
  const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const torusGeometry = new THREE.TorusGeometry(0.3, 0.1, 8, 50);

  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  ];

  const cube = new THREE.Mesh(cubeGeometry, materials[0]);
  const sphere = new THREE.Mesh(sphereGeometry, materials[1]);
  const torus = new THREE.Mesh(torusGeometry, materials[2]);

  cube.position.x = -1.5;
  sphere.position.x = 0;
  torus.position.x = 1.5;

  scene.add(cube, sphere, torus);

  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.01;
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  animate();

  return renderer.domElement;
}

// Test functions that return different types to demonstrate the processor

export function someFunction(): Function {
  return function () {
    console.log("Hello from someFunction!");
  };
}

export function stringResult(): string {
  return "Hello, this is a string result!";
}

export function numberResult(): number {
  return 42;
}

export function booleanResult(): boolean {
  return true;
}

export function objectResult(): object {
  return {
    message: "This is an object",
    timestamp: new Date().toISOString(),
    data: [1, 2, 3, 4, 5],
  };
}

export function errorFunction(): never {
  throw new Error("This function intentionally throws an error!");
}
