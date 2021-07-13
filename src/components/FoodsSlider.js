import React from "react";
import SwiperCore, { Navigation } from "swiper";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { Preload } from "./SpecialFoods";
import styled from "styled-components";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
SwiperCore.use([Navigation]);
const SlideSingle = styled.div`
&.bg-dark{
    color : white;
}
  margin: 20px 10px;
  padding: 20px 10px;
  border-radius: 25px;
  img {
    object-fit: cover;
    width: 100px;
    height: 100px;
    border-radius: 15px;
  }
  label {
    font-weight: 100;
  }
`;
function FoodsSlider() {
  const { loading, data, error } = useSelector((state) => state.foods);
  const mode = useSelector((state) => state.theme.mode);
  const wantedFoods = data.filter(
    (item) => item.fields.isAvailable && !item.fields.special
  );
  return (
    <div className="mt-5 mb-5">
      <h2 className="h3 text-primary text-center mb-3">غذاهای پرطرفدار</h2>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        breakpoints={{
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
        }}
      >
        {loading || (!error && !data.length) ? (
          <div className='mt-3'>
            <Preload height="230px" />
          </div>
        ) : error ? (
          <label>خطایی پیش آمده</label>
        ) : (
          wantedFoods.slice(0, 9).map((food, index) => (
            <SwiperSlide key={index}>
              <SlideSingle className={`shadow-sm ${mode === 'light' ? 'bg-light' : 'bg-dark'}`}>
                <div className="d-flex flex-column justify-content-center mb-1 align-items-center">
                  <img src={food.fields.image.fields.file.url} alt="cardimg" />
                  <h5 className="h6 mt-3">{food.fields.title}</h5>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <label>{food.fields.price.toLocaleString()} تومان</label>
                  <Link
                    to={`/foods/${food.sys.id}`}
                    className="btn btn-info mt-1"
                  >
                    سفارش
                  </Link>
                </div>
              </SlideSingle>
              {/* <Card className="bg-dark text-white h-100" >
              <Card.Img src={food.fields.image.fields.file.url} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title>{food.fields.title}</Card.Title>
                <Card.Text>
                 {food.fields.shortDesc}
                </Card.Text>
                <Card.Text>{food.fields.price}</Card.Text>
              </Card.ImgOverlay>
            </Card> */}
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}

export default FoodsSlider;
