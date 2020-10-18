import React from "react";
// react plugins that creates an input with a date picker
import ImageUploader from "react-images-upload";
//image viewer
import ImageViewer from "react-simple-image-viewer";
import Button from "@components/CustomButton/CustomButton.jsx";
import { Col } from "react-bootstrap";
import { LogoUploadStyled } from "./style";

function LogoUpload(props) {
  const [pictures, setPictures] = React.useState([]);
  const imageUploader = React.useRef();

  const onDrop = (pictureFiles, pictureDataURLs) => {
    console.log(pictureDataURLs);
    imageUploader.current.clearPictures();
    props.getPictureFiles(pictureFiles);
    // if (pictures.length) {
    //   let img = [...pictures];
    //   img = img.concat(pictureDataURLs);
    //   setPictures(img);
    //   props.getPictureFiles(pictureFiles);
    // } else {
    //   setPictures(pictureDataURLs);
    // }
  };

  return (
    <LogoUploadStyled>
      <ImageUploader
        withIcon={true}
        buttonText="Upload Logo"
        label="Please upload logo with type .png"
        onChange={onDrop}
        imgExtension={[".png"]}
        ref={imageUploader}
        withPreview={false}
        singleImage={true}
      />
    </LogoUploadStyled>
  );
}

export default LogoUpload;
