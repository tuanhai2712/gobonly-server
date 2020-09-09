import React, { useRef } from "react";

// import tshirt from "./T-shirt White.png";
import logo from "./logo.png";
import tshirt from "./tshirt.png";
import Draggable from "./Draggable";
import htmlToImage from "html-to-image";
function CreateProduct() {
  const imgRef = useRef();
  const test = () => {
    htmlToImage
      .toPng(imgRef)
      .then(function(dataUrl) {
        // var img = new Image();
        // img.src = dataUrl;
        console.log(dataUrl);
        // document.body.appendChild(img);
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  };
  return (
    <div>
      <div>
        {/* <img src={tshirt} /> */}
        <button onClick={() => test()}>ok</button>
        <div ref={imgRef}>
          <Draggable />
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
