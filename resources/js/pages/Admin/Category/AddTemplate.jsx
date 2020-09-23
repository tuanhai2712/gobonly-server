import React, { useRef, useState } from "react";
import Button from "@components/CustomButton/CustomButton.jsx";
import { BlockPicker } from "react-color";
import { ColorCodeStyled } from "./style";
import TooltipTrigger from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";

const modifiers = [
  {
    name: "offset",
    enabled: true,
    options: {
      offset: [0, 4]
    }
  }
];

export default function AddTemplate(props) {
  const { templates, setTemplates, index } = props;
  const [state, setState] = useState({
    temp_front: null,
    temp_back: null,
    color_code: ""
  });
  const fileInputFront = useRef();
  const fileInputBack = useRef();
  const triggerFileInputFront = () => {
    fileInputFront.current.click();
  };
  const triggerFileInputBack = () => {
    fileInputBack.current.click();
  };

  const handleChangeInputFront = event => {
    templates[index].temp_front = event.target.files[0];
    setState({
      ...state,
      ["temp_front"]: URL.createObjectURL(event.target.files[0])
    });
  };
  const handleChangeInputBack = event => {
    templates[index].temp_back = event.target.files[0];
    setState({
      ...state,
      ["temp_back"]: URL.createObjectURL(event.target.files[0])
    });
  };

  const Trigger = ({ getTriggerProps, triggerRef }) => {
    return (
      <ColorCodeStyled>
        <div
          style={{
            backgroundColor: state.color_code,
            borderColor: state.color_code
          }}
          {...getTriggerProps({
            ref: triggerRef,
            className: "trigger color-select"
          })}
        ></div>
      </ColorCodeStyled>
    );
  };

  const changeColor = colorCode => {
    templates[index].color_code = colorCode.hex;
    setTemplates(templates);
    setState({ ...state, ["color_code"]: colorCode.hex });
  };

  const Tooltip = ({
    getTooltipProps,
    getArrowProps,
    tooltipRef,
    arrowRef,
    placement
  }) => {
    return (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: "tooltip-container"
        })}
      >
        <div
          {...getArrowProps({
            ref: arrowRef,
            "data-placement": placement,
            className: "tooltip-arrow"
          })}
        />
        <div className="tooltip-body">
          <ColorCodeStyled>
            <BlockPicker
              color={state.color_code}
              onChangeComplete={color => changeColor(color)}
            />
          </ColorCodeStyled>
        </div>
      </div>
    );
  };
  return (
    <div className="add-template-container">
      <div className="btn-upload-template">
        <label>Front</label>
        <Button
          onClick={() => triggerFileInputFront()}
          style={{ backgroundImage: `url(${state.temp_front})` }}
        >
          <i className="pe-7s-plus"></i>
          <input
            ref={fileInputFront}
            type="file"
            style={{ display: "none" }}
            onChange={handleChangeInputFront}
          ></input>
        </Button>
      </div>
      <div className="btn-upload-template">
        <label>Back</label>
        <Button
          onClick={() => triggerFileInputBack()}
          style={{ backgroundImage: `url(${state.temp_back})` }}
        >
          <i className="pe-7s-plus"></i>
          <input
            ref={fileInputBack}
            type="file"
            style={{ display: "none" }}
            onChange={handleChangeInputBack}
          ></input>
        </Button>
      </div>
      <div className="btn-upload-template">
        <label>Color</label>
        <TooltipTrigger
          placement="right"
          trigger="click"
          tooltip={Tooltip}
          modifiers={modifiers}
        >
          {Trigger}
        </TooltipTrigger>
      </div>
    </div>
  );
}
