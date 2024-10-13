import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

const options = [
    { value: "abidjan", label: "abidjan" },
    { value: "dabou", label: "dabou" },
    { value: "bouaké", label: "bouaké" },
];

function Planning() {
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user) {
            navigate("//sign-in");
        }
    }, [navigate]);
    return (
        <div className="row justify-content-center">
            <div className="col-xxl-9">
                <div className="card">
                    <form>
                        <div className="card-body border-bottom border-bottom-dashed p-4">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="profile-user mx-auto  mb-3">
                                        <input
                                            id="profile-img-file-input"
                                            type="file"
                                            className="profile-img-file-input"
                                        />
                                        <label
                                            htmlFor="profile-img-file-input"
                                            className="d-block"
                                            tabIndex={0}
                                        >
                                            <span
                                                className="overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded"
                                                style={{
                                                    height: 60,
                                                    width: 256,
                                                }}
                                            >
                                                <img
                                                    src="assets/images/logo-dark.png"
                                                    className="card-logo card-logo-dark user-profile-image img-fluid"
                                                    alt="logo dark"
                                                />
                                                <img
                                                    src="assets/images/logo-light.png"
                                                    className="card-logo card-logo-light user-profile-image img-fluid"
                                                    alt="logo light"
                                                />
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                {/* {show.showError && (
                                    <div
                                        class="alert alert-danger mb-xl-0"
                                        role="alert"
                                    >
                                        <strong>
                                            {" "}
                                            Erreur lors de la creation de
                                            l'utilisateur{" "}
                                        </strong>{" "}
                                        Contactez votre admistrateur
                                    </div>
                                )}

                                {show.showSuccess && (
                                    <div
                                        class="alert alert-success"
                                        role="alert"
                                    >
                                        <strong> Opération réussi !!</strong>
                                    </div>
                                )} */}
                            </div>
                            {/*end row*/}
                        </div>
                        <div className="card-body p-4">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label
                                        htmlFor="LG_PROID"
                                        className="form-label"
                                    >
                                        Zone de livraison{" "}
                                    </label>
                                    <select
                                        className="form-select"
                                        defaultValue=""
                                    >
                                        <option selected="">Centre-Nord</option>
                                        <option>Open this select menu</option>
                                        <option>Open this select menu</option>
                                        <option>Open this select menu</option>
                                    </select>
                                    {/* <p className="text-danger">
                                        {errors.LG_PROID?.message}
                                    </p> */}
                                </div>
                                <div className="col-md-12">
                                    <label
                                        htmlFor="STR_UTIFIRSTLASTNAME"
                                        className="form-label"
                                    >
                                        Ville de livraison
                                    </label>
                                    <Select
                                        isMulti
                                        name="colors"
                                        options={options}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        // onChange={handleProductSelectChange}
                                        // value={productSelectData}
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                background: "inherit",
                                            }),
                                            multiValue: (provided) => ({
                                                ...provided,
                                                backgroundColor: "#E5F0FF", // Couleur de fond des tags sélectionnés
                                                color: "#4A90E2", // Couleur du texte des tags
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: "inherit",
                                                color: state.isSelected
                                                    ? "white"
                                                    : "#000",
                                                "&:hover": {
                                                    backgroundColor: "#E5F0FF",
                                                    color: "#4A90E2",
                                                },
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        htmlFor="EndleaveDate"
                                        className="form-label"
                                    >
                                        Date d'écheance
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        data-provider="flatpickr"
                                        id="EndleaveDate"
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        htmlFor="EndleaveDate"
                                        className="form-label"
                                    >
                                        Date de livraison
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        data-provider="flatpickr"
                                        id="EndleaveDate"
                                    />
                                </div>
                            </div>

                            {/*end row*/}
                            <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                <Link
                                    type="reset"
                                    to="/dashboard/liste-utilisateurs"
                                    className="btn btn-primary"
                                >
                                    Annuler
                                </Link>
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                >
                                    <i className="ri-send-plane-fill align-bottom me-1" />{" "}
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/*end col*/}
        </div>
    );
}

export default Planning;
