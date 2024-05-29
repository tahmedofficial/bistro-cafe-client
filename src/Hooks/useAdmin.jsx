import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        // enabled: !loading,
        queryFn: async () => {
            if (loading) {
                if (!loading) {
                    console.log("asking or cheaking is admin", user);
                    const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                    return res.data?.admin;
                }
            }
        }
    })
    return [isAdmin, isPending]
};

export default useAdmin;