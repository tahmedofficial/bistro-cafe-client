import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MenuItem from "../MenuItem/MenuItem";

const PopularMenu = () => {

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch("menu.json")
            .then(res => res.json())
            .then(data => {
                const popularItem = data.filter(item => item.category === "popular");
                setMenu(popularItem);
            })
    }, [])

    return (
        <div className="mb-12">
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items"
            ></SectionTitle>

            <div className="grid md:grid-cols-2 gap-4">
                {
                    menu.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="text-center">
            <button className="btn btn-outline border-b-4 text-black mt-4">View full Menu</button>
            </div>
        </div>
    );
};

export default PopularMenu;