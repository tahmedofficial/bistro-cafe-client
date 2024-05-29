import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://bistro-cafe-server.vercel.app"
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;