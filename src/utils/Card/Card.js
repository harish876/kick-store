import { useState } from 'react'
import './styles.css'
import { ShoppingCartOutlined, ShareAltOutlined, DollarOutlined } from '@ant-design/icons';
import RenderModel from '../../Models/RenderModel';
import { shoeData } from '../data'
import { Tag, Tooltip, Badge } from 'antd';

const defaultModel = shoeData['NewBalance']
export default function Card() {
    const changeModelInfo = (key) => {
        setModelInfo(shoeData[`${key}`])
    }
    const [modelInfo, setModelInfo] = useState(defaultModel)
    const { key, name, color, watermark, heading, subHeading, description, price } = modelInfo
    return (
        <div class="container">
            <div class="card">
                <div class="shoeBackground">
                    <div class="gradients">
                        <div 
                            class="gradient" 
                            color={color}>
                        </div>
                    </div>
                    <h1 class="nike">{watermark}</h1>
                    <a href="./" class="share"><ShareAltOutlined /></a>
                    <RenderModel
                        props={key}
                    />
                </div>
                <div class="info">
                    <div class="shoeName">
                        <div>
                            <h1 class="big">{heading}</h1>
                        </div>
                        <h3 class="small">{subHeading}</h3>
                    </div>
                    <div class="description">
                        <h3 class="title">Product Info</h3>
                        <p class="text">{description}</p>
                    </div>
                    <div class="color-container">
                        <h3 class="title">Check out some cool models</h3>
                        <div class="colors">
                            <Tooltip title="New Balance" color="#2db7f5">
                                <Tag
                                    style={{ marginBottom: '4px', cursor: 'pointer' }}
                                    color="#2db7f5"
                                    onClick={() => { changeModelInfo('NewBalance') }}
                                >New Balance
                                </Tag>
                            </Tooltip>
                            <Tooltip title="Vans" color="#87d068">
                                <Tag
                                    style={{ marginBottom: '4px', cursor: 'pointer' }}
                                    color="#87d068"
                                    onClick={() => { changeModelInfo('Vans') }}
                                >Vans
                                </Tag>
                            </Tooltip>
                            <Tooltip title="Nike Air Jordans" color="#f50">
                                <Tag
                                    style={{ marginBottom: '4px', cursor: 'pointer' }}
                                    color="#f50"
                                    onClick={() => { changeModelInfo('Jordan') }}
                                >Jordans</Tag>
                            </Tooltip>
                            <Tooltip title="Nike Air Pegasus" color="grey">
                                <Tag
                                    style={{ marginBottom: '4px', cursor: 'pointer' }}
                                    color="grey"
                                    onClick={() => { changeModelInfo("NikeAirPegasus") }}
                                >Pegasus</Tag>
                            </Tooltip>
                            <Tooltip title="Fila Custom Shoes" color="orange">
                                <Tag
                                    style={{ marginBottom: '4px', cursor: 'pointer' }}
                                    color="orange"
                                    onClick={() => { changeModelInfo("Fila") }}
                                >Fila</Tag>
                            </Tooltip>
                            {/*<span class="color" primary="#2175f5" color="blue" ></span>
                            <span class="color" primary="#f84848" color="red"></span>
                            <span class="color" primary="#29b864" color="green"></span>
                            <span class="color" primary="#ff5521" color="orange"></span>
                            <span class="color" primary="#444" color="black"></span>*/}
                        </div>
                    </div>
                    <div class="size-container">
                        <h3 class="title">size</h3>
                        <div class="sizes">
                            <span class="size">7</span>
                            <span class="size">8</span>
                            <span class="size">9</span>
                            <span class="size">10</span>
                            <span class="size">11</span>
                        </div>
                    </div>
                    <div class="buy-price">
                        <a href="#" ><ShoppingCartOutlined />Add to card</a>
                        <div class="price">
                            <DollarOutlined />
                            <h1>{price}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}