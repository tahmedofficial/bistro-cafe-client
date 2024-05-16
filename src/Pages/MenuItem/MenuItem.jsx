import PropTypes from 'prop-types';

const MenuItem = ({ item }) => {

    const { name, image, price, recipe } = item;

    return (
        <div className='flex space-x-4'>
            <img style={{borderRadius: "0 200px 200px 200px"}} className='w-20' src={image} alt="" />
            <div>
                <h3 className='uppercase'>{name}---------</h3>
                <h4>{recipe}</h4>
            </div>
            <h3 className='text-yellow-500'>${price}</h3>
        </div>
    );
};

export default MenuItem;

MenuItem.propTypes = {
    item: PropTypes.object
}