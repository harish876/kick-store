import React, { useState, useEffect, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { Block } from "./blocks"
import { Shapes, Categories, Box } from "./Home"
import state from "./store"
import "../styles.css"
import Card from "../utils/Card/Card"
import { isEmpty } from "lodash"
import { FloatButton, Modal, notification,Drawer,Timeline } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import Kart from "../utils/Kart/Kart"
import { successMessage, emptyMessage } from '../utils/data'

function HtmlContent({ className, style, children, portal }) {
  const { size } = useThree()
  return (
    <Html
      portal={portal}
      style={{
        position: "absolute",
        top: -size.height / 2,
        left: -size.width / 2,
        width: size.width,
        height: size.height,
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [kartData, setKartData] = useState([])
  const [timeLineOpen, setTimeLineOpen] = useState(false);
  const showDrawer = () => {
    setTimeLineOpen(true);
  };
  const onClose = () => {
    setTimeLineOpen(false);
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type,message,description) => {
    api[type]({message,description});
  };

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
    ! isEmpty(kartData) 
    ? openNotificationWithIcon('success',successMessage.message,successMessage.description) 
    : openNotificationWithIcon('info',emptyMessage.message,emptyMessage.description)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const getKartData = (data) => {
    setKartData(prevVal => [...prevVal, data])
  }
  const editAttributes = (action,selectedId,quantity,basePrice) => {
    if(['changeQuantity'].includes(action))
    {
      setKartData(kartState => kartState.map( item => item.id === selectedId ? {...item,quantity,price:basePrice*quantity} : item ))
    }
    else if(['delete'].includes(action))
    {
      setKartData(kartState => kartState.filter(item => item.id !== selectedId));
    }
  }
  const openKart = () => {
    showModal()
  }
  return (
    <>
      {contextHolder}
      <FloatButton
        icon={<ShoppingCartOutlined />}
        onClick={openKart}
        tooltip={<div>Checkout to cart</div>}
        style={{
          color: "wheat",
          right: 24,
          width: 60,
          height: 60,
        }}
      />
      <FloatButton
        icon={
        <img style={{height:'20px',width:'20px',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}
        src="https://img.icons8.com/cotton/64/null/track-order.png"/>
        }
        onClick={showDrawer}
        tooltip={<div>Track Order Status</div>}
        style={{
          color: "wheat",
          left: 24,
          width: 60,
          height: 60,
        }}
      />
      <Canvas
        gl={{ alpha: false, antialias: true }}
        camera={{ position: [0, 0, 4.5], fov: 50, near: 0.1, far: 100 }}
        onCreated={({ gl, events }) => {
          gl.setClearColor("white")
          gl.toneMappingExposure = 2.5
          gl.toneMappingWhitePoint = 1
          // Export canvas events, we will put them onto the scroll area
          setEvents(events)
        }}>
        <Block factor={1.5} offset={0}>
          <Shapes />
          <HtmlContent portal={domContent}>
            <div className="menu left" style={{ top: "-1rem" }}>
              <a href="/">
                <h2 style={{ fontSize: "2em" }}>Kick Store</h2>
              </a>
            </div>
            <div className="menu right" style={{ top: "1.55rem", paddingRight: "10px", marginRight: "10px" }}>
              <span>Login</span>
              <span>Sign up</span>
            </div>
            <div className="jumbo">
              <h1 style={{ left: "1rem", zIndex: "-1" }}>
                &nbsp;&nbsp;Next Gen
                <br />
                &nbsp;Shoe Store
              </h1>
              <Categories />
            </div>
          </HtmlContent>
        </Block>

        <Block factor={2} offset={3}>
          <Box scale={[2, 2, 2]} />
          <Html center portal={domContent}>
            <h2>Scroll Down to explore shoes</h2>
            <Card getKartData={getKartData} />
            <Modal 
              sz="xl"
              title="Cart" 
              open={isModalOpen} 
              onOk={handleOk} 
              onCancel={handleCancel}
              okText="Checkout"
              width={700}
              >
            <Kart kartData={kartData?kartData:[]} text="Test Props" editAttributes={editAttributes}/>
            </Modal>
            <Drawer title="Track your Order: Order - 2145677" placement="right" onClose={onClose} open={timeLineOpen}>
            <Timeline mode="alternate">
              <Timeline.Item>Order Placed on  2015-09-01</Timeline.Item>
              <Timeline.Item>Order Dispatched on 2015-09-01</Timeline.Item>
              <Timeline.Item>Order Shipped to location 2015-09-01</Timeline.Item>
              <Timeline.Item color="green">Order Recieved 2015-09-01</Timeline.Item>
          </Timeline>
          </Drawer>
          </Html>
        </Block>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll} {...events}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  )
}
