import React from "react";
import Button from "@components/CustomButton/CustomButton.jsx";
export default function EditCategory(props) {
  const { item, back } = props;
  return (
    <div>
      <Button simple icon onClick={() => back()}>
        <i className="pe-7s-angle-left" style={{ fontSize: 50 }} />
      </Button>
      <p>123123123</p>
    </div>
  );
}
