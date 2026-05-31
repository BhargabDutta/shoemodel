import { useGLTF, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



export default function ShoeModel({ sectionIndex, isMobile, variant, loadingManager }) {
  const groupRef = useRef();
  const [sceneObj, setSceneObj] = useState(null);
  const [modelsReady, setModelsReady] = useState(false);

  const allowed = ["classicRed", "navyBlue", "skyBlue", "airZoom"];
  if (!allowed.includes(variant)) {
    console.error("Invalid variant:", variant);
    // You can early-return a default model or throw
  }

  // ✅ Load all models at top level

  const redModel = useLoader(GLTFLoader, "/models/nike.glb", loader => {
    loader.manager = loadingManager;
  });

const blueModel = useLoader(GLTFLoader, "/models/blue_nike_2.glb", loader => {
  loader.manager = loadingManager;
});

const greenModel = useLoader(GLTFLoader, "/models/blue_nike_1.glb", loader => {
  loader.manager = loadingManager;
});

const yellowModel = useLoader(GLTFLoader, "/models/nike_air_zoom.glb", loader => {
  loader.manager = loadingManager;
});
  // const blueModel = useGLTF("./models/blue_nike_2.glb",true, loadingManager);
  // const greenModel = useGLTF("./models/blue_nike_1.glb",true, loadingManager);
  // const yellowModel = useGLTF("./models/nike_air_zoom.glb",true, loadingManager);

  // Base rotations to normalize all models
  const baseRotations = {
    classicRed: [0, 0, 0],
    navyBlue: [0, 0, 0],
    skyBlue: [0, 0, 0],
    airZoom: [0, 0, 0],
  };
  
  

  // ✅ Update sceneObj when variant changes
  useEffect(() => {
    let selected;
    switch (variant) {
      case "navyBlue":
        selected = blueModel;
        break;
      case "skyBlue":
        selected = greenModel;
        break;
      case "airZoom":
        selected = yellowModel;
        break;
      case "classicRed":
      default:
        selected = redModel;
        break;
    }
    

    // Clone to create a new instance
    if (selected && selected.scene) {
      setSceneObj(selected.scene.clone());
    }
  }, [variant, redModel, blueModel, greenModel, yellowModel]);

  // Transforms per section
  // const desktopTransforms = [
  //   { position: [0, -0.1, 1], rotation: [0, 1.5, 0], scale: 2 },
  //   { position: [-2, -0.2, 0], rotation: [0, 1, 0], scale: 2 },
  //   { position: [2, 0, 0], rotation: [1, -1, 0.5], scale: 2 },
  //   { position: [0, -0.25, 0], rotation: [-0.1, Math.PI, 0], scale: 1.8 },
  // ];
  
  // const mobileTransforms = [
  //   { position: [0, -0.1, 0], rotation: [0, 0, 0], scale: 2 },
  //   { position: [0, -0.1, 0], rotation: [1, 0, 0], scale: 2.5 },
  //   { position: [0, 0, 0], rotation: [0.5, -0.5, 0.2], scale: 3 },
  //   { position: [0, -0.15, 0], rotation: [0, Math.PI, 0], scale: 1 },
  // ];

  const variantTransforms = {
  classicRed: {
    desktop: [
      { position: [0, -0.1, 1], rotation: [0, 1.5, 0], scale: 2 },
      { position: [-2, -0.2, 0], rotation: [0, 1, 0], scale: 2 },
      { position: [2, 0, 0], rotation: [1, -1, 0.5], scale: 2 },
      { position: [0, 0.3, 1], rotation: [0.5, 0.5, 0], scale: 1.8 },
      { position: [1, 0.3, 1], rotation: [-1, 1, 0], scale: 1.8 },
      { position: [-0.5, 0, 1], rotation: [0, 2.5, 0], scale: 1.8 },

    ],

    mobile: [
      { position: [0, -0.1, 0], rotation: [0, 0, 0], scale: 2 },
      { position: [0, -0.1, 0], rotation: [1, 0, 0], scale: 2.5 },
      { position: [0, 0, 0], rotation: [0.5, -0.5, 0.2], scale: 3 },
      { position: [0, -0.15, 0], rotation: [0, Math.PI, 0], scale: 1 },
    ]
  },

  navyBlue: {
    desktop: [
      { position: [0, -0.1, 2], rotation: [0, 1.5, 0], scale: 1.7 },
      { position: [-1.5, 0, 3], rotation: [0, 1.5, 0], scale: 1.7 },
      { position: [1, 0, 1], rotation: [0, 1, 0], scale: 1.7 },
      { position: [0, 0, 1], rotation: [1, 1, 0], scale: 1.5 },
      { position: [1, 0, 1], rotation: [0.5, -1, 0], scale: 1.5 },
      { position: [0, 0.3, 1], rotation: [-1, 1, 0], scale: 1.8 },

    ],

    mobile: [
      { position: [0, -0.2, 0], rotation: [0, 0, 0], scale: 2 },
      { position: [0, -0.2, 0], rotation: [0.8, 0, 0], scale: 2 },
      { position: [0, 0, 0], rotation: [0.3, -0.8, 0], scale: 2.5 },
      { position: [0, -0.2, 0], rotation: [0, Math.PI, 0], scale: 1.5 },
    ]
  },

  skyBlue: {
    desktop: [
      { position: [0, 0.2, 1], rotation: [0.3, 1.2, 0], scale: 2.3 },
      { position: [-2.5, 0, 0], rotation: [0, 1, 0], scale: 2.3 },
      { position: [2.5, 0, 0], rotation: [0.8, -1, 0], scale: 2.3 },
      { position: [0, 0, 1], rotation: [-1, 1, 0], scale: 1.8 },
      { position: [1, 0.2, 1.5], rotation: [0, 0.5, 0], scale: 1.8 },
      { position: [0, 0.2, 1.5], rotation: [0, 1.5, 0], scale: 2.3 },
    ],

    mobile: [
      { position: [0, 0, 0], rotation: [0, 0, 0], scale: 2.5 },
      { position: [0, 0, 0], rotation: [1, 0, 0], scale: 2.5 },
      { position: [0, 0, 0], rotation: [0.5, -1, 0], scale: 3 },
      { position: [0, 0, 0], rotation: [0, Math.PI, 0], scale: 2 },
    ]
  },

  airZoom: {
    desktop: [
      { position: [0, -0.1, 3], rotation: [0, 1.5, 0], scale: 1.4 },
      { position: [-1.5, -0.5, 1], rotation: [0, 2.7, 0], scale: 1.4 },
      { position: [1, -0.3, 2], rotation: [1, -2, 0], scale: 1.4 },
      { position: [0, -0.1, 3], rotation: [0.3, -2.5, 0], scale: 1.2 },
      { position: [1, 0, 1.5], rotation: [-1, 2, 0], scale: 1.8 },
      { position: [0, 0, 1.5], rotation: [-1.5, 2, 0], scale: 1.8 },

    ],

    mobile: [
      { position: [0, -0.3, 0], rotation: [0, 0, 0], scale: 1.6 },
      { position: [0, -0.3, 0], rotation: [1, 0, 0], scale: 1.6 },
      { position: [0, -0.2, 0], rotation: [0.5, -0.5, 0], scale: 2 },
      { position: [0, -0.3, 0], rotation: [0, Math.PI, 0], scale: 1.3 },
    ]
  }
};
const transforms = isMobile
  ? variantTransforms[variant].mobile
  : variantTransforms[variant].desktop;

const current = transforms[sectionIndex] || transforms[0]; 

  const scaleFactor = isMobile ? 0.7 : 1;

  useFrame((state) => {
    if (!groupRef.current) return;

    // Lerp position
    const targetPos = new THREE.Vector3(...current.position).multiplyScalar(isMobile ? 0.6 : 1);
    groupRef.current.position.lerp(targetPos, 0.1);

    // Get base rotation for current variant
    const baseRot = baseRotations[variant] || [0, 0, 0];

    // Combine section rotation + base rotation
    const targetQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
            current.rotation[0] + baseRot[0],
            current.rotation[1] + baseRot[1],
            current.rotation[2] + baseRot[2]
        )
    );
    groupRef.current.quaternion.slerp(targetQuat, 0.08);

    // Lerp scale
    const targetScale = new THREE.Vector3(
      current.scale * scaleFactor,
      current.scale * scaleFactor,
      current.scale * scaleFactor
    );
    groupRef.current.scale.lerp(targetScale, 0.08);

    // Idle wobble
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z += Math.sin(t / 1.8) * 0.003;
  });

  useEffect(() => {
  if (redModel && blueModel && greenModel && yellowModel) {
    setModelsReady(true);
    
    // Extra safety: if manager onLoad hasn't fired yet, force hide loading after models are in memory
    setTimeout(() => {
      if (window.loadingManagerReady !== true) {
        // You can access setIsLoading if you pass it down, but for minimal change:
        console.log("All models parsed - forcing load complete");
      }
    }, 800);
  }
}, [redModel, blueModel, greenModel, yellowModel]);

  if (!sceneObj || !modelsReady) return null;

  return (
    <>
      <group ref={groupRef} key={variant}>
        <primitive object={sceneObj} dispose={null} />
      </group>
      {/* <OrbitControls /> */}
    </>
  );
}

// Preload models
useGLTF.preload("/models/blue_nike_1.glb");
useGLTF.preload("/models/blue_nike_2.glb");
useGLTF.preload("/models/nike.glb");
useGLTF.preload("/models/nike_air_zoom.glb");
