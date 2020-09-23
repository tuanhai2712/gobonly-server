import React, { useState, useEffect, useRef } from "react";
import { Grid, Col } from "react-bootstrap";
import LogoUpload from "./LogoUpload";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "@actions";
import Select from "react-select";
import Loader from "react-loader-spinner";
import { isEmpty } from "lodash";
import Button from "@components/CustomButton/CustomButton.jsx";
import { CreateProductStyled } from "./style";
import Draggable from "react-draggable";
import "react-rangeslider/lib/index.css";
import Slider from "react-rangeslider";
import htmlToImage from "html-to-image";
import SelectTemplateModal from "./SelectTemplateModal";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const { templates } = useSelector(state => state.categories);
  const { type, status } = useSelector(state => state.fetching);
  const [categorySelected, setCategorySelected] = useState(null);
  const [template, setTemplate] = useState([]);
  const [image, setImg] = useState(null);
  const [state, setState] = useState({
    url: "",
    logo: [],
    width: 125,
    height: 125
  });
  useEffect(() => {
    dispatch({
      type: ActionTypes.GET_CATEGORY_TEMP_REQUEST
    });
  }, []);

  const getLogo = logo => {
    setState({ ...state, ["logo"]: logo });
  };

  const handleCategorySelect = category => {
    setCategorySelected(category);
    templates.data.find(item => {
      if (item.id === category.value) {
        setTemplate(item.template);
      }
    });
  };

  const renderCategories = () => {
    if (
      (type === ActionTypes.GET_CATEGORY_TEMP_REQUEST && status) ||
      isEmpty(templates)
    ) {
      return (
        <div style={{ textAlign: "center" }}>
          <Loader type="Circles" color="#36d7b7" height={25} width={25} />;
        </div>
      );
    }
    let selectItems = [
      {
        value: 0,
        label: "Menu Option",
        isDisabled: true
      }
    ];
    templates.data.map((item, idx) => {
      selectItems.push({ value: item.id, label: item.name });
    });
    return (
      <Select
        className="react-select primary"
        classNamePrefix="react-select"
        value={categorySelected}
        onChange={value => handleCategorySelect(value)}
        options={selectItems}
      />
    );
  };

  const selectColor = color => {
    template.find((t, idx) => {
      if (t.color === color) {
        setState({ ...state, ["url"]: t.url });
      }
    });
  };

  const renderColor = () => {
    return template.map((t, idx) => {
      return (
        <Button
          key={idx}
          className="cl-btn"
          style={{ backgroundColor: `${t.color}` }}
          onClick={() => selectColor(t.color)}
          key={idx}
        ></Button>
      );
    });
  };

  const selectLogo = index => {
    setState({
      ...state,
      ["logoSelected"]: URL.createObjectURL(state.logo[index])
    });
  };
  const handleChangeWithSlider = value => {
    setState({ ...state, width: value });
  };
  const handleChangeHeightSlider = value => {
    setState({ ...state, height: value });
  };

  const exportImage = () => {
    htmlToImage
      .toPng(imgRef.current)
      .then(function(dataUrl) {
        setImg(dataUrl);
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  };
  return (
    <div className="main-content">
      <CreateProductStyled>
        <Grid fluid>
          <Col md={3}>
            <h3>Design your products</h3>
            <div className="product-section-select">
              <i className="pe-7s-close" onClick={() => console.log("xxx")} />
              <img
                style={{ width: 50 }}
                src={
                  process.env.MIX_APP_URL +
                  "/storage/l7p1Qus1mHRigmdIh0Egnz9aBEONPyKb4nqBVVlj.png"
                }
              />
              <div className="category-info">
                <span className="category-name">Tshirt</span>
                <div className="color-item"></div>
              </div>
            </div>
            <SelectTemplateModal />
            {/* <div>
              {!isEmpty(templates) && (
                <>
                  {renderCategories()}
                  {renderColor()}
                </>
              )}
            </div>

            {state.url && (
              <>
                <div className="config-size-logo-container">
                  <div style={{ flex: 1, marginRight: 10 }}>
                    <label>Width</label>
                    <Slider
                      min={0}
                      max={250}
                      value={state.width}
                      onChange={handleChangeWithSlider}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Height</label>
                    <Slider
                      min={0}
                      max={250}
                      value={state.height}
                      onChange={handleChangeHeightSlider}
                    />
                  </div>
                </div>
                <Button onClick={() => exportImage()}>Export</Button>
                <div style={{ display: "flex" }}>
                  <div
                    ref={imgRef}
                    className="bg-temp-container"
                    style={{
                      background:
                        "url(" + process.env.MIX_APP_URL + state.url + ")"
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
                          src={state.logoSelected}
                          style={{ width: state.width, height: state.height }}
                        />
                      </div>
                    </Draggable>
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src={image} />
                  </div>
                </div>
              </>
            )} */}
          </Col>
          <Col md={9}>
            <LogoUpload
              getPictureFiles={logo => getLogo(logo)}
              pictureFiles={state.logo}
              selectLogo={index => selectLogo(index)}
            />
          </Col>
        </Grid>
      </CreateProductStyled>
    </div>
  );
}
