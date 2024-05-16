import PropTypes from "prop-types";
import MenuItem from "../MenuItem/MenuItem";
import Cover from "../Shared/Cover/Cover";

const MenueCategory = ({ items, title, img }) => {
    return (
        <div className="pt-8">
            {title ? <Cover img={img} title={title}></Cover> : undefined}
            <div className="grid md:grid-cols-2 gap-4 mt-16">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
        </div>
    );
};

export default MenueCategory;

MenueCategory.propTypes = {
    items: PropTypes.array,
    title: PropTypes.string,
    img: PropTypes.node
}