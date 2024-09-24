import React from "react";
import { Link, NavLink } from "react-router-dom";

function CustomAppMenu() {
    return (
        <div className="app-menu navbar-menu">
            {/* LOGO */}
            <div className="navbar-brand-box">
                {/* Dark Logo*/}
                <a href="index.html" className="logo logo-dark">
                    <span className="logo-sm">
                        <img
                            src="assets/images/logo-sm.png"
                            alt=""
                            height={22}
                        />
                    </span>
                    <span className="logo-lg">
                        <img
                            src="assets/images/logo-dark.png"
                            alt=""
                            height={17}
                        />
                    </span>
                </a>
                {/* Light Logo*/}
                <a href="index.html" className="logo logo-light">
                    <span className="logo-sm">
                        <img
                            src="assets/images/logo-sm.png"
                            alt=""
                            height={22}
                        />
                    </span>
                    <span className="logo-lg">
                        <img
                            src="assets/images/logo-blanc.png"
                            alt=""
                            height={60}
                        />
                    </span>
                </a>
                <button
                    type="button"
                    className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
                    id="vertical-hover"
                >
                    <i className="ri-record-circle-line" />
                </button>
            </div>
            <div id="scrollbar">
                <div className="container-fluid">
                    <div id="two-column-menu"></div>
                    <ul className="navbar-nav" id="navbar-nav">
                        <li className="menu-title">
                            <span data-key="t-menu">Menu</span>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link menu-link"
                                href="#sidebarDashboards"
                                data-bs-toggle="collapse"
                                role="button"
                                aria-expanded="true"
                                aria-controls="sidebarDashboards"
                            >
                                <i data-feather="home" className="icon-dual" />{" "}
                                <span data-key="t-dashboards">Dashboards</span>
                            </a>
                            <div
                                className="menu-dropdown collapse show"
                                id="sidebarDashboards"
                                style={{}}
                            >
                                <ul className="nav nav-sm flex-column">
                                    <NavItem title={"Demandes clients"} />
                                </ul>
                            </div>
                        </li>

                        {/* end Dashboard Menu */}
                    </ul>
                </div>
                {/* Sidebar */}
            </div>
            <div className="sidebar-background" />
        </div>
    );
}

function NavItem({ title }) {
    return (
        <li className="nav-item">
            <NavLink to="/dashboard/demandes-clients" className="nav-link">
                {" "}
                {title}
            </NavLink>
        </li>
    );
}

export default CustomAppMenu;
