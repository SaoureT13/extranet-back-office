import { Outlet } from "react-router-dom";
import CustomAppMenu from "../Mescomposants/CustomAppMenu";
import TopBar from "../Mescomposants/TopBar";

function Dashboard() {

    return (
        <div id="layout-wrapper">
            <TopBar />
            <CustomAppMenu />

            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12">
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Dashboard;
