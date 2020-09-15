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
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const imageUploader = React.useRef();

  const onDrop = (pictureFiles, pictureDataURLs) => {
    imageUploader.current.clearPictures();
    props.getPictureFiles(pictureFiles);
    if (pictures.length) {
      let img = [...pictures];
      img = img.concat(pictureDataURLs);
      setPictures(img);
    } else {
      setPictures(pictureDataURLs);
    }
  };

  const openImageViewer = React.useCallback(index => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const removeImg = (src, idx) => {
    const filteredFiles = props.pictureFiles.filter(
      (e, index) => index !== idx
    );
    props.getPictureFiles(filteredFiles);
    let prvImg = pictures.filter(item => item !== src);
    setPictures(prvImg);
  };

  return (
    <LogoUploadStyled>
      <ImageUploader
        withIcon={true}
        buttonText="Chọn ảnh"
        label="Vui lòng upload logo có định dạng png"
        onChange={onDrop}
        imgExtension={[".png"]}
        ref={imageUploader}
      />
      {pictures.map((src, index) => {
        return (
          <Col md={2} key={index}>
            <Button
              className="remove-logo-btn"
              onClick={() => removeImg(src, index)}
            >
              <i className="pe-7s-close"></i>
            </Button>
            <img
              className="logo"
              src={src}
              onClick={() => props.selectLogo(index)}
              alt=""
            />
          </Col>
        );
      })}
      {isViewerOpen && (
        <ImageViewer
          src={pictures}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
        />
      )}
    </LogoUploadStyled>
  );
}

export default LogoUpload;
