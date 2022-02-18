import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";
import { updateAuth } from "../../store/slices/authSlice";

export default function NavMenu() {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const signOut = () => {
    axios
      .post("http://localhost:5012/b12apiauth/logout", { ...auth })
      .then(({ data }) => {
        if (data.state) {
          dispatch(updateAuth({ user: "", username: "" }));
          history.push("/");
        }
      });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/overview" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Notifications Dropdown Menu */}
          {/* <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell" />
              <span className="badge badge-warning navbar-badge">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">
                15 Notifications
              </span>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2" /> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-users mr-2" /> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-file mr-2" /> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                See All Notifications
              </a>
            </div>
          </li> */}
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li className="nav-item">
            <button className="btn nav-link" onClick={signOut}>
              logout <i className="fas fa-sign-out-alt" />
            </button>
          </li>
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-widget="control-sidebar"
              data-slide="true"
              href="#"
              role="button"
            >
              <i className="fas fa-th-large" />
            </a>
          </li> */}
        </ul>
      </nav>
      {/* /.navbar */}
    </>
  );
}
