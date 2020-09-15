import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "@actions";

function CreateMenuModal(props) {
  const { show, close } = props;
  const dispatch = useDispatch();
  const fetching = useSelector(state => state.fetching);
  const { type, status } = fetching;

  const create = e => {
    dispatch({
      type: ActionTypes.CREATE_NEW_MENU_REQUEST,
      payload: { name: e }
    });
  };

  const handleClose = () => {
    dispatch({
      type: ActionTypes.CLEAR_FETCHING
    });
    dispatch({
      type: ActionTypes.GET_MENU_REQUEST
    });
    close(false);
  };

  const renderContent = () => {
    if (type === ActionTypes.CREATE_NEW_MENU_SUCCESS && !status) {
      return (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Created!"
          onConfirm={() => handleClose()}
          onCancel={() => handleClose()}
          confirmBtnBsStyle="info"
        >
          Create New Menu Successfull.
        </SweetAlert>
      );
    }
    return (
      <SweetAlert
        input
        showCancel
        show={show}
        style={{ display: "block", marginTop: "-100px" }}
        title="New Menu"
        onConfirm={e => create(e)}
        onCancel={() => handleClose()}
        confirmBtnBsStyle="info"
        cancelBtnBsStyle="danger"
      />
    );
  };

  return <div>{renderContent()}</div>;
}

export default CreateMenuModal;
