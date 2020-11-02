import React, { useState, useEffect, useRef } from "react";
import { Grid, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "@actions";
import Button from "@components/CustomButton/CustomButton.jsx";
import { CreateProductStyled } from "./style";
import "react-rangeslider/lib/index.css";
import Slider from "react-rangeslider";
import htmlToImage from "html-to-image";
import SelectTemplateModal from "./SelectTemplateModal";
import CustomProduct from "./CustomProduct";
import localStorage from "redux-persist/es/storage";

const test = [
  {
    back: "/storage/DcT1xJtptvRZvT1vCyUNAg0QEjJKgU4oMrxB1YbK.png",
    category_id: 1,
    category_name: "T-Shirt",
    color: "#697689",
    front: "/storage/e63z7VN1OkiiL76uVrtuvROpGyOzQP8kyUaDoN4e.png",
    id: 1
  },
  {
    back: "/storage/Z6jEeWYcbDXgkYXHfxoYGXwAaywF1EpXBNiqIjh4.png",
    category_id: 1,
    category_name: "T-Shirt",
    color: "#2ccce4",
    front: "/storage/1KHjGzv9sV6fYJzgFIZgoHtETgjPmklT9lEWSUdL.png",
    id: 2
  }
];

export default function CreateProduct() {
  const dispatch = useDispatch();
  const refTemplateFront = useRef();
  const refTemplateBack = useRef();
  const editTabRef = useRef();
  const fileInputFront = useRef();
  const fileInputBack = useRef();
  const [templatesSelected, setTemplateSelected] = useState([]);
  const [height, setHeight] = useState(0);

  const [state, setState] = useState({
    front_logo_size: 125,
    back_logo_size: 125,
    idx: 0,
    logo_front: "",
    logo_back: ""
  });
  const [abc, setAbc] = useState([]);
  useEffect(() => {
    dispatch({
      type: ActionTypes.GET_CATEGORY_TEMP_REQUEST
    });
    setHeight(Math.floor(editTabRef.current.offsetWidth / 2));
    setState({
      ...state,
      ["front_logo_size"]: Math.floor(editTabRef.current.offsetWidth / 6),
      ["back_logo_size"]: Math.floor(editTabRef.current.offsetWidth / 6)
    });
  }, []);

  const triggerFileInputFront = () => {
    fileInputFront.current.click();
  };
  const triggerFileInputBack = () => {
    fileInputBack.current.click();
  };

  const handleChangeInputFront = event => {
    setState({
      ...state,
      ["logo_front"]: URL.createObjectURL(event.target.files[0])
    });
  };
  const handleChangeInputBack = event => {
    setState({
      ...state,
      ["logo_back"]: URL.createObjectURL(event.target.files[0])
    });
  };

  const handleChangeFrontLogoSize = value => {
    setState({ ...state, front_logo_size: value });
  };
  const handleChangeBackLogoSize = value => {
    setState({ ...state, back_logo_size: value });
  };

  const selectedTemplate = item => {
    setTemplateSelected(prevArray => [...prevArray, item]);
  };
  const removeTemplateSelected = item => {
    let newArr = templatesSelected;
    newArr.splice(
      newArr.findIndex(
        i =>
          i.category_name === item.category_name &&
          i.category_id === item.category_id &&
          i.color === item.color &&
          item.front === i.front &&
          item.back === i.back
      ),
      1
    );
    setTemplateSelected([...newArr]);
  };
  const selectTemplateToCustom = idx => {
    setState({ ...state, ["idx"]: idx, ["url"]: "" });
  };
  const renderTemplateSelected = () => {
    if (templatesSelected.length) {
      return templatesSelected.map((item, idx) => {
        return (
          <div
            className="product-section-select"
            key={idx}
            onClick={() => selectTemplateToCustom(idx)}
          >
            <i
              className="pe-7s-close"
              onClick={() => removeTemplateSelected(item)}
            />
            <img
              style={{ width: 50 }}
              src={process.env.MIX_APP_URL + item.front}
            />
            <div className="category-info">
              <span className="category-name">{item.category_name}</span>
              <div
                className="color-item"
                style={{ backgroundColor: `${item.color}` }}
              ></div>
            </div>
          </div>
        );
      });
    }
    return null;
  };

  async function exportFile() {
    test.map((item, idx) => {
      refTemplateFront.current.style.background =
        "url(" +
        process.env.MIX_APP_URL +
        item.front +
        ") no-repeat center center";
      htmlToImage
        .toPng(refTemplateFront.current)
        .then(function(dataUrl) {
          console.log(idx);
          console.log(dataUrl);
          console.log(refTemplateFront.current);
        })
        .catch(function(error) {
          console.error("oops, something went wrong!", error);
        });
      // if (item.id === 1) {
      //   refTemplateFront.current.style.background =
      //     "url(" +
      //     process.env.MIX_APP_URL +
      //     item.front +
      //     ") no-repeat center center";
      //     console.log(refTemplateFront.current)
      //   // exportImageFront();
      // }
      // if (item.id === 2) {
      //   refTemplateFront.current.style.background =
      //     "url(" +
      //     process.env.MIX_APP_URL +
      //     item.front +
      //     ") no-repeat center center";
      //   exportImageFront();
      // }
    });

    // test.map((item, idx) => {
    //   refTemplateFront.current.style.background =
    //     "url(" +
    //     process.env.MIX_APP_URL +
    //     item.front +
    //     ") no-repeat center center";
    //   // exportImageFront(refTemplateFront.current);
    // });
  }

  async function exportImageFront() {
    const url = await htmlToImage.toPng(refTemplateFront.current);
    setAbc(prevArray => [...prevArray, { front: url }]);
  }
  const exportImageBack = id => {
    htmlToImage
      .toPng(refTemplateBack.current)
      .then(function(dataUrl) {
        localStorage.setItem(
          "products",
          JSON.stringify({
            back: dataUrl,
            id: id
          })
        );
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  };
  return (
    <div className="main-content">
      <CreateProductStyled>
        <Grid fluid>
          <Col md={4}>
            <h3>Design your products</h3>
            {renderTemplateSelected()}
            <SelectTemplateModal
              dataSelected={templatesSelected}
              updateTemplateSelected={item => selectedTemplate(item)}
              removeTemplateSelected={item => removeTemplateSelected(item)}
            />
          </Col>
          <Col md={8}>
            <h3>Custom Product</h3>
            {abc.length &&
              abc.map(i => {
                return (
                  <>
                    <img src={i.front} style={{ width: "50px" }}></img>
                  </>
                );
              })}
            {test.length ? (
              <>
                <Button onClick={() => exportFile()}>Export</Button>
                <div style={{ display: "flex" }}>
                  <div className="btn-upload-logo">
                    <label>Front Logo</label>
                    <Button
                      onClick={() => triggerFileInputFront()}
                      style={{
                        backgroundImage: `url(${state.logo_front})`,
                        backgroundSize: "cover",
                        width: "75px",
                        height: "75px"
                      }}
                    >
                      <i className="pe-7s-plus"></i>
                      <input
                        ref={fileInputFront}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleChangeInputFront}
                      ></input>
                    </Button>
                    <Slider
                      min={0}
                      max={300}
                      value={state.front_logo_size}
                      onChange={handleChangeFrontLogoSize}
                    />
                  </div>
                  <div className="btn-upload-logo">
                    <label>Back Logo</label>
                    <Button
                      onClick={() => triggerFileInputBack()}
                      style={{
                        backgroundImage: `url(${state.logo_back})`,
                        backgroundSize: "cover",
                        width: "75px",
                        height: "75px"
                      }}
                    >
                      <i className="pe-7s-plus"></i>
                      <input
                        ref={fileInputBack}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleChangeInputBack}
                      ></input>
                    </Button>
                    <Slider
                      min={0}
                      max={300}
                      value={state.back_logo_size}
                      onChange={handleChangeBackLogoSize}
                    />
                  </div>
                </div>
              </>
            ) : null}
            <div className="custom-product-container">
              <div
                className="edit-container"
                ref={editTabRef}
                style={{ height }}
              >
                {test.length ? (
                  <CustomProduct
                    templatesSelected={test}
                    height={height}
                    front_logo_size={state.front_logo_size}
                    back_logo_size={state.back_logo_size}
                    idx={state.idx}
                    logo_back={state.logo_back}
                    logo_front={state.logo_front}
                    refTemplateFront={refTemplateFront}
                    refTemplateBack={refTemplateBack}
                  />
                ) : (
                  <span>Please Select Template To Custom First</span>
                )}
              </div>
            </div>
          </Col>
        </Grid>
      </CreateProductStyled>
    </div>
  );
}
