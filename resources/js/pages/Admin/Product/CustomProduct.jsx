import React from "react";
import Draggable from "react-draggable";

export default function CustomProduct(props) {
  const {
    templatesSelected,
    height,
    front_logo_size,
    back_logo_size,
    idx,
    logo_back,
    logo_front,
    refTemplateFront,
    refTemplateBack
  } = props;
  return (
    <>
      <div
        className="bg-temp-container"
        style={{
          width: height - 60,
          background:
            "url(" +
            process.env.MIX_APP_URL +
            templatesSelected[idx].front +
            ") no-repeat center center"
        }}
        ref={refTemplateFront}
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
            {logo_front && (
              <img
                src={logo_front}
                style={{
                  width: front_logo_size,
                  height: front_logo_size
                }}
              />
            )}
          </div>
        </Draggable>
      </div>
      <div
        className="bg-temp-container"
        style={{
          width: height - 60,
          background:
            "url(" +
            process.env.MIX_APP_URL +
            templatesSelected[idx].back +
            ") no-repeat center center"
        }}
        ref={refTemplateBack}
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
            {logo_back && (
              <img
                src={logo_back}
                style={{
                  width: back_logo_size,
                  height: back_logo_size
                }}
              />
            )}
          </div>
        </Draggable>
      </div>
    </>
  );
}
