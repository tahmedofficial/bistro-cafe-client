import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import menuImg from "../../assets/menu/banner3.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import useMenu from "../../Hooks/useMenu";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MenueCategory from "./MenueCategory";


const Menu = () => {

    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === "dessert");
    const soup = menu.filter(item => item.category === "soup");
    const salad = menu.filter(item => item.category === "salad");
    const pizza = menu.filter(item => item.category === "pizza");
    const offered = menu.filter(item => item.category === "offered");

    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover img={menuImg} title="Our menu"></Cover>
            <div>
                <SectionTitle heading="Today's Offer" subHeading="Don't Miss"></SectionTitle>
                <MenueCategory items={offered}></MenueCategory>
            </div>
            <div>
                <MenueCategory items={desserts} title="Dessert" img={dessertImg}></MenueCategory>
            </div>
            <div>
                <MenueCategory items={pizza} title="Pizza" img={pizzaImg}></MenueCategory>
            </div>
            <div>
                <MenueCategory items={salad} title="Salad" img={saladImg}></MenueCategory>
            </div>
            <div>
                <MenueCategory items={soup} title="Soup" img={soupImg}></MenueCategory>
            </div>
        </div>
    );
};

export default Menu;