import { useEffect, useState } from "react";
import { doRequest, urlBaseImage } from "../services/apiService";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export async function produitsLoader() {
    let data = null;
    const params = {
        mode: "listProduct",
    };
    try {
        const response = await doRequest(params, "StockManager.php");
        data = response.data["products"];
    } catch (error) {
        console.error(error);
    }
    console.log(data);

    return { data };
}

function ListProduct() {
    const { data } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 5;
    const [filteredData, setFilteredData] = useState(data);
    const [currentData, setCurrentData] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user) {
            navigate("//sign-in");
        }
    }, [navigate]);

    let indexOfLastItem = currentPage * itemPerPage;
    let indexOfFirstItem = indexOfLastItem - itemPerPage;

    useEffect(() => {
        setCurrentData(filteredData.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage, filteredData]);

    const handleNextPage = () => {
        if (indexOfLastItem < filteredData.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (indexOfFirstItem > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleSearchData = (e) => {
        e.preventDefault();
        const form = document.getElementById("filter-form");
        const formData = new FormData(form);
        const searchTerm = formData.get("search")?.toLowerCase() || "";

        const newFilteredData = data.filter((elem) => {
            const matchesSearchTerm =
                elem.str_proname.toLowerCase().includes(searchTerm) ||
                elem.str_prodescription.toLowerCase().includes(searchTerm);

            return matchesSearchTerm;
        });

        setFilteredData(newFilteredData);
        setCurrentPage(1);
    };
    return (
        <div className="row">
            <div className="col-lg-12">
                <h2>Utilisateurs</h2>
                <div className="card" id="invoiceList">
                    <div class="card-body bg-light-subtle border border-dashed border-start-0 border-end-0">
                        <form id="filter-form">
                            <div class="row g-3">
                                <div class="col-xxl-8 col-sm-12">
                                    <div class="search-box">
                                        <input
                                            type="text"
                                            class="form-control search bg-light border-light"
                                            placeholder="Search for customer, email, country, status or something..."
                                            name="search"
                                        />
                                        <i class="ri-search-line search-icon"></i>
                                    </div>
                                </div>

                                <div class="col-xxl-1 col-sm-4">
                                    <button
                                        onClick={(e) => handleSearchData(e)}
                                        type="button"
                                        class="btn btn-primary w-100"
                                        onclick="SearchData();"
                                    >
                                        <i class="ri-equalizer-fill me-1 align-bottom"></i>{" "}
                                        Filters
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-body">
                        <div>
                            <div className="table-responsive table-card">
                                <table
                                    className="table align-middle table-nowrap"
                                    id="invoiceTable"
                                >
                                    <thead className="text-muted">
                                        <tr>
                                            <th
                                                scope="col"
                                                style={{
                                                    width: 50,
                                                }}
                                            >
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="checkAll"
                                                        defaultValue="option"
                                                    />
                                                </div>
                                            </th>
                                            <th className="text-uppercase">
                                                Nom
                                            </th>
                                            <th className="text-uppercase">
                                                Description
                                            </th>
                                            <th className="text-uppercase">
                                                Prix d'achat
                                            </th>
                                            <th className="text-uppercase">
                                                Prix de vente
                                            </th>
                                            <th className="text-uppercase">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        className="list form-check-all"
                                        id="invoice-list-data"
                                    >
                                        {currentData && currentData.length > 0
                                            ? currentData.map(
                                                  (produit, index) => {
                                                      return (
                                                          <TableRow
                                                              produit={produit}
                                                              key={index}
                                                          />
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </tbody>
                                </table>
                                <div
                                    className="noresult"
                                    style={{
                                        display: "none",
                                    }}
                                >
                                    <div className="text-center">
                                        <lord-icon
                                            src="../../../../cdn.lordicon.com/msoeawqm.json"
                                            trigger="loop"
                                            colors="primary:#25a0e2,secondary:#00bd9d"
                                            style={{
                                                width: 75,
                                                height: 75,
                                            }}
                                        ></lord-icon>
                                        <h5 className="mt-2">
                                            Sorry! No Result Found
                                        </h5>
                                        <p className="text-muted mb-0">
                                            We've searched more than 150+
                                            invoices We did not find any
                                            invoices for you search.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <div className="pagination-wrap hstack gap-2">
                                    <button
                                        onClick={handlePreviousPage}
                                        className={`page-item pagination-prev ${
                                            indexOfFirstItem - 1 < 0
                                                ? "disabled"
                                                : ""
                                        }`}
                                    >
                                        Précedent
                                    </button>
                                    <ul className="pagination listjs-pagination mb-0" />
                                    <button
                                        onClick={handleNextPage}
                                        className={`page-item pagination-next ${
                                            indexOfLastItem + 1 > data.length
                                                ? "disabled"
                                                : "bg-[#F4F7F9]"
                                        }`}
                                    >
                                        Suivant
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*end col*/}
        </div>
    );
}

function TableRow({ produit }) {
    return (
        <tr>
            <th scope="row">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="chk_child"
                        defaultValue="#VL25000365"
                    />
                </div>
            </th>
            <td className="customer_name">
                <div className="d-flex align-items-center">
                    {produit.str_propic ? (
                        <img
                            src={`${urlBaseImage}images/produits/${produit.lg_proid}/${produit.str_propic}`}
                            alt=""
                            className="avatar-xs rounded-circle me-2"
                        />
                    ) : (
                        <img
                            src="default.jpeg"
                            alt=""
                            className="avatar-xs rounded-circle me-2"
                        />
                    )}

                    {produit.ArtCode}
                </div>
            </td>
            <td className="email">{produit.ArtLib}</td>
            <td className="profil">{produit.ArtPrixBase}</td>
            <td className="id">{produit.ArtLastPA}</td>
            <td>
                <div className="dropdown">
                    <Link
                        to={`/dashboard/produits/${produit.ArtID}`}
                        className="btn btn-soft-secondary btn-sm dropdown"
                    >
                        Details
                        <i class="ri-arrow-right-line align-middle"></i>
                    </Link>
                </div>
            </td>
        </tr>
    );
}

export default ListProduct;
