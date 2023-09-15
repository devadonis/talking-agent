/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 Doggo08.glb 
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { act } from 'react-dom/test-utils'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Doggo08.glb')
  const { actions } = useAnimations(animations, group)

  console.log(actions)
  useEffect(() => {/* highlight-line */
    actions['ClickedOn'].play(); /* highlight-line */
  }); /* highlight-line */

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="Geometry">
          {/* <group name="Rover_Props">
            <skinnedMesh name="Rover_travel_bag" geometry={nodes.Rover_travel_bag.geometry} material={nodes.Rover_travel_bag.material} skeleton={nodes.Rover_travel_bag.skeleton} />
            <skinnedMesh name="Rover_footprint" geometry={nodes.Rover_footprint.geometry} material={nodes.Rover_footprint.material} skeleton={nodes.Rover_footprint.skeleton} />
          </group> */}
          <skinnedMesh name="Rover" geometry={nodes.Rover.geometry} material={nodes.Rover.material} skeleton={nodes.Rover.skeleton} />
        </group>
        <primitive object={nodes.Root} />
      </group>
    </group>
  )
}

useGLTF.preload('/Doggo08.glb')
