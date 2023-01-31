import React from "react"
import { isEmpty } from "lodash"
import { Collapse, InputNumber, Space, Tag, theme, Empty } from "antd"
import { EditOutlined, CheckCircleTwoTone, DeleteOutlined, CaretRightOutlined, DollarCircleFilled } from "@ant-design/icons"
const { Panel } = Collapse

function Kart(props) {
  const { props: items } = props
  const { token } = theme.useToken()
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  }
  const RenderCustomDetails = (props) => {
    const { props: attributes } = props
    delete attributes.key
    return (
      <>
        <p style={{ marginBottom: "10px" }}>
          <span style={{ fontWeight: "800", color: "#2E2E2E" }}>Custom Details</span>
        </p>
        <Space size={[0, 8]} wrap>
          {attributes &&
            Object.entries(attributes).map((attribute) => {
              return (
                <Tag style={{ color: "black" }} color={attribute[1]}>
                  {attribute[0]}
                </Tag>
              )
            })}
        </Space>
      </>
    )
  }
  const genExtra = () => (
    <Space size="middle">
      <CheckCircleTwoTone twoToneColor="#52c41a" />
      <EditOutlined
        onClick={(event) => {
          event.stopPropagation()
        }}
      />
      <InputNumber style={{ width: "95px" }} addonBefore={<div>Qty</div>} size="small" min={0} max={10} defaultValue={1} />
      <DeleteOutlined />
    </Space>
  )
  if (isEmpty(items)) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
        description={
          <span>
            Shop Some<a href="./">Sneakers</a>
          </span>
        }
      />
    )
  }
  return (
    <Space
      direction="vertical"
      style={{
        display: "flex",
      }}>
      {items &&
        items.map(({ name, customModel = {}, description, price, size }, index) => {
          return (
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              style={{
                background: token.colorBgContainer,
              }}>
              <Panel header={`${index + 1}. ${name}`} key={index+1} extra={genExtra()} style={panelStyle}>
                <p>
                  <span style={{ fontWeight: "800", color: "#2E2E2E" }}>Description:</span> {description}
                </p>
                <p>
                  <span style={{ fontWeight: "800", color: "#2E2E2E" }}>Price:</span>&nbsp;
                  <DollarCircleFilled /> {price}
                </p>
                <p>
                  <span style={{ fontWeight: "800", color: "#2E2E2E" }}>Size:</span>&nbsp;{size}
                </p>
                {!isEmpty(customModel) && <RenderCustomDetails props={customModel} />}
              </Panel>
            </Collapse>
          )
        })}
    </Space>
  )
}
export default Kart
