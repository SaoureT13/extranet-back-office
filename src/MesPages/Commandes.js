import { Link, useLoaderData } from "react-router-dom";
import { doRequest } from "../services/apiService";
import { Fragment } from "react";

export async function commandesLoader() {
    let data = null;
    const params = {
        mode: "listeCommande",
    };
    try {
        const response = await doRequest(params, "CommandeManager.php");
        data = response.data["data"];
        console.log(response.data["data"]);
    } catch (error) {
        console.error(error);
    }

    return { data };
}

function Commandes() {
    const { data } = useLoaderData();
    const renderRows = (clientData) => {
        const orders = Object.entries(clientData).filter(
            ([key]) => key !== "clientEncours"
        );
        const rowSpan = orders.length;

        return orders.map(([key, order], index) => (
            <tr key={key}>
                <td>{order.lg_commid}</td>
                <td>{order.dbl_commmtht ? order.dbl_commmtht : "N/A" }</td>
                <td>{order.dbl_commmtttc ? order.dbl_commmtttc : "N/A"}</td>
                <td>{order.dt_commupdated ? order.dt_commupdated : "N/A"}</td>
                {index === 0 && (
                    <td rowSpan={rowSpan}>{clientData.clientEncours}</td>
                )}
            </tr>
        ));
    };
    return (
        <div className="row">
            <div className="col-lg-12">
                <h2>Commandes</h2>
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
                                <div class="col-xxl-3 col-sm-4">
                                    <div class="input-light">
                                        <select
                                            class="form-control"
                                            name="choices-single-default"
                                            id="idStatus"
                                        >
                                            <option value="">Status</option>
                                            <option value="all" selected="">
                                                All
                                            </option>
                                            <option value="process">
                                                Process
                                            </option>
                                            <option value="validated">
                                                Validated
                                            </option>
                                            <option value="canceled">
                                                Canceled
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-xxl-1 col-sm-4">
                                    <button
                                        // onClick={(e) => handleSearchData(e)}
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
                                            <th className="text-uppercase">
                                                Nom client
                                            </th>
                                            <th className="text-uppercase">
                                                Numero commande
                                            </th>
                                            <th className="text-uppercase">
                                                Montant TTC
                                            </th>
                                            <th className="text-uppercase">
                                                Montant Hors Taxe
                                            </th>
                                            <th className="text-uppercase">
                                                Date de commande
                                            </th>
                                            <th className="text-uppercase">
                                                Encours client
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        className="list form-check-all"
                                        id="invoice-list-data"
                                    >
                                        {data.map((clientData, index) => (
                                            <tr key={index}>
                                                <td>{clientData.str_socname}</td>
                                                <td>{clientData.str_commname}</td>
                                                <td>{clientData.dbl_commmtht}</td>
                                                <td>{clientData.dbl_commmtttc}</td>
                                                <td>{clientData.dt_commcreated}</td>
                                                <td>{clientData.clientEncours ? clientData.clientEncours : "N/A"}</td>
                                            </tr>
                                        ))}
                                        {/* {Object.entries(data).map(
                                            ([clientName, clientData]) => (
                                                <>
                                                    {renderRows(clientData).map(
                                                        (row, index) => (
                                                            <Fragment
                                                                key={index}
                                                            >
                                                                {index ===
                                                                    0 && (
                                                                    <tr>
                                                                        <td
                                                                            rowSpan={
                                                                                renderRows(
                                                                                    clientData
                                                                                )
                                                                                    .length
                                                                            }
                                                                        >
                                                                            {
                                                                                clientName
                                                                            }
                                                                        </td>{" "}
                                                                        {
                                                                            row
                                                                                .props
                                                                                .children
                                                                        }
                                                                    </tr>
                                                                )}
                                                                {index !==
                                                                    0 && (
                                                                    <tr>
                                                                        {
                                                                            row
                                                                                .props
                                                                                .children
                                                                        }
                                                                    </tr>
                                                                )}
                                                            </Fragment>
                                                        )
                                                    )}
                                                </>
                                            )
                                        )} */}
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
                            {/* <div className="d-flex justify-content-end mt-3">
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/*end col*/}
        </div>
    );
}

export default Commandes;
