import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import { apiConnector } from "../../services/apiConnector.service";
import { ratingsEndpoints } from "../../services/apis.service";
import { FaStar } from "react-icons/fa";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      const res = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWES_DETIALS_API
      );
      if (res?.data?.success) {
        setReviews(res?.data?.data);
      }
    };
    fetchAllReviews();
  }, []);

  return (
    <div className="w-full text-white">
      <div className="h-[250px] max-w-maxContent">
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          breakpoints={{
            708: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="greenBgShadow p-3 m-2 rounded-lg min-h-[200px] flex flex-col justify-around">
                <div className="flex gap-2 items-center">
                  <img
                    src={
                      review?.user?.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}_${review?.user?.lastName}`
                    }
                    className="h-9 w-9 object-cover rounded-full"
                  />
                  <div className="text-xs flex flex-col justify-center">
                    <p className="font-semibold">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                    <p className="text-pure-greys-400">{review?.user?.email}</p>
                  </div>
                </div>
                <div className="text-pure-greys-50">
                  <p className="text-sm">{review?.review}</p>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <p className="text-yellow-50">{review?.rating}</p>
                  <ReactStars
                    count={5}
                    value={review?.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
