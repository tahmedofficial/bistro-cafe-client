import PropTypes from 'prop-types';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';

const FoodCard = ({ item }) => {

    const { name, image, price, recipe, _id } = item;
    const { user, sweetAlert } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {

        if (user && user.email) {
            const cartItem = {
                menuId: _id,
                email: user?.email,
                name,
                image,
                price
            }

            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        console.log(res.data);
                        sweetAlert(`${name}Added to cart`);
                        refetch();
                    }
                })

        }
        else {
            Swal.fire({
                title: "You are not login",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    }

    return (
        <div>
            <div className="card bg-base-100 shadow-xl h-full">
                <figure><img src={image} alt="Shoes" /></figure>
                <h3 className='absolute right-0 m-4 px-4 bg-slate-900 text-white'>${price}</h3>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button onClick={handleAddToCart} className="btn btn-outline bg-gray-200 border-b-4 mt-4">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;

FoodCard.propTypes = {
    item: PropTypes.object
}