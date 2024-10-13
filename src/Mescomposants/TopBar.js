// src/components/Accueil.js
import React, { useState, useEffect, useContext } from "react"; // Importation de React et des hooks useState et useEffect
import { useTheme } from "../contexts/ThemeContext";
import { doDisConnexion } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const { theme, toggleTheme } = useTheme();
    let currentUser = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
   

    const profile = {
        "13121316382501833409": "Designer",
        "13121523295256267666": "Gérant",
        2: "Admin",
    };

    const handleChangeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        toggleTheme(newTheme);
    };

    const handledDoDisconnexion = async () => {
        const params = {
            mode: "doDisConnexion",
            STR_UTITOKEN: currentUser.STR_UTITOKEN,
        };
        try {
            const response = await doDisConnexion(params);
            if ((response.data.code_statut = "1")) {
                localStorage.clear();
                navigate("/sign-in");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <header id="page-topbar">
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">
                            {/* LOGO */}
                            <div className="navbar-brand-box horizontal-logo">
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
                                <a
                                    href="index.html"
                                    className="logo logo-light"
                                >
                                    <span className="logo-sm">
                                        <img
                                            src="assets/images/logo-sm.png"
                                            alt=""
                                            height={22}
                                        />
                                    </span>
                                    <span className="logo-lg">
                                        <img
                                            src="assets/images/logo-blanc.svg"
                                            alt=""
                                            height={17}
                                        />
                                    </span>
                                </a>
                            </div>
                            <button
                                type="button"
                                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                                id="topnav-hamburger-icon"
                            >
                                <span className="hamburger-icon">
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </button>
                            {/* App Search*/}
                            <form className="app-search d-none d-md-block">
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                        autoComplete="off"
                                        id="search-options"
                                        defaultValue=""
                                    />
                                    <span className="mdi mdi-magnify search-widget-icon" />
                                    <span
                                        className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                                        id="search-close-options"
                                    />
                                </div>
                                <div
                                    className="dropdown-menu dropdown-menu-lg"
                                    id="search-dropdown"
                                >
                                    <div
                                        data-simplebar=""
                                        style={{ maxHeight: 320 }}
                                    >
                                        {/* item*/}
                                        <div className="dropdown-header">
                                            <h6 className="text-overflow text-muted mb-0 text-uppercase">
                                                Recent Searches
                                            </h6>
                                        </div>
                                        <div className="dropdown-item bg-transparent text-wrap">
                                            <a
                                                href="index.html"
                                                className="btn btn-soft-secondary btn-sm rounded-pill"
                                            >
                                                how to setup{" "}
                                                <i className="mdi mdi-magnify ms-1" />
                                            </a>
                                            <a
                                                href="index.html"
                                                className="btn btn-soft-secondary btn-sm rounded-pill"
                                            >
                                                buttons{" "}
                                                <i className="mdi mdi-magnify ms-1" />
                                            </a>
                                        </div>
                                        {/* item*/}
                                        <div className="dropdown-header mt-2">
                                            <h6 className="text-overflow text-muted mb-1 text-uppercase">
                                                Pages
                                            </h6>
                                        </div>
                                        {/* item*/}
                                        <a
                                            href="javascript:void(0);"
                                            className="dropdown-item notify-item"
                                        >
                                            <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2" />
                                            <span>Analytics Dashboard</span>
                                        </a>
                                        {/* item*/}
                                        <a
                                            href="javascript:void(0);"
                                            className="dropdown-item notify-item"
                                        >
                                            <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2" />
                                            <span>Help Center</span>
                                        </a>
                                        {/* item*/}
                                        <a
                                            href="javascript:void(0);"
                                            className="dropdown-item notify-item"
                                        >
                                            <i className="ri-user-settings-line align-middle fs-18 text-muted me-2" />
                                            <span>My account settings</span>
                                        </a>
                                        {/* item*/}
                                        <div className="dropdown-header mt-2">
                                            <h6 className="text-overflow text-muted mb-2 text-uppercase">
                                                Members
                                            </h6>
                                        </div>
                                        <div className="notification-list">
                                            {/* item */}
                                            <a
                                                href="javascript:void(0);"
                                                className="dropdown-item notify-item py-2"
                                            >
                                                <div className="d-flex">
                                                    <img
                                                        src="assets/images/users/avatar-2.jpg"
                                                        className="me-3 rounded-circle avatar-xs"
                                                        alt="user-pic"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="m-0">
                                                            Angela Bernier
                                                        </h6>
                                                        <span className="fs-11 mb-0 text-muted">
                                                            Manager
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                            {/* item */}
                                            <a
                                                href="javascript:void(0);"
                                                className="dropdown-item notify-item py-2"
                                            >
                                                <div className="d-flex">
                                                    <img
                                                        src="assets/images/users/avatar-3.jpg"
                                                        className="me-3 rounded-circle avatar-xs"
                                                        alt="user-pic"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="m-0">
                                                            David Grasso
                                                        </h6>
                                                        <span className="fs-11 mb-0 text-muted">
                                                            Web Designer
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                            {/* item */}
                                            <a
                                                href="javascript:void(0);"
                                                className="dropdown-item notify-item py-2"
                                            >
                                                <div className="d-flex">
                                                    <img
                                                        src="assets/images/users/avatar-5.jpg"
                                                        className="me-3 rounded-circle avatar-xs"
                                                        alt="user-pic"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="m-0">
                                                            Mike Bunch
                                                        </h6>
                                                        <span className="fs-11 mb-0 text-muted">
                                                            React Developer
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-center pt-3 pb-1">
                                        <a
                                            href="pages-search-results.html"
                                            className="btn btn-primary btn-sm"
                                        >
                                            View All Results{" "}
                                            <i className="ri-arrow-right-line ms-1" />
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="dropdown d-md-none topbar-head-dropdown header-item">
                                <button
                                    type="button"
                                    className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                                    id="page-header-search-dropdown"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="bx bx-search fs-22" />
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                    aria-labelledby="page-header-search-dropdown"
                                >
                                    <form className="p-3">
                                        <div className="form-group m-0">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search ..."
                                                    aria-label="Recipient's username"
                                                />
                                                <button
                                                    className="btn btn-primary"
                                                    type="submit"
                                                >
                                                    <i className="mdi mdi-magnify" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="ms-1 header-item d-none d-sm-flex">
                                {/* <button onClick={handleChangeTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button> */}
                                <button
                                    onClick={handleChangeTheme}
                                    type="button"
                                    className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
                                >
                                    <i className="bx bx-moon fs-22" />
                                </button>
                            </div>
                            <div
                                className="dropdown topbar-head-dropdown ms-1 header-item"
                                id="notificationDropdown"
                            >
                                <button
                                    type="button"
                                    className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                                    id="page-header-notifications-dropdown"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="bx bx-bell fs-22" />
                                    <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                                        3
                                        <span className="visually-hidden">
                                            unread messages
                                        </span>
                                    </span>
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                    aria-labelledby="page-header-notifications-dropdown"
                                >
                                    <div className="dropdown-head bg-primary bg-pattern rounded-top">
                                        <div className="p-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h6 className="m-0 fs-16 fw-semibold text-white">
                                                        {" "}
                                                        Notifications{" "}
                                                    </h6>
                                                </div>
                                                <div className="col-auto dropdown-tabs">
                                                    <span className="badge bg-light-subtle text-body fs-13">
                                                        {" "}
                                                        4 New
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-2 pt-2">
                                            <ul
                                                className="nav nav-tabs dropdown-tabs nav-tabs-custom"
                                                data-dropdown-tabs="true"
                                                id="notificationItemsTab"
                                                role="tablist"
                                            >
                                                <li className="nav-item waves-effect waves-light">
                                                    <a
                                                        className="nav-link active"
                                                        data-bs-toggle="tab"
                                                        href="#all-noti-tab"
                                                        role="tab"
                                                        aria-selected="true"
                                                    >
                                                        All (4)
                                                    </a>
                                                </li>
                                                <li className="nav-item waves-effect waves-light">
                                                    <a
                                                        className="nav-link"
                                                        data-bs-toggle="tab"
                                                        href="#messages-tab"
                                                        role="tab"
                                                        aria-selected="false"
                                                    >
                                                        Messages
                                                    </a>
                                                </li>
                                                <li className="nav-item waves-effect waves-light">
                                                    <a
                                                        className="nav-link"
                                                        data-bs-toggle="tab"
                                                        href="#alerts-tab"
                                                        role="tab"
                                                        aria-selected="false"
                                                    >
                                                        Alerts
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-content position-relative"
                                        id="notificationItemsTabContent"
                                    >
                                        <div
                                            className="tab-pane fade show active py-2 ps-2"
                                            id="all-noti-tab"
                                            role="tabpanel"
                                        >
                                            <div
                                                data-simplebar=""
                                                style={{ maxHeight: 300 }}
                                                className="pe-2"
                                            >
                                                <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                    <div className="d-flex">
                                                        <div className="avatar-xs me-3 flex-shrink-0">
                                                            <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                                                <i className="bx bx-badge-check" />
                                                            </span>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <a
                                                                href="#!"
                                                                className="stretched-link"
                                                            >
                                                                <h6 className="mt-0 mb-2 lh-base">
                                                                    Your{" "}
                                                                    <b>Elite</b>{" "}
                                                                    author
                                                                    Graphic
                                                                    Optimization{" "}
                                                                    <span className="text-secondary">
                                                                        reward
                                                                    </span>{" "}
                                                                    is ready!
                                                                </h6>
                                                            </a>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span>
                                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                                    Just 30 sec
                                                                    ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue=""
                                                                    id="all-notification-check01"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="all-notification-check01"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                    <div className="d-flex">
                                                        <img
                                                            src="assets/images/users/avatar-2.jpg"
                                                            className="me-3 rounded-circle avatar-xs flex-shrink-0"
                                                            alt="user-pic"
                                                        />
                                                        <div className="flex-grow-1">
                                                            <a
                                                                href="#!"
                                                                className="stretched-link"
                                                            >
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                                                    Angela
                                                                    Bernier
                                                                </h6>
                                                            </a>
                                                            <div className="fs-13 text-muted">
                                                                <p className="mb-1">
                                                                    Answered to
                                                                    your comment
                                                                    on the cash
                                                                    flow
                                                                    forecast's
                                                                    graph 🔔.
                                                                </p>
                                                            </div>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span>
                                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                                    48 min ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue=""
                                                                    id="all-notification-check02"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="all-notification-check02"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                    <div className="d-flex">
                                                        <div className="avatar-xs me-3 flex-shrink-0">
                                                            <span className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                                                <i className="bx bx-message-square-dots" />
                                                            </span>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <a
                                                                href="#!"
                                                                className="stretched-link"
                                                            >
                                                                <h6 className="mt-0 mb-2 fs-13 lh-base">
                                                                    You have
                                                                    received{" "}
                                                                    <b className="text-success">
                                                                        20
                                                                    </b>{" "}
                                                                    new messages
                                                                    in the
                                                                    conversation
                                                                </h6>
                                                            </a>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span>
                                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                                    2 hrs ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue=""
                                                                    id="all-notification-check03"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="all-notification-check03"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                    <div className="d-flex">
                                                        <img
                                                            src="assets/images/users/avatar-8.jpg"
                                                            className="me-3 rounded-circle avatar-xs flex-shrink-0"
                                                            alt="user-pic"
                                                        />
                                                        <div className="flex-grow-1">
                                                            <a
                                                                href="#!"
                                                                className="stretched-link"
                                                            >
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                                                    Maureen
                                                                    Gibson
                                                                </h6>
                                                            </a>
                                                            <div className="fs-13 text-muted">
                                                                <p className="mb-1">
                                                                    We talked
                                                                    about a
                                                                    project on
                                                                    linkedin.
                                                                </p>
                                                            </div>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span>
                                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                                    4 hrs ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue=""
                                                                    id="all-notification-check04"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="all-notification-check04"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="my-3 text-center view-all">
                                                    <button
                                                        type="button"
                                                        className="btn btn-soft-success waves-effect waves-light"
                                                    >
                                                        View All Notifications{" "}
                                                        <i className="ri-arrow-right-line align-middle" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade py-2 ps-2"
                                            id="messages-tab"
                                            role="tabpanel"
                                            aria-labelledby="messages-tab"
                                        >
                                            <div
                                                data-simplebar=""
                                                style={{ maxHeight: 300 }}
                                                className="pe-2"
                                            >
                                                <div className="text-reset notification-item d-block dropdown-item">
                                                    <div className="d-flex">
                                                        <img
                                                            src="assets/images/users/avatar-3.jpg"
                                                            className="me-3 rounded-circle avatar-xs"
                                                            alt="user-pic"
                                                        />
                                                        <div className="flex-grow-1">
                                                            <a
                                                                href="#!"
                                                                className="stretched-link"
                                                            >
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                                                    James Lemire
                                                                </h6>
                                                            </a>
                                                            <div className="fs-13 text-muted">
                                                                <p className="mb-1">
                                                                    We talked
                                                                    about a
                                                                    project on
                                                                    linkedin.
                                                                </p>
                                                            </div>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span>
                                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                                    30 min ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue=""
                                                                    id="messages-notification-check01"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="messages-notification-check01"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-reset notification-item d-block dropdown-item">
                                                    <div className="d-flex">
                                                        <img
                                                            src="assets/images/users/avatar-2.jpg"
                                                            className="me-3 rounded-circle avatar-xs"
                                                            alt="user-pic"
                                                        />
                                                        <div className="flex-grow-1">
                                                            <a
                                                                href="#!"
                                                                className="stretched-link"
                                                            >
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                                                    Angela
                                                                    Bernier
                                                                </h6>
                                                            </a>
                                                            <div className="fs-13 text-muted">
                                                                <p className="mb-1">
                                                                    Answered to
                                                                    your comment
                                                                    on the cash
                                                                    flow
                                                                    forecast's
                                                                    graph 🔔.
                                                                </p>
                                                            </div>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span>
                                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                                    2 hrs ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue=""
                                                                    id="messages-notification-check02"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="messages-notification-check02"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-reset notification-item d-block dropdown-item">
                                                    <div className="d-flex">
                                                        <img
                                                            src="assets/images/users/avatar-6.jpg"
                                                            className="me-3 rounded-circle avatar-xs"
                                                            alt="user-pic"
                                                        />
                                                        <div className="flex-grow-1">
                                                            <a
                                                                href="#!"
                                                                className="stretched-link"
                                                            >
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                                                    Kenneth
                                                                    Brown
                                                                </h6>
                                                            </a>
                                                            <div className="fs-13 text-muted">
                                                                <p className="mb-1">
                                                                    Mentionned
                                                                    you in his
                                                                    comment on
                                                                    📃 invoice
                                                                    #12501.
                                                                </p>
                                                            </div>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span>
                                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                                    10 hrs ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue=""
                                                                    id="messages-notification-check03"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="messages-notification-check03"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-reset notification-item d-block dropdown-item">
                                                    <div className="d-flex">
                                                        <img
                                                            src="assets/images/users/avatar-8.jpg"
                                                            className="me-3 rounded-circle avatar-xs"
                                                            alt="user-pic"
                                                        />
                                                        <div className="flex-grow-1">
                                                            <a
                                                                href="#!"
                                                                className="stretched-link"
                                                            >
                                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                                                    Maureen
                                                                    Gibson
                                                                </h6>
                                                            </a>
                                                            <div className="fs-13 text-muted">
                                                                <p className="mb-1">
                                                                    We talked
                                                                    about a
                                                                    project on
                                                                    linkedin.
                                                                </p>
                                                            </div>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span>
                                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                                    3 days ago
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue=""
                                                                    id="messages-notification-check04"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="messages-notification-check04"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="my-3 text-center view-all">
                                                    <button
                                                        type="button"
                                                        className="btn btn-soft-success waves-effect waves-light"
                                                    >
                                                        View All Messages{" "}
                                                        <i className="ri-arrow-right-line align-middle" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade p-4"
                                            id="alerts-tab"
                                            role="tabpanel"
                                            aria-labelledby="alerts-tab"
                                        />
                                        <div
                                            className="notification-actions"
                                            id="notification-actions"
                                        >
                                            <div className="d-flex text-muted justify-content-center">
                                                Select{" "}
                                                <div
                                                    id="select-content"
                                                    className="text-body fw-semibold px-1"
                                                >
                                                    0
                                                </div>{" "}
                                                Result{" "}
                                                <button
                                                    type="button"
                                                    className="btn btn-link link-danger p-0 ms-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#removeNotificationModal"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown ms-sm-3 header-item topbar-user">
                                <button
                                    type="button"
                                    className="btn"
                                    id="page-header-user-dropdown"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <span className="d-flex align-items-center">
                                        <img
                                            className="rounded-circle header-profile-user"
                                            src="assets/images/users/avatar-1.jpg"
                                            alt="Header Avatar"
                                        />
                                        <span className="text-start ms-xl-2">
                                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                                                {currentUser?.STR_UTIFIRSTLASTNAME}
                                            </span>
                                            <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                                                {profile[currentUser?.LG_PROID]}
                                            </span>
                                        </span>
                                    </span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                    {/* item*/}
                                    <h6 className="dropdown-header">
                                      Bienvenu {currentUser?.STR_UTILOGIN} 
                                    </h6>
                                    <a
                                        className="dropdown-item"
                                        href="pages-profile.html"
                                    >
                                        <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />{" "}
                                        <span className="align-middle">
                                            Profile
                                        </span>
                                    </a>
                                    <button
                                        onClick={handledDoDisconnexion}
                                        className="dropdown-item"
                                        href="auth-logout-basic.html"
                                    >
                                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />{" "}
                                        <span
                                            className="align-middle"
                                            data-key="t-logout"
                                        >
                                            Logout
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div
                id="removeNotificationModal"
                className="modal fade zoomIn"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id="NotificationModalbtn-close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mt-2 text-center">
                                <lord-icon
                                    src="../../../../cdn.lordicon.com/gsqxdxog.json"
                                    trigger="loop"
                                    colors="primary:#f7b84b,secondary:#f06548"
                                    style={{ width: 100, height: 100 }}
                                />
                                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                    <h4>Are you sure ?</h4>
                                    <p className="text-muted mx-4 mb-0">
                                        Are you sure you want to remove this
                                        Notification ?
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <button
                                    type="button"
                                    className="btn w-sm btn-light"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn w-sm btn-danger"
                                    id="delete-notification"
                                >
                                    Yes, Delete It!
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
        </>
    );
};

export default TopBar;

// const ThemeSwitcher = () => {
//   const { theme, toggleTheme } = useTheme();

//   const handleChangeTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     toggleTheme(newTheme);
//   };

//   return (
//     <button onClick={handleChangeTheme}>
//       Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
//     </button>
//   );
// };

// export default ThemeSwitcher;
