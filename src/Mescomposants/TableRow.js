import React from 'react'
import { Link } from "react-router-dom";
import { urlBaseImage } from '../services/apiService';


function TableRow({ demande }) {
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
                    { demande.str_soclogo ? 
                        <img
                        src={`${urlBaseImage}images/logos/${demande.lg_socid}/${demande.str_soclogo}`}
                        alt=""
                        className="avatar-xs rounded-circle me-2"
                    />:<img
                        src="default.jpeg"
                        alt=""
                        className="avatar-xs rounded-circle me-2"/>
                    }
                    {demande.str_socname}
                </div>
            </td>
            <td className="email">{demande.str_socmail}</td>
            <td className="date">
                {demande.dt_soccreated.split(" ")[0]}{" "}
                <small className="text-muted">
                    {demande.dt_soccreated.split(" ")[1]}
                </small>
            </td>
            <td className="status">
                <span
                    className={`badge text-uppercase ${
                        demande.str_socstatut === "process"
                            ? "bg-warning-subtle text-warning"
                            : demande.str_socstatut === "enable"
                            ? "bg-success-subtle text-success"
                            : "bg-danger-subtle text-danger"
                    }`}
                >
                    {demande.str_socstatut}
                </span>
            </td>
            <td>
                <div className="dropdown">
                    <Link
                        to={`/dashboard/demandes-clients/${demande.lg_socid}`}
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
export default TableRow