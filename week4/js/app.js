"use strict";

const canvas = document.getElementById("renderCanvas");
const statusText = document.getElementById("scene-status");
const resetButton = document.getElementById("reset-view");
const pulseButton = document.getElementById("pulse-fridge");
let engine;

function createScene() {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.04, 0.08, 0.1, 1);

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 3,
    18,
    new BABYLON.Vector3(0, 3.5, 0),
    scene
  );
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 10;
  camera.upperRadiusLimit = 30;
  camera.wheelPrecision = 16;

  const hemiLight = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
  hemiLight.intensity = 0.8;

  const pointLight = new BABYLON.PointLight("point", new BABYLON.Vector3(0, 7, 4), scene);
  pointLight.intensity = 24;
  pointLight.diffuse = new BABYLON.Color3(1, 0.65, 0.38);

  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 34, height: 34 }, scene);
  const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
  groundMat.diffuseColor = new BABYLON.Color3(0.12, 0.17, 0.18);
  ground.material = groundMat;

  const fridgeBase = BABYLON.MeshBuilder.CreateBox("fridgeBase", { width: 4.8, height: 7.8, depth: 3.8 }, scene);
  fridgeBase.position.y = 3.8;
  const fridgeMat = new BABYLON.StandardMaterial("fridgeMat", scene);
  fridgeMat.diffuseColor = new BABYLON.Color3(0.11, 0.22, 0.18);
  fridgeMat.emissiveColor = new BABYLON.Color3(0.08, 0.18, 0.12);
  fridgeBase.material = fridgeMat;

  const door = BABYLON.MeshBuilder.CreateBox("door", { width: 2.2, height: 6.2, depth: 0.18 }, scene);
  door.position.set(0, 3.8, 1.95);
  const doorMat = new BABYLON.StandardMaterial("doorMat", scene);
  doorMat.diffuseColor = new BABYLON.Color3(0.34, 0.4, 0.38);
  doorMat.specularColor = new BABYLON.Color3(0.9, 0.9, 1);
  door.material = doorMat;

  const handleLeft = BABYLON.MeshBuilder.CreateCylinder("handleLeft", { height: 0.26, diameter: 0.18 }, scene);
  handleLeft.rotation.z = Math.PI / 2;
  handleLeft.position.set(-0.85, 3.6, 2.08);
  const handleRight = handleLeft.clone("handleRight");
  handleRight.position.x = 0.85;
  const handleMat = new BABYLON.StandardMaterial("handleMat", scene);
  handleMat.diffuseColor = new BABYLON.Color3(0.92, 0.9, 0.76);
  handleLeft.material = handleMat;
  handleRight.material = handleMat;

  const rottenFood = [];
  const foodColors = [
    new BABYLON.Color3(0.68, 0.28, 0.18),
    new BABYLON.Color3(0.82, 0.38, 0.12),
    new BABYLON.Color3(0.62, 0.46, 0.18),
    new BABYLON.Color3(0.5, 0.18, 0.08)
  ];

  for (let index = 0; index < 12; index += 1) {
    const food = BABYLON.MeshBuilder.CreateSphere(`food-${index}`, { diameter: 0.7, segments: 18 }, scene);
    const column = index % 4;
    const row = Math.floor(index / 4);
    food.position.set(-1.2 + column * 0.8, 2.2 + row * 1.1, 1.4 + (index % 2 === 0 ? 0.1 : -0.1));
    const foodMat = new BABYLON.StandardMaterial(`foodMat-${index}`, scene);
    foodMat.diffuseColor = foodColors[index % foodColors.length];
    foodMat.emissiveColor = foodMat.diffuseColor.scale(0.6);
    food.material = foodMat;
    rottenFood.push(food);
  }

  const rotAura = BABYLON.MeshBuilder.CreateTorus("rotAura", { diameter: 9.5, thickness: 0.7, tessellation: 40 }, scene);
  rotAura.position.y = 2.5;
  rotAura.rotation.x = Math.PI / 2;
  const auraMat = new BABYLON.StandardMaterial("auraMat", scene);
  auraMat.diffuseColor = new BABYLON.Color3(1, 0.58, 0.24);
  auraMat.emissiveColor = new BABYLON.Color3(0.96, 0.42, 0.18);
  auraMat.alpha = 0.7;
  auraMat.disableLighting = true;
  rotAura.material = auraMat;

  const hammer = BABYLON.MeshBuilder.CreateCylinder("hammer", { height: 1.3, diameter: 0.22 }, scene);
  hammer.position.set(-7.8, 0.7, -5.4);
  hammer.rotation.z = Math.PI / 2;
  const hammerHead = BABYLON.MeshBuilder.CreateBox("hammerHead", { width: 1.5, height: 0.58, depth: 0.7 }, scene);
  hammerHead.position.set(-8.1, 0.7, -5.45);
  const hammerMat = new BABYLON.StandardMaterial("hammerMat", scene);
  hammerMat.diffuseColor = new BABYLON.Color3(0.88, 0.9, 0.9);
  hammerHead.material = hammerMat;
  hammer.material = hammerMat;

  let pulseStrength = 0;

  resetButton.addEventListener("click", () => {
    camera.setPosition(new BABYLON.Vector3(0, 6, 18));
    camera.setTarget(new BABYLON.Vector3(0, 3.5, 0));
    statusText.textContent = "Camera restored to the hero's view.";
  });

  pulseButton.addEventListener("click", () => {
    pulseStrength = 1;
    statusText.textContent = "The rotten radius surges toward the kitchen.";
  });

  scene.registerBeforeRender(() => {
    const time = performance.now() * 0.001;
    fridgeBase.rotation.y += 0.003;
    door.rotation.y = Math.sin(time * 1.5) * 0.08;

    rotAura.scaling.x = 1 + Math.sin(time * 3.8) * 0.18 + pulseStrength * 0.5;
    rotAura.scaling.z = 1 + Math.cos(time * 3.2) * 0.14 + pulseStrength * 0.5;
    auraMat.alpha = 0.55 + Math.sin(time * 4.5) * 0.18 + pulseStrength * 0.3;

    rottenFood.forEach((food, index) => {
      food.position.y = 2.4 + Math.sin(time * 2.4 + index) * 0.32 + (index % 2 === 0 ? 0.1 : 0);
      food.rotation.x += 0.02;
      food.rotation.z += 0.015;
    });

    hammer.rotation.y = time * 0.6;
    hammerHead.rotation.z = Math.sin(time * 2) * 0.55;

    if (pulseStrength > 0) {
      pulseStrength = Math.max(0, pulseStrength - 0.02);
    }
  });

  return scene;
}

try {
  if (!window.BABYLON || !BABYLON.Engine.isSupported()) {
    throw new Error("The Babylon.js engine or WebGL is unavailable.");
  }

  engine = new BABYLON.Engine(canvas, true);
  const scene = createScene();
  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
  resetButton.disabled = false;

  console.log("Evil fridge scene loaded successfully.");
  statusText.textContent = "Scene ready: the rotten refrigerator is awake.";
} catch (error) {
  if (engine) {
    engine.dispose();
  }
  canvas.hidden = true;
  statusText.textContent = "The 3D scene could not start. Check the browser console and keep the whole folder together.";
  console.error("Scene startup failed:", error);
}
