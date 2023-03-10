import React, { Fragment } from "react";
import NavigationBar from "./NavBar";
const Layout = (props) => {
  return (
    <Fragment>
      <main>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
