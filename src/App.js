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
import SignIn from "./MesPages/SignIn";
import ListUser, { listUserLoader } from "./MesPages/ListUser";
import CreateUser from "./MesPages/CreateUser";
import DetailsUser, { detailsUserLoader } from "./MesPages/DetailsUser";
import Commandes, { commandesLoader } from "./MesPages/Commandes";
import ProductStat from "./MesPages/ProductStat";
import ListProduct, { produitsLoader } from "./MesPages/ListProduct";
import Product, { produitLoader } from "./MesPages/Product";

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
                {
                    path: "/dashboard/liste-utilisateurs",
                    loader: listUserLoader,
                    element: <ListUser />,
                },
                {
                    path: "/dashboard/creation-utilisateur",
                    element: <CreateUser />,
                },
                {
                    path: "/dashboard/modification-utilisateur/:userID",
                    loader: detailsUserLoader,
                    element: <CreateUser />,
                },
                {
                    path: "/dashboard/utilisateur/:userID",
                    loader: detailsUserLoader,
                    element: <DetailsUser />,
                },
                {
                    path: "/dashboard/commandes",
                    loader: commandesLoader,
                    element: <Commandes/>   ,
                },
                {
                    path: "/dashboard/statistiques-produits",
                    element: <ProductStat/>   ,
                }, {
                    path: "/dashboard/produits",
                    loader: produitsLoader,
                    element: <ListProduct/>
                },

                {
                    path: "/dashboard/produits/:productID",
                    loader: produitLoader,
                    element: <Product/>
                }
            ],
            // loader: dashboardLoader,  // Loader pour Dashboard
        },
        {
            path: "/sign-in",
            element: <SignIn />,
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
