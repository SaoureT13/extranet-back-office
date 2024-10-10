import { useEffect, useState } from "react";
import { doRequest, urlBaseImage } from "../services/apiService";
import {
    Link,
    useLoaderData,
    useLocation,
    useNavigate,
} from "react-router-dom";
import TableRow from "../Mescomposants/TableRow";

export async function demandesLoader({ request }) {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    let data = null;
    const params = {
        mode: "getClientDemandes",
        STR_UTITOKEN: "dfgfgsd",
        STR_SOCSTATUT: lastPart === "toutes" ? "process" : "enable",
    };
    try {
        const response = await doRequest(params);
        data = response.data["demandes"];
    } catch (error) {
        console.error(error);
    }

    return { data };
}
function Demandes() {
    const { data } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 5;
    const [filteredData, setFilteredData] = useState(data ?? []);
    const [currentData, setCurrentData] = useState([]);
    let indexOfLastItem = currentPage * itemPerPage;
    let indexOfFirstItem = indexOfLastItem - itemPerPage;
    const url = useLocation();
    const pathParts = url.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];

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
        const statusFilter =
            formData.get("choices-single-default")?.toLowerCase() || "";

        const newFilteredData = data.filter((elem) => {
            const matchesSearchTerm =
                elem.str_socname.toLowerCase().includes(searchTerm) ||
                elem.str_socmail.toLowerCase().includes(searchTerm) ||
                elem.str_socstatut.toLowerCase().includes(searchTerm);

            const matchesStatusFilter =
                statusFilter === "all" ||
                elem.str_socstatut.toLowerCase().includes(statusFilter);

            return matchesSearchTerm && matchesStatusFilter;
        });

        setFilteredData(newFilteredData);
        setCurrentPage(1);
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <h2>
                    Demandes de creation de compte{" "}
                    {lastPart === "toutes" ? "" : "approuvées"}
                </h2>
                <div className="card" id="invoiceList">
                    <div class="card-body bg-light-subtle border border-dashed border-start-0 border-end-0">
                        <form id="filter-form">
                            <div class="row g-3">
                                <div class="col-xxl-8 col-sm-8">
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
                                <div class=" col-sm-4">
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
                                                Libéllé société
                                            </th>
                                            <th className="text-uppercase">
                                                Adresse email
                                            </th>
                                            <th className="text-uppercase">
                                                Date de demande
                                            </th>
                                            <th className="text-uppercase">
                                                Statut de demande
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
                                        {currentData &&
                                        currentData.length > 0 ? (
                                            currentData.map(
                                                (demande, index) => {
                                                    return (
                                                        <TableRow
                                                            demande={demande}
                                                            key={index}
                                                        />
                                                    );
                                                }
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="text-center"
                                                >
                                                    Aucune demande...
                                                </td>
                                            </tr>
                                        )}
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
                                {data && (
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
                                        <button
                                            onClick={handleNextPage}
                                            className={`page-item pagination-next ${
                                                indexOfLastItem + 1 >
                                                data.length
                                                    ? "disabled"
                                                    : "bg-[#F4F7F9]"
                                            }`}
                                        >
                                            Suivant
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*end col*/}
        </div>
    );
}

export default Demandes;
