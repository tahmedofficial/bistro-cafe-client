import FoodCard from "../../Components/FoodCard/FoodCard";
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


const OrderTab = ({ items }) => {

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <div>

            <Swiper className="mySwiper" pagination={pagination} modules={[Pagination]}>
                <SwiperSlide>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)}
                    </div>
                </SwiperSlide>
            </Swiper>

        </div>
    );
};

export default OrderTab;

OrderTab.propTypes = {
    items: PropTypes.array
}