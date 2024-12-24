import { Gltf, OrbitControls } from "@react-three/drei";
import { Instruments } from "./Instruments";

export const Experience = () => {

  return (
    <>
      <OrbitControls />
      <ambientLight />

      <group position={[0, 0, 3]}>
        <Gltf src="models/vrSCENE0.glb" receiveShadow />
        <Instruments /> {/* Composant pour les instruments */}
      </group>

      <directionalLight
        intensity={2.5}
        position={[5, 2, 2]}
        shadow-radius={5} // Rayon des ombres
        castShadow
      />

      {/* Arrière-plan ou environnement */}
      <Gltf scale={[0.6, 0.6, 0.6]} src="models/LightBlueSky.glb" />
    </>
  );
};