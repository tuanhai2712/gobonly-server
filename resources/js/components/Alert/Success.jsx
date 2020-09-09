import React, { useEffect, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useSelector } from "react-redux";

export default function Success(props) {
  const [open, setOpen] = useState(false);
  const fetching = useSelector(state => state.fetching);
  const { type } = fetching;
  const { successType, mess } = props;

  useEffect(() => {
    if (type === successType) {
      setOpen(true);
    }
  }, [type]);

  return (
    <SweetAlert
      success
      show={false}
      style={{ display: "block", marginTop: "-100px" }}
      title="Good job!"
      onConfirm={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      confirmBtnBsStyle="info"
    >
      {mess}
    </SweetAlert>
  );
}
