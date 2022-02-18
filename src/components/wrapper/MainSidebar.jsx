import React from "react";
import { Link } from "react-router-dom";

export default function MainSidebar() {
  return (
    <>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="#" className="brand-link">
          <img
            src="images/ai.png"
            className="brand-image img-circle elevation-3 bg-light"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">B12 Industry 4.0</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="images/hacker.png"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <p className="d-block h5 text-white">ARAI Programmer</p>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/overview" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Overview</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/all-machine-work-in-process"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Work in Process</p>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Process */}
              <li className="nav-item">
                <a href="#" className="nav-link">
                  {/* <i className="nav-icon fas fa-copy" /> */}
                  <i className="nav-icon fas fa-clipboard-list" />
                  <p>
                    Process
                    <i className="fas fa-angle-left right" />
                    <span className="badge badge-info right">5</span>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Cutting</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Bending</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Forming</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Blazing</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Packing</p>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Report */}
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-chart-bar" />
                  <p>
                    Report
                    <i className="fas fa-angle-left right" />
                    <span className="badge badge-info right">5</span>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/machine-report" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Cutting</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/machine-report" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Bending</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/machine-report" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Forming</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/machine-report" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Blazing</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/machine-report" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Packing</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-users" />
                  <p>
                    Contact
                    <span className="right badge badge-success">Online</span>
                  </p>
                </a>
              </li>

              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-chart-pie" />
                  <p>
                    Charts
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Chart #1</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Chart #2</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Chart #3</p>
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-edit" />
                  <p>
                    Forms
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Form #1</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Form #2</p>
                    </a>
                  </li>
                </ul>
              </li> */}

              {/* <li className="nav-header">LEVELS</li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon far fa-circle text-danger" />
                  <p className="text">Level 1</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon far fa-circle text-warning" />
                  <p>Level 2</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon far fa-circle text-info" />
                  <p>Level 3</p>
                </a>
              </li> */}
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  );
}
