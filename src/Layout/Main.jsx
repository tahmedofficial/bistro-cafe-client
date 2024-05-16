import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { HelmetProvider } from "react-helmet-async";

const Main = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <HelmetProvider>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </HelmetProvider>
        </div>
    );
};

export default Main;