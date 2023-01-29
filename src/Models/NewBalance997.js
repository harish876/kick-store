import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"
import { Vector3 } from "three"

const state = proxy({
  current: null,
  items: {
    Inner: "#ffffff",
    Laces: "#ffffff",
    Outer: "#ffffff",
    Sole: "#ffffff",
  },
})
function ShoeModel() {
    const ref = useRef()
    const snap = useSnapshot(state)
    const { nodes, materials } = useGLTF("new_balance_997.glb")
    const [hovered, set] = useState(null)
  
    useFrame((state) => {

        ref.current.rotation.set(Math.PI/2, Math.PI, Math.PI / 2)
        const t = state.clock.getElapsedTime()
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
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
        <mesh receiveShadow castShadow geometry={nodes.Shoe_set_02_Inner_0.geometry} material={materials.Inner} material-color={snap.items.Inner}/>
        <mesh receiveShadow castShadow geometry={nodes.Shoe_set_02_Laces_0.geometry} material={materials.Laces} material-color={snap.items.Laces}/>
        <mesh receiveShadow castShadow geometry={nodes.Shoe_set_02_Outer_0.geometry} material={materials.Outer}material-color={snap.items.Outer}/>
        <mesh receiveShadow castShadow geometry={nodes.Shoe_set_02_Sole_0.geometry} material={materials.Sole} material-color={snap.items.Sole}/>
      </group>
    )
  }
  function Picker() {
    const snap = useSnapshot(state)
    return (
      <div style={{ display: snap.current ? "block" : "none" }}>
        <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
        <h1>{snap.current}</h1>
      </div>
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
  
  export default function NewBalance997() {
    return (
      <>
        <Canvas shadows camera={{ position: [0, 0, 500], fov: 75 }}>
          <ambientLight intensity={0.7} />
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <ShoeModel />
          <Environment preset="city" />
          <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
          <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enablePan={true} enableRotate={true}/>
          <Rig />
        </Canvas>
        <Picker />
      </>
    )
  }