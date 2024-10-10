import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { doRequest, doSignInRequest } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const schema = yup
    .object({
        STR_UTILOGIN: yup.string().required("Champs requis"),
        STR_UTIPASSWORD: yup.string().required("Champs requis"),
    })
    .required();

function SignIn() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow((v) => !v);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        let res = null;
        const params = {
            mode: "doConnexion",
            STR_UTILOGIN: data.STR_UTILOGIN,
            STR_UTIPASSWORD: data.STR_UTIPASSWORD,
            IS_ADMIN: "1",
            STR_SOCCODE: null,
        };
        try {
            const response = await doSignInRequest(params);
            console.log(response);
            if (response.data.code_statut === "1") {
                console.log(response.data[0]);
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/dashboard/demandes-clients");
            } else {
                handleShow();
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
            <div className="bg-overlay" />
            {/* auth-page content */}
            <div className="auth-page-content overflow-hidden pt-lg-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card overflow-hidden border-0">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="p-lg-5 p-4 auth-one-bg h-100">
                                            <div className="bg-overlay" />
                                            <div className="position-relative h-100 d-flex flex-column">
                                                <div className="mb-4">
                                                    <a
                                                        href="index.html"
                                                        className="d-block"
                                                    >
                                                        <img
                                                            src="assets/images/logo-light.png"
                                                            alt=""
                                                            height={18}
                                                        />
                                                    </a>
                                                </div>
                                                <div className="mt-auto">
                                                    <div className="mb-3">
                                                        <i className="ri-double-quotes-l display-4 text-success" />
                                                    </div>
                                                    <div
                                                        id="qoutescarouselIndicators"
                                                        className="carousel slide"
                                                        data-bs-ride="carousel"
                                                    >
                                                        <div className="carousel-indicators">
                                                            <button
                                                                type="button"
                                                                data-bs-target="#qoutescarouselIndicators"
                                                                data-bs-slide-to={
                                                                    0
                                                                }
                                                                className="active"
                                                                aria-label="Slide 1"
                                                                aria-current="true"
                                                            />
                                                            <button
                                                                type="button"
                                                                data-bs-target="#qoutescarouselIndicators"
                                                                data-bs-slide-to={
                                                                    1
                                                                }
                                                                aria-label="Slide 2"
                                                                className=""
                                                            />
                                                            <button
                                                                type="button"
                                                                data-bs-target="#qoutescarouselIndicators"
                                                                data-bs-slide-to={
                                                                    2
                                                                }
                                                                aria-label="Slide 3"
                                                                className=""
                                                            />
                                                        </div>
                                                        <div className="carousel-inner text-center text-white pb-5">
                                                            <div className="carousel-item active">
                                                                <p className="fs-15 fst-italic">
                                                                    " Great!
                                                                    Clean code,
                                                                    clean
                                                                    design, easy
                                                                    for
                                                                    customization.
                                                                    Thanks very
                                                                    much! "
                                                                </p>
                                                            </div>
                                                            <div className="carousel-item">
                                                                <p className="fs-15 fst-italic">
                                                                    " The theme
                                                                    is really
                                                                    great with
                                                                    an amazing
                                                                    customer
                                                                    support."
                                                                </p>
                                                            </div>
                                                            <div className="carousel-item">
                                                                <p className="fs-15 fst-italic">
                                                                    " Great!
                                                                    Clean code,
                                                                    clean
                                                                    design, easy
                                                                    for
                                                                    customization.
                                                                    Thanks very
                                                                    much! "
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* end carousel */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end col */}
                                    <div className="col-lg-6">
                                        <div className="p-lg-5 p-4">
                                            <div>
                                                <h5 className="text-primary">
                                                    Akwaba !
                                                </h5>
                                                <p className="text-muted">
                                                    Sign in to continue to
                                                    Velzon.
                                                </p>
                                            </div>
                                            {show && (
                                                <div
                                                    class="alert alert-danger mb-xl-0"
                                                    role="alert"
                                                >
                                                    <strong>
                                                        {" "}
                                                        Mot de passe ou Nom
                                                        d'utilisateur incorrecte{" "}
                                                    </strong>{" "}
                                                    Contactez votre admistrateur
                                                </div>
                                            )}
                                            <div className="mt-4">
                                                <form
                                                    onSubmit={handleSubmit(
                                                        onSubmit
                                                    )}
                                                >
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="STR_UTILOGIN"
                                                            className="form-label"
                                                        >
                                                            Nom d'utilisateur
                                                        </label>
                                                        <input
                                                            {...register(
                                                                "STR_UTILOGIN"
                                                            )}
                                                            id="STR_UTILOGIN"
                                                            className="form-control"
                                                            placeholder="Nom d'utilisateur"
                                                        />
                                                        <p className="text-danger">
                                                            {
                                                                errors
                                                                    .STR_UTILOGIN
                                                                    ?.message
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="password-input"
                                                        >
                                                            Mot de passe
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                {...register(
                                                                    "STR_UTIPASSWORD"
                                                                )}
                                                                placeholder="Mot de passe"
                                                                id="password-input"
                                                                className="form-control pe-5 password-input"
                                                                type="password"
                                                            />
                                                            <p className="text-danger">
                                                                {
                                                                    errors
                                                                        .STR_UTIPASSWORD
                                                                        ?.message
                                                                }
                                                            </p>
                                                            <button
                                                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                                type="button"
                                                                id="password-addon"
                                                            >
                                                                <i className="ri-eye-fill align-middle" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <button
                                                            className="btn btn-success w-100"
                                                            type="submit"
                                                        >
                                                            Sign In
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end col */}
                                </div>
                                {/* end row */}
                            </div>
                            {/* end card */}
                        </div>
                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* end container */}
            </div>
            {/* end auth page content */}
            {/* footer */}
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <p className="mb-0">
                                    © 2024 Velzon. Crafted with{" "}
                                    <i className="mdi mdi-heart text-danger" />{" "}
                                    by Themesbrand
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* end Footer */}
        </div>
    );
}

export default SignIn;
