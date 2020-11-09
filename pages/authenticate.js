import React from "react";
import Authenitcate from "../components/authenticate/Authenticate";
import ToastedParent from "../components/ToastedParent";

const AuthenticatePage = () => {
  return (
    <div className="authenticate">
      <ToastedParent>
        <Authenitcate />
      </ToastedParent>
    </div>
  );
};

export default AuthenticatePage;
