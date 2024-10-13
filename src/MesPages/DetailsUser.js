import React, { useEffect } from "react";
import { doRequest } from "../services/apiService";
import { useLoaderData, Link, useNavigate } from "react-router-dom";

export const detailsUserLoader = async ({ params }) => {
    let data = null;
    const requestParams = {
        mode: "getUtilisateur",
        STR_UTITOKEN: "dfgfgsd",
        LG_UTIID: params.userID,
    };
    try {
        const response = await doRequest(requestParams);
        data = response.data;
    } catch (error) {
        console.error(error);
    }
    return { data };
};

function DetailsUser() {
    const { data } = useLoaderData();
    const navigate = useNavigate();


    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user) {
            navigate("//sign-in");
        }
    }, [navigate]);

    const profile = {
        "13121316382501833409": "Designer",
        "13121523295256267666": "Gérant",
        2: "Admin",
    };

    return (
        <div className="row justify-content-center">
            <div className="col-xxl-9">
                <div className="card" id="demo">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-header border-bottom-dashed p-4">
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <img
                                            src="assets/images/logo-dark.png"
                                            className="card-logo card-logo-dark"
                                            alt="logo dark"
                                            height={17}
                                        />
                                        <img
                                            src="assets/images/logo-light.png"
                                            className="card-logo card-logo-light"
                                            alt="logo light"
                                            height={17}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/*end card-header*/}
                        </div>
                        <div className="col-lg-12">
                            <div className="card-body p-4">
                                <div class="row g-3">
                                    <div class="col-sm-6">
                                        <p
                                            for="firstName"
                                            class="inline-block mb-2 fw-medium"
                                        >
                                            Nom et prénoms
                                        </p>
                                        <p class="text-muted">
                                            {data?.str_utifirstlastname}
                                        </p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p
                                            for="lastName"
                                            class="inline-block mb-2 fw-medium"
                                        >
                                            Adresse email
                                        </p>
                                        <p class="text-muted">
                                            {data?.str_utimail}
                                        </p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p
                                            for="lastName"
                                            class="inline-block mb-2 fw-medium"
                                        >
                                            Nom utilisateur
                                        </p>
                                        <p class="text-muted">
                                            {data?.str_utilogin}
                                        </p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p
                                            for="username"
                                            class="inline-block mb-2 fw-medium"
                                        >
                                            Contact
                                        </p>
                                        <p class="text-muted">
                                            {data?.str_utiphone}
                                        </p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p
                                            for="email"
                                            class="inline-block mb-2 fw-medium"
                                        >
                                            Username{" "}
                                        </p>
                                        <p class="text-muted">
                                            {data?.str_utifirstlastname}
                                        </p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p
                                            for="email"
                                            class="inline-block mb-2 fw-medium"
                                        >
                                            Profil{" "}
                                        </p>
                                        <p class="text-muted">
                                            {profile[data?.lg_proid]}
                                        </p>
                                    </div>
                                </div>
                                <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                    <Link
                                        to={`/dashboard/modification-utilisateur/${data?.lg_utiid}`}
                                        className="btn btn-primary"
                                    >
                                        Modifier
                                    </Link>
                                </div>
                            </div>
                            {/*end card-body*/}
                        </div>
                        {/*end col*/}
                    </div>
                    {/*end row*/}
                </div>
                {/*end card*/}
            </div>
            {/*end col*/}
        </div>
    );
}

export default DetailsUser;
