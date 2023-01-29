import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Block } from './blocks'
import { Shapes, Categories, Box } from './Home'
import state from './store'
import '../styles.css'
import Card from '../utils/Card/Card'

function HtmlContent({ className, style, children, portal }) {
  const { size } = useThree()
  return (
    <Html
      portal={portal}
      style={{
        position: 'absolute',
        top: -size.height / 2,
        left: -size.width / 2,
        width: size.width,
        height: size.height
      }}>
      <div className={className} style={style}>
        {children}
      </div>
    </Html>
  )
}

export default function Main() {
  const [events, setEvents] = useState()
  const domContent = useRef()
  const scrollArea = useRef()
  const onScroll = (e) => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  return (
    <>
      <Canvas
        gl={{ alpha: false, antialias: true }}
        camera={{ position: [0, 0, 4.5], fov: 50, near: 0.1, far: 100 }}
        onCreated={({ gl, events }) => {
          gl.setClearColor('white')
          gl.toneMappingExposure = 2.5
          gl.toneMappingWhitePoint = 1
          // Export canvas events, we will put them onto the scroll area
          setEvents(events)
        }}>
        <Block factor={1.5} offset={0}>
          <Shapes />
          <HtmlContent portal={domContent}>
            <div className="menu left" style={{ top: '1.55rem' }}>
              <a href="/"><h2 style={{ fontSize: '2em', top: '4rem'}}>Kick Store</h2></a>
            </div>
            <div className="menu right" style={{ top: '1.55rem' }}>
              <span>Login</span>
              <span>Sign up</span>
            </div>
            <div className="jumbo">
              <h2 style={{zIndex:'-1'}}>
                Next Gen
                <br/>
                Shoe Store
              </h2>
              <Categories />
            </div>
          </HtmlContent>
        </Block>

        <Block factor={2} offset={3}>
          <Box scale={[2, 2, 2]}/>
          <Html center portal={domContent}>
            <h2>Scroll Down to explore shoes</h2>
            {<Card/>}
          </Html>
        </Block>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll} {...events}>
        <div style={{ position: 'sticky', top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  )
}