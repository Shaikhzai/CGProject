//for the shirt model
import React from 'react'
import {easing} from 'maath'
import {useSnapshot} from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'

import state from '../store'

const Shirt = () => {

  const snap= useSnapshot(state);
  //importing shirt 3d modle
  const {nodes, materials}= useGLTF('/shirt_baked.glb');

  //texture for shirt
  const logoTexture= useTexture(snap.logoDecal);
  const fullTexture= useTexture(snap.fullDecal);

  useFrame((state, delta)=> easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString= JSON.stringify(snap);

  return (
    <group
      key={stateString}
    >
        <mesh
          castShadow
          geometry={nodes.T_Shirt_male.geometry}
          material={materials.lambert1}
          material-roughness={1}
          dispose={null}
        >
          {/* to check if showing texture or not */}
          {snap.isFullTexture && (
            <Decal
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              map={fullTexture}
            />
          )}

          {/* to check if there exist a logo */}
          {snap.isLogoTexture && (
            <Decal
              position={[0, 0.04, 0.15]}
              rotation={[0, 0, 0]}
              scale={0.15}
              map={logoTexture}
              //map-anisotropy={16}
            />
          )}
        </mesh>
    </group>
  )
}

export default Shirt