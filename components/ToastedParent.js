import React from "react";
import { ToastProvider } from "react-toast-notifications";

const ToastedParent = (props) => {
  return (
    <ToastProvider placement={props.placement || "bottom-right"}>
      {props.children}
    </ToastProvider>
  );
};

export default ToastedParent;
