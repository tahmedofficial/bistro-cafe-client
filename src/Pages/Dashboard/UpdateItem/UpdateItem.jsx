import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {

    const { name, category, recipe, price, _id } = useLoaderData();
    const { sweetAlert } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { "content-type": "multipart/form-data" }
        })
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                category: data.category,
                image: res.data.data.display_url,
                price: parseFloat(data.price)
            }

            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes.data);

            if (menuRes.data.modifiedCount > 0) {
                reset();
                sweetAlert(`${data.name} updated to the menu`)
            }
        }
    }

    return (
        <div>
            <SectionTitle heading="Update an Item" subHeading="Update info"></SectionTitle>
            <div className="lg:p-24 lg:bg-gray-100">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input {...register("name", { required: true })} type="text" defaultValue={name} className="input input-bordered w-full" />
                    </label>
                    <div className="md:flex gap-6">
                        <div className="w-full">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select defaultValue={category} className="select select-bordered w-full" {...register("category", { required: true })}>
                                <option disabled value="Default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input {...register("price", { required: true })} type="number" defaultValue={price} className="input input-bordered w-full" />
                        </label>
                    </div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe name</span>
                        </div>
                        <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" defaultValue={recipe}></textarea>
                    </label>
                    <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs mt-5" />
                    <br />
                    <button className="btn mt-5 bg-yellow-600 text-white">Update Menu <FaUtensils></FaUtensils></button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;