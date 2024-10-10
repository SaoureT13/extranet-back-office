import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { doRequest, urlBaseImage, urlBaseImage2 } from "../services/apiService";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";

export async function produitLoader({ params }) {
    let data = null;
    const paramsRequest = {
        mode: "getProduct",
        LG_PROID: params.productID,
    };
    try {
        const response = await doRequest(paramsRequest, "StockManager.php");
        data = response.data["products"][0];
    } catch (error) {
        console.error(error);
    }

    return { data };
}

function Product() {
    const { data } = useLoaderData();
    const { productID } = useParams();
    const [mainImage, setMainImage] = useState(null);
    const [thumbnails, setThumbnails] = useState([]);
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
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
        // Vérifier l'image principale
        const mainImage = new Image();
        mainImage.src = `${urlBaseImage}/images/produits/${data.ArtID}/${data.str_propic}`;
        mainImage.onload = () => setMainImageValid(true);
        mainImage.onerror = () => setMainImageValid(false);

        // Vérifier les images de la galerie
        const validImages = [];
        data.gallerie.forEach((image) => {
            const img = new Image();
            img.src = `${urlBaseImage}/images/produits/${
                data.ArtID
            }/${image.src.trim()}`;
            img.onload = () => validImages.push(image.src.trim());
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
            setErrorMessage(""); // Efface l'erreur si le type est valide
            setMainImage(file);

            // Prévisualisation de l'image principale
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setErrorMessage(
                "L'image principale doit être un fichier valide (jpeg, png, gif, webp)"
            );
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
                setErrorMessage(
                    `La miniature ${files[i].name} doit être un fichier valide (jpeg, png, gif, webp)`
                );
                valid = false;
                break;
            }
        }

        if (valid) {
            setErrorMessage("");
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

        if (!mainImage) {
            setErrorMessage("L'image principale est requise.");
            return;
        }

        if (thumbnails.length === 0) {
            setErrorMessage("Veuillez sélectionner au moins une miniature.");
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
        } catch (error) {
            handleSetShowError();
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
                                {/*end row*/}
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
                                    {isMainImageValid && (
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
                                            <div>
                                                <h1>Image secondaire</h1>
                                                {data.gallerie.length > 0 &&
                                                    data.gallerie.map(
                                                        (image, index) => (
                                                            <img
                                                                key={index}
                                                                src={`${urlBaseImage2}${image.src}`}
                                                                alt=""
                                                                style={{
                                                                    width: "200px",
                                                                    height: "200px",
                                                                    margin: "5px",
                                                                    objectFit:
                                                                        "contain",
                                                                }}
                                                            />
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    )}
                                    {isMainImageValid == false &&
                                        isMainImageValid == false && (
                                            <>
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
                                                                Prévisualisation
                                                                de l'image
                                                                principale :
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
                                                </div>
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
                                                </div>
                                                {errorMessage && (
                                                    <p style={{ color: "red" }}>
                                                        {errorMessage}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                </div>

                                {/*end row*/}
                                {isMainImageValid == false &&
                                    isMainImageValid == false && (
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
                                                Uploader les images
                                            </button>
                                        </div>
                                    )}
                            </div>
                        </form>
                    </div>
                </div>
                {/*end col*/}
            </div>
            {/* <div className="row justify-content-center">
                <div className="col-xxl-9">
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <h2 className="p-2">
                                Ajouté des produits de substitution
                            </h2>
                            <div className="col-lg-6 p-2">
                                <h4 className="">Produits</h4>
                                <select
                                    className="form-select"
                                    size={3}
                                    aria-label="size 3 select example"
                                >
                                    <option selected="">
                                        Open this select menu (select menu size)
                                    </option>
                                    {productSelectData != null &&
                                        productSelectData?.map(
                                            (product, index) => (
                                                <option
                                                    key={index}
                                                    value={product.lg_proid}
                                                >
                                                    {product.str_proname}
                                                </option>
                                            )
                                        )}
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div> */}
        </>
    );
}

function verifyImagePath(path) {
    return new Promise((resolve) => {
        const img = new Image();

        // Lorsque l'image se charge avec succès
        img.onload = () => {
            resolve(path); // Retourne le chemin de l'image
        };

        // Si l'image ne peut pas être chargée (chemin invalide ou fichier non image)
        img.onerror = () => {
            resolve(null); // Retourne null si ce n'est pas une image
        };

        img.src = path; // Définit la source de l'image
    });
}

export default Product;
