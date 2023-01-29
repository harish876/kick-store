import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"
import { Vector3 } from "three"

const state = proxy({
  current: null,
  items: {
    material_0: "#ffffff",
  },
})
function NikeAirPegasus() {
  const ref = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("nike_air_zoom_pegasus.glb")
  const [hovered, set] = useState(null)

  useFrame((state) => {

    //ref.current.rotation.set(Math.PI / 180, Math.PI , Math.PI / 18)
    ref.current.rotation.set(-Math.PI/180, Math.PI/2, Math.PI / 8)
    const t = state.clock.getElapsedTime()
    ref.current.position.x = (1 + Math.sin(t / 1.5)) / 100
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 100
  })

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
    }
  }, [hovered])

  return (
    <group
      ref={ref}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh 
        receiveShadow
        castShadow
        geometry={nodes.defaultMaterial.geometry}
        material={materials.NikeShoe}
      />
    </group>
  )
}
function Rig() {
  const { camera, mouse } = useThree()
  const vec = new Vector3()

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05)
    camera.lookAt(0, 0, 0)
  })
}

export default function NikeAirPegasusModel() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 15], fov: 10 }}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <NikeAirPegasus />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 4} />
        <Rig />
      </Canvas>
    </>
  )
}

/*
<mesh receiveShadow castShadow geometry={nodes.Object_4.geometry} material={materials[nodes.Object_4.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_6.geometry} material={materials[nodes.Object_6.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_8.geometry} material={materials[nodes.Object_8.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_10.geometry} material={materials[nodes.Object_10.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_12.geometry} material={materials[nodes.Object_12.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_14.geometry} material={materials[nodes.Object_14.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_16.geometry} material={materials[nodes.Object_16.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_18.geometry} material={materials[nodes.Object_18.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_20.geometry} material={materials[nodes.Object_20.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_22.geometry} material={materials[nodes.Object_22.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_24.geometry} material={materials[nodes.Object_24.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_26.geometry} material={materials[nodes.Object_26.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_28.geometry} material={materials[nodes.Object_28.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_30.geometry} material={materials[nodes.Object_30.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_32.geometry} material={materials[nodes.Object_32.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_34.geometry} material={materials[nodes.Object_34.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_36.geometry} material={materials[nodes.Object_36.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_38.geometry} material={materials[nodes.Object_38.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_40.geometry} material={materials[nodes.Object_40.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_42.geometry} material={materials[nodes.Object_42.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_44.geometry} material={materials[nodes.Object_44.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_46.geometry} material={materials[nodes.Object_46.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_48.geometry} material={materials[nodes.Object_48.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_50.geometry} material={materials[nodes.Object_50.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_52.geometry} material={materials[nodes.Object_52.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_54.geometry} material={materials[nodes.Object_54.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_56.geometry} material={materials[nodes.Object_56.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_58.geometry} material={materials[nodes.Object_58.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_60.geometry} material={materials[nodes.Object_60.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_62.geometry} material={materials[nodes.Object_62.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_64.geometry} material={materials[nodes.Object_64.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_66.geometry} material={materials[nodes.Object_66.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_68.geometry} material={materials[nodes.Object_68.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_70.geometry} material={materials[nodes.Object_70.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_72.geometry} material={materials[nodes.Object_72.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_74.geometry} material={materials[nodes.Object_74.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_76.geometry} material={materials[nodes.Object_76.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_78.geometry} material={materials[nodes.Object_78.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_80.geometry} material={materials[nodes.Object_80.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_82.geometry} material={materials[nodes.Object_82.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_84.geometry} material={materials[nodes.Object_84.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_86.geometry} material={materials[nodes.Object_86.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_88.geometry} material={materials[nodes.Object_88.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_90.geometry} material={materials[nodes.Object_90.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_92.geometry} material={materials[nodes.Object_92.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_94.geometry} material={materials[nodes.Object_94.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_96.geometry} material={materials[nodes.Object_96.material.name]} />
      <mesh receiveShadow castShadow geometry={nodes.Object_98.geometry} material={materials[nodes.Object_98.material.name]} />
*/