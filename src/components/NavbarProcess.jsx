import React from "react";
import { Link } from "react-router-dom";

export default function NavbarProcess() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="text-light fw-bold">-- PROCESS NAME --</div>
        <div className="d-flex justify-content-around w-25">
          <Link className="text-light fw-bold" to="/dashboard">
            Dashboard
          </Link>
          <Link className="text-light fw-bold" to="/layout">
            Layout
          </Link>
        </div>
      </div>
    </>
  );
}
