import React, { Component, useRef, useState } from "react";
import { render } from "react-dom";
import Draggable from "react-draggable";
import "./style.css";
import { range } from "ramda";
import logo from "./logo.png";
import tshirt from "./tshirt.png";
import htmlToImage from "html-to-image";
const size = 1000;

export default function App() {
  const imgRef = useRef();
  const [image, setImg] = useState();
  const [state, setState] = useState({
    width: 250,
    height: 250
  });
  const test = () => {
    htmlToImage
      .toPng(imgRef.current)
      .then(function(dataUrl) {
        // var img = new Image();
        // img.src = dataUrl;
        console.log(dataUrl);
        setImg(dataUrl);
        // document.body.appendChild(img);
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  };
  const handleInputChange = event => {
    const { value, name } = event.target;
    setState({ ...state, [name]: parseInt(value) });
  };
  console.log(state);
  return (
    <>
      <input
        type="number"
        name="width"
        value={state.width}
        onChange={e => handleInputChange(e)}
      />
      <input
        type="number"
        name="height"
        value={state.height}
        onChange={e => handleInputChange(e)}
      />
      <button onClick={() => test()}>ok</button>
      <img src={image} />
      <div ref={imgRef}>
        <div
          style={{
            // transform: 'translate(-50%, -50%)',
            height: size,
            width: size,
            position: "relative",
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
            background: "url(" + tshirt + ")",
            backgroundSize: "cover"
          }}
        >
          <Draggable bounds="parent">
            <div
              style={{
                cursor: "grab",
                height: 250,
                width: 250,
                display: "flex",
                flexWrap: "wrap",
                background: "url(" + logo + ")"
              }}
            >
              <img
                src={logo}
                style={{ width: state.width, height: state.height }}
              />
            </div>
          </Draggable>
        </div>
      </div>
    </>
  );
}
