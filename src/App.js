import "./App.css";
import React from "react";
import {
    BrowserRouter as Router,
    createBrowserRouter,
    Routes,
    Route,
    useLocation,
    RouterProvider,
} from "react-router-dom";
import Accueil from "./MesPages/Accueil";
import Form from "./MesPages/Form";
import LoadExternalScripts from "./Mescomposants/LoadExternalScripts";
import Dashboard from "./MesPages/dashboard";
import DetailsDemande, {
    detailsDemandeLoader,
} from "./MesPages/DetailsDemande";
import Demandes, { demandesLoader } from "./MesPages/Demandes";

// import About from './pages/Accueil/About';

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Accueil />,
            // loader: accueilLoader,  // Ajout d'un loader
        },
        {
            path: "/form",
            element: <Form />,
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
            children: [
                {
                    path: "/dashboard/demandes-clients",
                    loader: demandesLoader,
                    element: <Demandes />,
                },
                {
                    path: "/dashboard/demandes-clients/:clientID",
                    loader: detailsDemandeLoader,
                    element: <DetailsDemande />,
                },
            ],
            // loader: dashboardLoader,  // Loader pour Dashboard
        },
    ],
    {
        basename: "/extranetBackoffice",
    }
);

function App() {
    return (
        <div>
            <RouterProvider router={router} />
            <LoadExternalScripts />
        </div>
    );
}

export default App;
