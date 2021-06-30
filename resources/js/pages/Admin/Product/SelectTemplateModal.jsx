import React, { useState } from "react";
import Button from "@components/CustomButton/CustomButton.jsx";
import Modal from "react-modal";
import { SelectTemplateModalStyled } from "./style";
import Select from "react-select";
import Loader from "react-loader-spinner";
import StepZilla from "react-stepzilla";
import { useSelector } from "react-redux";
import { ActionTypes } from "@actions";
const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%"
  }
};

export default function SelectTemplateModal(props) {
  const { updateTemplateSelected, dataSelected, removeTemplateSelected } = props;
  const { templates } = useSelector(state => state.categories);
  const { type, status } = useSelector(state => state.fetching);
  const [state, setState] = useState({
    menuSelected: null,
    categorySelected: null
  });
  const [open, setOpen] = useState(false);
  const selectTemplate = item => {
    updateTemplateSelected({
      ...item,
    });
  };
  const removeTemplate = item => {
    removeTemplateSelected(item)
  }

  const closeModal = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };

  const checkTemplatesActived = (item) => {
    return dataSelected.find((data) => data.category_name === item.category_name && data.category_id === item.category_id && data.color === item.color && item.front === data.front && item.back === data.back)
  }

  const renderTemplates = () => {
    if (state.menuSelected) {
      let data = [];
      templates.data.find((item) => {
        if (item.id === state.menuSelected.value) {
          item.category.map((cat, idx) => {
            cat.template.map((temp, idx) => {
              temp.category_name = cat.name
              data.push(temp)
            })
          })
        }
      })
      return data.map((item, idx) => {
        const active = checkTemplatesActived(item)
        return (
          <div className="template-group col-12 col-md-3" key={idx}>
            <div
              style={{
                backgroundImage:
                  "url(" + process.env.MIX_APP_URL + item.front + ")"
              }}
              className="template-item"
              onClick={() => active ? removeTemplate(item) : selectTemplate(item)}
            >
              {active &&
                <div className="template-select">
                  <i className="pe-7s-check" />
                </div>
              }
            </div>
          </div>
        );
      });
    }

  };
  const renderMenuList = () => {
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
        value={state.menuSelected}
        onChange={value =>
          setState({ menuSelected: value, categorySelected: null })
        }
        options={selectItems}
      />
    );
  };
  return (
    <div>
      <Button className="btn-add-category" onClick={showModal}>
        <i className="pe-7s-plus" />
      </Button>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <SelectTemplateModalStyled>
          <div className="header-modal">
            <Button className="back-btn" onClick={closeModal}>
              <i className="pe-7s-angle-left" style={{ fontSize: 50 }} /> Back
            </Button>
            <span>Select Templates</span>
            <Button className="continue-btn">Continue</Button>
          </div>
          <div className="body-modal">
            {type === ActionTypes.GET_MENU_REQUEST &&
              status ? (
                <Loader
                  type="Circles"
                  color="#36d7b7"
                  height={25}
                  width={25}
                />
              ) : templates && templates.data && templates.data.length ? (
                <>
                  <div className="select-template-type-container">
                    {renderMenuList()}
                  </div>
                  <div className="template-list">{renderTemplates()}</div>
                </>
              ) : (
                  <span>Something wrong !</span>
                )}
          </div>
        </SelectTemplateModalStyled>
      </Modal>
    </div>
  );
}
