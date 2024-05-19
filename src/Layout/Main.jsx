import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { HelmetProvider } from "react-helmet-async";

const Main = () => {

    const location = useLocation();
    const isLogin = location.pathname.includes("/login") || location.pathname.includes("/signUp")

    return (
        <div className="max-w-screen-xl mx-auto">
            <HelmetProvider>
                {isLogin ? undefined : <Navbar></Navbar>}
                <Outlet></Outlet>
                {isLogin ? undefined : <Footer></Footer>}
            </HelmetProvider>
        </div>
    );
};

export default Main;