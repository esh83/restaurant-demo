import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = (props) => {
  const { children } = props;

  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [location]);

  return <main style={{minHeight : '90vh'}}>{children}</main>;
};

export default ScrollTop
