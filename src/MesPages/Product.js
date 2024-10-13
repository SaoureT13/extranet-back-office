import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { doRequest, urlBaseImage, urlBaseImage2 } from "../services/apiService";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import axios from "axios";
import Select from "react-select";

export async function produitLoader({ params }) {
    let data = null;
    let data2 = null;

    const formData1 = new FormData();
    formData1.append("mode", "getProduct");
    formData1.append("LG_PROID", params.productID);

    const formData2 = new FormData();
    formData2.append("mode", "listProduct");

    try {
        const [response1, response2] = await Promise.all([
            axios.post(
                "http://localhost/extranetbackend/backoffice/webservices/StockManager.php",
                formData1
            ),
            axios.post(
                "http://localhost/extranetbackend/backoffice/webservices/StockManager.php",
                formData2
            ),
        ]);
        data = response1.data["products"][0];
        data2 = response2.data["products"];
    } catch (error) {
        console.error(error);
    }

    return { data, data2 };
}

function Product() {
    const { data, data2 } = useLoaderData();
    const { productID } = useParams();
    const [mainImage, setMainImage] = useState(null);
    const [thumbnails, setThumbnails] = useState([]);
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
    const [errorMessage, setErrorMessage] = useState({
        mainImage: "",
        thumbnails: "",
        substitutionProducts: "",
    });
    const [options, setOptions] = useState([]);
    const [productSelectData, setProductSelectData] = useState("");
    const [isMainImageValid, setMainImageValid] = useState(false);
    const [validGallery, setValidGallery] = useState([]);
    let currentUser = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const acceptedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
    ];
    const [show, setShow] = useState({
        showError: false,
        showSuccess: false,
    });

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user) {
            navigate("//sign-in");
        }
    }, [navigate]);
    

    const handleProductSelectChange = (selected) => {
        setProductSelectData(selected);
    };

    console.log(productSelectData);

    useEffect(() => {
        if (data2 != null) {
            const opt = data2.map((product) => {
                return {
                    value: product.ArtID,
                    label: product.ArtLib,
                };
            });

            setOptions(opt);
        }
    }, [data2]);

    useEffect(() => {
        // Vérifier l'image principale
        const mainImage = new Image();
        mainImage.src = `${urlBaseImage}/images/produits/${data.ArtID}/${data.str_propic}`;
        mainImage.onload = () => setMainImageValid(true);
        mainImage.onerror = () => setMainImageValid(false);

        // Vérifier les images de la galerie
        const validImages = [];
        data.gallerie.forEach((image) => {
            const img = new Image();
            img.src = `http://localhost/${image.src.trim()}`;
            img.onload = () =>
                validImages.push({
                    src: image.src.trim(),
                    lg_docid: image.lg_docid,
                });
            img.onerror = () => {};
        });

        // Mettre à jour la galerie valide après un délai
        setTimeout(() => {
            setValidGallery(validImages);
        }, 1000); // Ajuste le délai selon tes besoins
    }, [data, urlBaseImage]);

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

    const handleMainImageChange = (event) => {
        const file = event.target.files[0];
        if (file && acceptedImageTypes.includes(file.type)) {
            setErrorMessage((prevState) => ({
                ...prevState,
                mainImage: "",
            })); // Efface l'erreur si le type est valide
            setMainImage(file);

            // Prévisualisation de l'image principale
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setErrorMessage((prevState) => ({
                ...prevState,
                mainImage:
                    "L'image principale doit être un fichier valide (jpeg, png, gif, webp)",
            }));
            setMainImage(null);
            setMainImagePreview(null);
        }
    };

    const handleThumbnailsChange = (event) => {
        const files = event.target.files;
        const previews = [];
        let valid = true;

        // Validation des types d'image pour chaque miniature
        for (let i = 0; i < files.length; i++) {
            if (!acceptedImageTypes.includes(files[i].type)) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    thumbnails: `La miniature ${files[i].name} doit être un fichier valide (jpeg, png, gif, webp)`,
                }));
                valid = false;
                break;
            }
        }

        if (valid) {
            setErrorMessage((prevState) => ({
                ...prevState,
                thumbnails: "",
            }));
            setThumbnails(files);

            // Prévisualisation des miniatures
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    previews.push(reader.result);
                    setThumbnailPreviews([...previews]);
                };
                reader.readAsDataURL(files[i]);
            }
        } else {
            setThumbnails([]);
            setThumbnailPreviews([]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = {};

        if (!mainImage && !isMainImageValid) {
            errors.mainImage = "L'image principale est requise.";
        }

        if (thumbnails.length === 0 && validGallery.length === 0) {
            errors.thumbnails = "Veuillez sélectionner au moins une miniature.";
        }

        // if (productSelectData.length === 0) {
        //     errors.substitutionProducts =
        //         "Veuillez sélectionner au moins un produit de substitution.";
        // }

        if (Object.keys(errors).length > 0) {
            setErrorMessage(errors);
            console.log("errors", errors);
            return;
        }

        const formData = new FormData();

        // Ajouter l'image principale
        if (mainImage) {
            formData.append("images[main]", mainImage); // Ajoute l'image principale
        }

        // Ajouter les miniatures
        if (thumbnails.length > 0) {
            for (let i = 0; i < thumbnails.length; i++) {
                formData.append(`images[thumbnail][]`, thumbnails[i]); // Ajoute chaque miniature dans un tableau
            }
        }

        formData.append("mode", "uploadProductPicture");
        formData.append("LG_PROID", productID);
        formData.append("STR_UTITOKEN", currentUser.STR_UTITOKEN);
        if (productSelectData.length > 0) {
            let SUBSTITUTION_PRODUCTS = "";
            for (let i = 0; i < productSelectData.length; i++) {
                SUBSTITUTION_PRODUCTS += productSelectData[i].value;
                if (i < productSelectData.length - 1) {
                    SUBSTITUTION_PRODUCTS += ",";
                }
            }
            formData.append("SUBSTITUTION_PRODUCTS", SUBSTITUTION_PRODUCTS);
        }

        try {
            const response = await fetch(
                "http://localhost/extranetbackend/backoffice/webservices/ConfigurationManager.php",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();
            console.log("Success:", result);
            handleSetShowSuccess();
            navigate(".", { replace: true });
            setThumbnails([]);
            setMainImage(null);
            setThumbnailPreviews([]);
            setMainImagePreview(null);
            setProductSelectData([]);
        } catch (error) {
            handleSetShowError();
            console.error("Error:", error);
        }
    };

    const handleRemoveProduitSubstitution = async (LG_PROSUBID) => {
        const params = {
            mode: "deleteProduitSubstitution",
            LG_PROSUBID: LG_PROSUBID,
        };
        try {
            const response = await doRequest(
                params,
                "ConfigurationManager.php"
            );
            const data = response.data["code_statut"];
            if (data == "1") {
                navigate(".", { replace: true });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleRemoveThumbails = async (LG_DOCID) => {
        const params = {
            mode: "deleteProductImage",
            LG_DOCID: LG_DOCID,
        };

        try {
            const response = await doRequest(
                params,
                "ConfigurationManager.php"
            );
            const data = response.data["code_statut"];
            if (data == "1") {
                navigate(".", { replace: true });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-xxl-9">
                    <div className="card">
                        <form onSubmit={handleSubmit}>
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
                                                Erreur lors de l'enregistrement
                                                des photos{" "}
                                            </strong>{" "}
                                            Contactez votre admistrateur
                                        </div>
                                    )}

                                    {show.showSuccess && (
                                        <div
                                            class="alert alert-success"
                                            role="alert"
                                        >
                                            <strong>
                                                {" "}
                                                Opération réussi !!
                                            </strong>
                                        </div>
                                    )}
                                </div>

                                <div className="card-body p-4">
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <label
                                                htmlFor="str_proname"
                                                className="form-label"
                                            >
                                                Nom du produit
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="str_proname"
                                                disabled
                                                defaultValue={data.ArtLib}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <label
                                                htmlFor="str_prodescription"
                                                className="form-label"
                                            >
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="str_prodescription"
                                                defaultValue={data.ArtLib}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label
                                                htmlFor="int_propriceachat"
                                                className="form-label"
                                            >
                                                Prix d'achat{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="int_propriceachat"
                                                defaultValue={`${data.ArtPrixBase} FCFA`}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label
                                                htmlFor="int_propricevente"
                                                className="form-label"
                                            >
                                                Prix de vente{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="int_propricevente"
                                                defaultValue={`${data.ArtPrixBase} FCFA`}
                                                disabled
                                            />
                                        </div>
                                        {data.substitutionList && (
                                            <div className="col-md-12">
                                                <label
                                                    htmlFor="int_propricevente"
                                                    className="form-label"
                                                >
                                                    Produits de subsitution{" "}
                                                </label>
                                                <div>
                                                    {data.substitutionList.map(
                                                        (
                                                            substitution,
                                                            index
                                                        ) => (
                                                            <span
                                                                key={index}
                                                                className="badge bg-primary m-1 p-2"
                                                            >
                                                                {
                                                                    substitution.ArtLib
                                                                }
                                                                <span
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        marginLeft:
                                                                            "10px",
                                                                    }}
                                                                    onClick={() =>
                                                                        handleRemoveProduitSubstitution(
                                                                            substitution.lg_prosubid
                                                                        )
                                                                    }
                                                                >
                                                                    &times;
                                                                </span>
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {isMainImageValid ? (
                                            <div>
                                                <div>
                                                    <h1>Image principale</h1>
                                                    <img
                                                        src={`${urlBaseImage}/images/produits/${data.ArtID}/${data.str_propic}`}
                                                        alt=""
                                                        style={{
                                                            width: "200px",
                                                            height: "200px",
                                                            margin: "5px",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div class="col-12">
                                                <label
                                                    htmlFor="mainImage"
                                                    className="form-label"
                                                >
                                                    Photo de principale
                                                    <span className="text-muted">
                                                        (Optionnelle)
                                                    </span>
                                                </label>
                                                <div class="input-group">
                                                    <input
                                                        type="file"
                                                        class="form-control"
                                                        id="mainImage"
                                                        accept="image/*"
                                                        onChange={
                                                            handleMainImageChange
                                                        }
                                                    />
                                                </div>
                                                {mainImagePreview && (
                                                    <div>
                                                        <h4>
                                                            Prévisualisation de
                                                            l'image principale :
                                                        </h4>
                                                        <img
                                                            src={
                                                                mainImagePreview
                                                            }
                                                            alt="Preview principale"
                                                            style={{
                                                                width: "200px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                {errorMessage.mainImage && (
                                                    <p
                                                        style={{
                                                            color: "red",
                                                        }}
                                                        className="m-0 p-0"
                                                    >
                                                        {errorMessage.mainImage}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        {validGallery.length > 0 ? (
                                            <div>
                                                <h1>Image secondaire</h1>
                                                {validGallery.map(
                                                    (image, index) => (
                                                        <div
                                                            style={{
                                                                display:
                                                                    "inline-block",
                                                                position:
                                                                    "relative",
                                                                width: "200px",
                                                                height: "200px",
                                                                margin: "5px",
                                                            }}
                                                        >
                                                            <img
                                                                key={index}
                                                                src={`http://localhost/${image.src}`}
                                                                alt=""
                                                                style={{
                                                                    width: "200px",
                                                                    height: "200px",
                                                                    objectFit:
                                                                        "contain",
                                                                }}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRemoveThumbails(
                                                                        image.lg_docid
                                                                    )
                                                                }
                                                                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
                                                            >
                                                                {" "}
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    width="24px"
                                                                    height="24px"
                                                                >
                                                                    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                                                                </svg>{" "}
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                                <div class="col-12">
                                                    <label
                                                        htmlFor="thumbnail"
                                                        className="form-label d-none"
                                                    >
                                                        Photo secondaires
                                                        <span className="text-muted">
                                                            (Optionnelle)
                                                        </span>
                                                    </label>
                                                    <div class="input-group mt-1">
                                                        <input
                                                            type="file"
                                                            class="form-control"
                                                            id="thumbnail"
                                                            accept="image/*"
                                                            multiple
                                                            onChange={
                                                                handleThumbnailsChange
                                                            }
                                                        />
                                                    </div>
                                                    {thumbnailPreviews.length >
                                                        0 && (
                                                        <div>
                                                            <h4>
                                                                Prévisualisation
                                                                des miniatures :
                                                            </h4>
                                                            {thumbnailPreviews.map(
                                                                (
                                                                    thumbnail,
                                                                    index
                                                                ) => (
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={
                                                                            thumbnail
                                                                        }
                                                                        alt={`Preview ${index}`}
                                                                        style={{
                                                                            width: "100px",
                                                                            margin: "5px",
                                                                        }}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                    {errorMessage.thumbnails && (
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                            className="m-0 p-0"
                                                        >
                                                            {
                                                                errorMessage.thumbnails
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div class="col-12">
                                                <label
                                                    htmlFor="thumbnail"
                                                    className="form-label"
                                                >
                                                    Photo secondaires
                                                    <span className="text-muted">
                                                        (Optionnelle)
                                                    </span>
                                                </label>
                                                <div class="input-group">
                                                    <input
                                                        type="file"
                                                        class="form-control"
                                                        id="thumbnail"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={
                                                            handleThumbnailsChange
                                                        }
                                                    />
                                                </div>
                                                {thumbnailPreviews.length >
                                                    0 && (
                                                    <div>
                                                        <h4>
                                                            Prévisualisation des
                                                            miniatures :
                                                        </h4>
                                                        {thumbnailPreviews.map(
                                                            (
                                                                thumbnail,
                                                                index
                                                            ) => (
                                                                <img
                                                                    key={index}
                                                                    src={
                                                                        thumbnail
                                                                    }
                                                                    alt={`Preview ${index}`}
                                                                    style={{
                                                                        width: "100px",
                                                                        margin: "5px",
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                                {errorMessage.thumbnails && (
                                                    <p
                                                        style={{
                                                            color: "red",
                                                        }}
                                                        className="m-0 p-0"
                                                    >
                                                        {
                                                            errorMessage.thumbnails
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        <div className="col-md-12 p-2">
                                            <label
                                                className=""
                                                htmlFor="substitution-products"
                                            >
                                                Choisir des produits de
                                                subsititution:
                                            </label>
                                            {data2 != null && (
                                                <Select
                                                    isMulti
                                                    name="colors"
                                                    options={options}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={
                                                        handleProductSelectChange
                                                    }
                                                    value={productSelectData}
                                                />
                                            )}

                                            {/* <select
                                                id="substitution-products"
                                                className="form-select"
                                                size={4}
                                                aria-label="size 3 select example"
                                                multiple={true}
                                                onChange={
                                                    handleProductSelectChange
                                                }
                                            >
                                                {data2 != null &&
                                                    data2?.map(
                                                        (product, index) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    product.ArtID
                                                                }
                                                            >
                                                                {product.ArtLib}
                                                            </option>
                                                        )
                                                    )}
                                            </select> */}
                                            {errorMessage.substitutionProducts && (
                                                <p
                                                    style={{
                                                        color: "red",
                                                    }}
                                                    className="m-0 p-0"
                                                >
                                                    {
                                                        errorMessage.substitutionProducts
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {isMainImageValid === false ||
                                    validGallery.length < 0 ? (
                                        <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                            <Link
                                                type="reset"
                                                to="/dashboard/produits"
                                                className="btn btn-primary"
                                            >
                                                Annuler
                                            </Link>
                                            <button
                                                type="submit"
                                                className="btn btn-danger"
                                            >
                                                <i className="ri-send-plane-fill align-bottom me-1" />{" "}
                                                Envoyer
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                            <Link
                                                type="reset"
                                                to="/dashboard/produits"
                                                className="btn btn-primary"
                                            >
                                                Annuler
                                            </Link>
                                            {mainImage ||
                                            thumbnails.length > 0 ||
                                            productSelectData.length > 0 ? (
                                                <button
                                                    type="submit"
                                                    className="btn btn-danger"
                                                >
                                                    <i className="ri-send-plane-fill align-bottom me-1" />{" "}
                                                    Mettre à jour
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="btn btn-danger"
                                                    disabled
                                                >
                                                    <i className="ri-send-plane-fill align-bottom me-1" />{" "}
                                                    Mettre à jour
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/*end col*/}
            </div>
        </>
    );
}

export default Product;
