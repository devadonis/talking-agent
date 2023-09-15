import * as THREE from "three";
import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from "three-stdlib"
import * as talkingHead from "../../apis/talkingHead";
import { Blendshapes } from "../../apis/mediapipe_audio_blendshapes";

type GLTFResult = GLTF & {
  nodes: {
    Rover: THREE.Mesh;
    Root: THREE.Group;
  };
  materials: {
    [name: string]: THREE.Material;
  };
  animations: THREE.AnimationClip[];
};

export function Doggo(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF('/Doggo08.glb') as GLTFResult
  const { ref, actions } = useAnimations(animations, group)
  const keyactionsStoped = useRef<boolean>(false)
  console.log(actions)
  useEffect(() => {
    setInterval(() => {
      // console.log("ddd");
      if (talkingHead.audioBlendshapes === null) return;
      const blendShapesMapping = talkingHead.audioBlendshapes!.getBlendshapes();
      console.log(blendShapesMapping);
      if (!keyactionsStoped.current && talkingHead.lastAudioT > 0.0) {
        console.log("ddd11111111");
        actions.Idle!.stop();
        actions.Pleased!.play();
        keyactionsStoped.current = true;
      }
    }, 5000);
  }, [nodes]);
  useEffect(() => {
    if (talkingHead.lastAudioT === 0.0) {
      actions.Idle!.play(); 
    }
  });
  return (
    <group ref={ref as React.Ref<THREE.Group>}
    {...props}
    dispose={null}
    position={[0, -.8, 6.5]}
    >
      <group>
        <group name="Geometry">
          <group name="Rover_Props">
            {/* <skinnedMesh name="Rover_travel_bag" geometry={nodes.Rover_travel_bag.geometry} material={nodes.Rover_travel_bag.material} skeleton={nodes.Rover_travel_bag.skeleton} />
            <skinnedMesh name="Rover_footprint" geometry={nodes.Rover_footprint.geometry} material={nodes.Rover_footprint.material} skeleton={nodes.Rover_footprint.skeleton} /> */}
          </group>
          <skinnedMesh name="Rover" geometry={nodes.Rover.geometry} material={nodes.Rover.material} skeleton={(nodes.Rover as THREE.SkinnedMesh).skeleton} />
        </group>
        <primitive object={nodes.Root} />
      </group>
    </group>
  )
}

useGLTF.preload('/Doggo08.glb')