import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
    return (
        <div className="featured-item pt-8 bg-fixed">
            <SectionTitle
                heading="Featured Item"
                subHeading="check it out"
            ></SectionTitle>

            <div className="md:flex justify-center items-center py-20 px-36 bg-black bg-opacity-30 text-white">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <h3>Aug 20, 2024</h3>
                    <h3>WHERE CAN I GET SOME?</h3>
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</h3>
                    <button className="btn btn-outline border-0 border-b-4 text-white border-white mt-4">Order now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;