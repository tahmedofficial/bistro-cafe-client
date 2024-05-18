import PropTypes from 'prop-types';

const FoodCard = ({ item }) => {

    const { name, image, price, recipe } = item;

    return (
        <div>
            <div className="card bg-base-100 shadow-xl h-full">
                <figure><img src={image} alt="Shoes" /></figure>
                <h3 className='absolute right-0 m-4 px-4 bg-slate-900 text-white'>${price}</h3>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline bg-gray-200 border-b-4 mt-4">Add to Cart</button>
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