import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { doRequest, urlBaseImage } from "../services/apiService";
import { useDataStore } from "../store/state";
import { Link, useNavigate, useParams } from "react-router-dom";

const schema = yup
    .object({
        STR_UTIFIRSTLASTNAME: yup.string().required("Champs requis"),
        STR_UTIPHONE: yup.string().required("Champs requis"),
        STR_UTIMAIL: yup
            .string()
            .email("Email invalide")
            .required("Champs requis"),
        STR_UTILOGIN: yup.string().required("Champs requis"),
        STR_UTIPASSWORD: yup
            .string()
            .min(6, "Le mot de passe doit contenir au moins 6 caractères")
            .required("Champs requis"),
        STR_UTICPASSWORD: yup
            .string()
            .min(6, "Le mot de passe doit contenir au moins 6 caractères")
            .required("Champs requis")
            //oneOf permet de fournir un tableau de valeur acceptable. Hormis ces valeurs rien n'est accepté. Et yup.ref permet d'indexer un champ enregistrer dans le yup.object()
            .oneOf(
                [yup.ref("STR_UTIPASSWORD"), null],
                "Les mots de passe doivent correspondre"
            ),
        STR_UTIPIC: yup
            .mixed()
            .test("required", "Vous devez fournir un fichier", (value) => {
                return value && value.length;
            })
            .test("fileSize", "Le fichier est trop lourd", (value, context) => {
                return value && value[0] && value[0].size <= 200000;
            })
            .test(
                "type",
                "Seul les jpeg et les png sont autorisés",
                function (value) {
                    return (
                        value &&
                        value[0] &&
                        (value[0].type === "image/jpeg" ||
                            value[0].type === "image/png")
                    );
                }
            ),
        LG_PROID: yup.string().required("Champs requis"),
        STR_UTISTATUT: yup.string(),
        LG_UTIID: yup.string(),
    })
    .required();

function CreateUser() {
    const [show, setShow] = useState({
        showError: false,
        showSuccess: false,
    });
    const navigate = useNavigate();


    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user) {
            navigate("//sign-in");
        }
    }, [navigate]);


    let currentUser = JSON.parse(localStorage.getItem("user"));

    const handleSetShowError = () => {
        setShow({
            ...show,
            showError: true,
        });
        setTimeout(() => {
            setShow({
                ...show,
                showError: false,
            });
        }, 2000);
    };

    const { userID } = useParams();

    const handleSetShowSuccess = () => {
        setShow({
            ...show,
            showSuccess: true,
        });
        setTimeout(() => {
            setShow({
                ...show,
                showSuccess: false,
            });
        }, 2000);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const profile = {
        Designer: "13121316382501833409",
        Gérant: "3",
        Admin: "1",
    };

    const statut = ["enable", "delete"];

    const onSubmit = async (data) => {
        delete data["STR_UTICPASSWORD"];
        data["mode"] = "updateUtilisateur";
        data["STR_UTITOKEN"] = currentUser.str_utitoken;
        data["LG_AGEID"] = "1";
        if (!userID) {
            data["STR_UTIPIC"] = data.STR_UTIPIC[0];
            data["mode"] = "createUtilisateur";
        }
        try {
            const response = await doRequest(data);
            if (response.data.code_statut === "1") {
                handleSetShowSuccess();
            } else {
                handleSetShowError();
            }
        } catch (error) {
            console.error(error.message);
        }
        if (!userID) {
            reset();
        }
        // console.log(data)
    };

    useEffect(() => {
        if (userID) {
            const fetchUserData = async () => {
                let data = null;
                const requestParams = {
                    mode: "getUtilisateur",
                    STR_UTITOKEN: currentUser.str_utitoken,
                    LG_UTIID: userID,
                };
                try {
                    const response = await doRequest(requestParams);
                    data = response.data;
                } catch (error) {
                    console.error(error);
                }

                return data;
            };

            const loadUserData = async () => {
                const userData = await fetchUserData();

                reset({
                    STR_UTIFIRSTLASTNAME: userData.str_utifirstlastname,
                    STR_UTIPHONE: userData.str_utiphone,
                    STR_UTIMAIL: userData.str_utimail,
                    STR_UTILOGIN: userData.str_utilogin,
                    STR_UTIPASSWORD: "",
                    STR_UTICPASSWORD: "",
                    LG_PROID: userData.lg_proid,
                    STR_UTIPIC: `${urlBaseImage}images/avatars/${userData.lg_utiid}/${userData.str_utipic}`,
                    STR_UTISTATUT: userData.str_utistatut,
                    LG_UTIID: userData.lg_utiid,
                });
            };

            loadUserData();
        }
    }, [userID, currentUser.str_utitoken, reset]);

    return (
        <div className="row justify-content-center">
            <div className="col-xxl-9">
                <div className="card">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                {show.showError && (
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
                                )}
                            </div>
                            {/*end row*/}
                        </div>
                        <div className="card-body p-4">
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label
                                        htmlFor="STR_UTIFIRSTLASTNAME"
                                        className="form-label"
                                    >
                                        Nom et prénoms
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="STR_UTIFIRSTLASTNAME"
                                        placeholder="Nom et prénoms"
                                        {...register("STR_UTIFIRSTLASTNAME")}
                                    />
                                    <p className="text-danger">
                                        {errors.STR_UTIFIRSTLASTNAME?.message}
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        htmlFor="STR_UTILOGIN"
                                        className="form-label"
                                    >
                                        Nom d'utilisateur
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="STR_UTILOGIN"
                                        placeholder="Nom d'utilisateur"
                                        {...register("STR_UTILOGIN")}
                                    />
                                    <p className="text-danger">
                                        {errors.STR_UTILOGIN?.message}
                                    </p>
                                </div>

                                <div className="col-md-6">
                                    <label
                                        htmlFor="STR_UTIMAIL"
                                        className="form-label"
                                    >
                                        Email{" "}
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="STR_UTIMAIL"
                                        placeholder="Email"
                                        {...register("STR_UTIMAIL")}
                                    />
                                    <p className="text-danger">
                                        {errors.STR_UTIMAIL?.message}
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <label
                                        htmlFor="STR_UTIPHONE"
                                        className="form-label"
                                    >
                                        Contact{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="STR_UTIPHONE"
                                        placeholder="Contact"
                                        {...register("STR_UTIPHONE")}
                                    />
                                    <p className="text-danger">
                                        {errors.STR_UTIPHONE?.message}
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <label
                                        htmlFor="STR_UTIPASSWORD"
                                        className="form-label"
                                    >
                                        Mot de passe{" "}
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="STR_UTIPASSWORD"
                                        placeholder="Mot de passe"
                                        {...register("STR_UTIPASSWORD")}
                                    />
                                    <p className="text-danger">
                                        {errors.STR_UTIPASSWORD?.message}
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <label
                                        htmlFor="STR_UTICPASSWORD"
                                        className="form-label"
                                    >
                                        Conrfirmer le mot passe{" "}
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="STR_UTICPASSWORD"
                                        placeholder="Confirmer le mot de passe"
                                        {...register("STR_UTICPASSWORD")}
                                    />
                                    <p className="text-danger">
                                        {errors.STR_UTICPASSWORD?.message}
                                    </p>
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="LG_PROID"
                                        className="form-label"
                                    >
                                        Profile utilisateur{" "}
                                    </label>
                                    <select
                                        className="form-select"
                                        {...register("LG_PROID")}
                                        defaultValue=""
                                    >
                                        <option selected="" disabled>
                                            Open this select menu
                                        </option>
                                        {Object.entries(profile).map(
                                            ([key, value]) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {key}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <p className="text-danger">
                                        {errors.LG_PROID?.message}
                                    </p>
                                </div>
                                {userID && (
                                    <div className="col-12">
                                        <label
                                            htmlFor="STR_UTISTATUT"
                                            className="form-label"
                                        >
                                            Statut utilisateur{" "}
                                        </label>
                                        <select
                                            className="form-select"
                                            {...register("STR_UTISTATUT")}
                                            defaultValue=""
                                        >
                                            <option selected="" disabled>
                                                Open this select menu
                                            </option>
                                            {statut.map((value) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-danger">
                                            {errors.STR_UTISTATUT?.message}
                                        </p>
                                    </div>
                                )}
                                <div class="col-12">
                                    <label
                                        htmlFor="STR_UTIPIC"
                                        className="form-label"
                                    >
                                        Photo de profile
                                        <span className="text-muted">
                                            (Optionnelle)
                                        </span>
                                    </label>
                                    <div class="input-group">
                                        <input
                                            type="file"
                                            class="form-control"
                                            id="STR_UTIPIC"
                                            {...register("STR_UTIPIC")}
                                        />
                                    </div>
                                    <p className="text-danger">
                                        {errors.STR_UTIPIC?.message}
                                    </p>
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
                                    {userID
                                        ? "Modifier utilisateur"
                                        : "Créer utilisateur"}
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

export default CreateUser;
