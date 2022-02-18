import React from "react";
import PropTypes from "prop-types";

// import Preloader from "./Preloader";
import NavMenu from "./NavMenu";
import MainSidebar from "./MainSidebar";
import Footer from "./Footer";

export default function ContentWrapper({ content: Content }) {
  return (
    <div className="wrapper">
      {/* <Preloader /> */}
      <NavMenu />
      <MainSidebar />

      <div className="content-wrapper">
        <div className="content">
          <div className="container-fluid">
            <Content />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

ContentWrapper.propTypes = {
  content: PropTypes.func.isRequired,
};
