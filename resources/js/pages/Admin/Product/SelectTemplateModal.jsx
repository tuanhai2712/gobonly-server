import React, { useState } from "react";
import Button from "@components/CustomButton/CustomButton.jsx";
import Modal from "react-modal";
import { SelectTemplateModalStyled } from "./style";
import StepZilla from "react-stepzilla";
import { useSelector } from "react-redux";
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

export default function SelectTemplateModal() {
  const { templates } = useSelector(state => state.categories);
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  console.log("templates", templates);
  const selectTemplateModal = item => {
    console.log(item);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };
  const renderTemplates = () => {
    return templates.data[tab].template.map((item, idx) => {
      return (
        <div className="template-group" key={idx}>
          <div
            style={{
              backgroundImage:
                "url(" + process.env.MIX_APP_URL + item.front + ")"
            }}
            className="template-item"
            onClick={() => selectTemplateModal(item, templates.data[tab])}
          >
            <div className="template-select">
              <i className="pe-7s-check" />
            </div>
          </div>
        </div>
      );
    });
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
      >
        <SelectTemplateModalStyled>
          <div className="header-modal">
            <Button className="back-btn" onClick={closeModal}>
              <i className="pe-7s-angle-left" style={{ fontSize: 50 }} /> Back
            </Button>
            <span> Select Templates</span>
            <Button className="continue-btn">Continue</Button>
          </div>
          <div className="body-modal">
            <ul className="category-item">
              {templates.data.map((category, idx) => {
                return (
                  <li
                    key={idx}
                    onClick={() => setTab(idx)}
                    className={`${tab === idx ? "category-active" : ""}`}
                  >
                    {category.name}
                  </li>
                );
              })}
            </ul>
            <div className="template-list">{renderTemplates()}</div>
          </div>
        </SelectTemplateModalStyled>
      </Modal>
    </div>
  );
}
