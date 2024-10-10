import React from "react";
import { NavLink } from "react-router-dom";

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
                                    {/* <NavItem
                                        title={"Demandes clients"}
                                        href={"/dashboard/demandes-clients"}
                                    /> */}
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <a
                                                href="#sidebarCalendar"
                                                className="nav-link"
                                                data-bs-toggle="collapse"
                                                role="button"
                                                aria-expanded="true"
                                                aria-controls="sidebarCalendar"
                                                data-key="t-calender"
                                            >
                                                Clients
                                            </a>
                                            <div
                                                className="menu-dropdown collapse show"
                                                id="sidebarCalendar"
                                                style={{}}
                                            >
                                                <ul className="nav nav-sm flex-column">
                                                    <li className="nav-item">
                                                        <NavLink
                                                            to="/dashboard/demandes-clients/toutes"
                                                            className="nav-link"
                                                            data-key="t-main-calender"
                                                        >
                                                            {" "}
                                                            Demandes clients{" "}
                                                        </NavLink>
                                                        <NavLink
                                                            to="/dashboard/demandes-clients/approuvées"
                                                            className="nav-link"
                                                            data-key="t-main-calender"
                                                        >
                                                            {" "}
                                                            Demandes clients approuvées{" "}
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link menu-link"
                                href="#sidebarAppsUser"
                                data-bs-toggle="collapse"
                                role="button"
                                aria-expanded="true"
                                aria-controls="sidebarAppsUser"
                            >
                                <i data-feather="home" className="icon-dual" />{" "}
                                <span data-key="t-dashboards">
                                    Utilisateurs
                                </span>
                            </a>
                            <div
                                className="menu-dropdown collapse show"
                                id="sidebarAppsUser"
                                style={{}}
                            >
                                <ul className="nav nav-sm flex-column">
                                    <NavItem
                                        title={"Liste utilisateurs"}
                                        href={"/dashboard/liste-utilisateurs"}
                                    />
                                    <NavItem
                                        title={"Création utilisateur"}
                                        href={"/dashboard/creation-utilisateur"}
                                    />
                                    <NavItem
                                        title={"Commandes"}
                                        href={"/dashboard/commandes"}
                                    />
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link menu-link"
                                href="#sidebarAppsPro"
                                data-bs-toggle="collapse"
                                role="button"
                                aria-expanded="true"
                                aria-controls="sidebarAppsPro"
                            >
                                <i data-feather="home" className="icon-dual" />{" "}
                                <span data-key="t-dashboards">
                                    Produits
                                </span>
                            </a>
                            <div
                                className="menu-dropdown collapse show"
                                id="sidebarAppsPro"
                                style={{}}
                            >
                                <ul className="nav nav-sm flex-column">
                                    <NavItem
                                        title={"Mise à jour des produits"}
                                        href={"/dashboard/produits"}
                                    />
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

function NavItem({ title, href }) {
    return (
        <li className="nav-item">
            <NavLink to={href} className="nav-link">
                {" "}
                {title}
            </NavLink>
        </li>
    );
}

export default CustomAppMenu;
