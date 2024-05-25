import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const AllUsers = () => {

    const { sweetAlert } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    sweetAlert(`${user.name} is admin now`);
                    refetch();
                }
            })
    }

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            sweetAlert("Delete succesfully");
                            refetch();
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h3 className="text-3xl">All Users</h3>
                <h3 className="text-3xl">Total Users {users.length}</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-amber-400">
                            <th>Index</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id} className="hover">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === "admin" ? "admin" : <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm text-xl text-white bg-amber-400">
                                            <FaUsers></FaUsers>
                                        </button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-sm text-white bg-red-600">
                                        <FaTrash></FaTrash>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;