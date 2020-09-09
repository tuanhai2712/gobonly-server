import React, { Component, useRef, useState } from "react";
import { render } from "react-dom";
import Draggable from "react-draggable";
import "./style.css";
import { range } from "ramda";
// import logo from "./logo.png";
import tshirt from "./tshirt.png";
import htmlToImage from "html-to-image";
import ImageUploader from "react-images-upload";
const size = 500;

export default function App() {
  const imgRef = useRef();
  const [image, setImg] = useState();
  const [logo, setLogo] = useState();
  const [state, setState] = useState({
    width: 125,
    height: 125
  });
  const test = () => {
    htmlToImage
      .toPng(imgRef.current)
      .then(function(dataUrl) {
        setImg(dataUrl);
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  };
  const handleInputChange = event => {
    const { value, name } = event.target;
    setState({ ...state, [name]: parseInt(value) });
  };

  const onDrop = (file, pictureDataURLs) => {
    setLogo(pictureDataURLs[0]);
  };

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
      <ImageUploader
        withIcon={true}
        buttonText="Select template"
        label={"Template for category"}
        onChange={onDrop}
        singleImage={true}
        imgExtension={[".png"]}
      />
      <img src={image} />
      <div ref={imgRef}>
        <div
          style={{
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
                flexWrap: "wrap"
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
