import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { ActionTypes } from "@actions";

export default function Error() {
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();
  let message = `Something wrong!`;
  if (error.status === 401 || error.status === 422) {
    message = error.data.message;
  }
  useEffect(() => {
    if (!isEmpty(error)) {
      notify();
    }
  }, [error]);

  const close = () => {
    dispatch({
      type: ActionTypes.CLOSE_ALERT_ERROR
    });
    dispatch({
      type: ActionTypes.CLEAR_FETCHING
    });
  };
  const notify = () =>
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => close()
    });

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
