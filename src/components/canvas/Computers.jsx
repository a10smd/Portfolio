import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  return (
    <mesh>
      <hemisphereLight intensity={1.15} groundColor="black" />
      <pointLight intensity={20} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.4 : 0.75}
        position={isMobile ? [0, -2.5, -1] : [0, -3.25, -1.5]}
        rotation={[0, -0.27, 0.01]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Create a media query for detecting screen width less than or equal to 500px
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set initial state based on the media query result
    setIsMobile(mediaQuery.matches);

    // Function to handle changes in the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches); // Update state based on the changed media query result
    };

    // Add event listener for changes in the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Clean up function to remove the event listener when component unmounts or when dependency changes
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
