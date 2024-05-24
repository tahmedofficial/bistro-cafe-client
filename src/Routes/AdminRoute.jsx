import PropTypes from "prop-types";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const [isAdmin, isPending] = useAdmin();
    const location = useLocation();


    if (loading || isPending) {
        return <p>Loading....</p>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;

AdminRoute.propTypes = {
    children: PropTypes.node
}