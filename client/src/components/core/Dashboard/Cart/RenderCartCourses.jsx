import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { removeFromCart } from "../../../../slices/cartSlice";
import GetAvgRating from "../../../../utils/avgRating";
import RatingStars from "../../../common/RatingStars";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="w-11/12 mx-auto flex flex-1 flex-col">
      {cart.map((course, index) => {
        const avgReviewCount = GetAvgRating(course?.ratingAndReviews || []); 
        return (
          <div
            key={course?._id}
            className={`flex w-full flex-wrap md:items-start justify-between gap-6 
                                    ${index !== cart.length - 1 && "pb-6"}
                                    ${index !== 0 && "mt-6"}`}
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-4 xl:flex-row">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[148px] w-[220px] rounded-lg object-cover"
              />
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-medium text-richblack-5">
                  {course?.courseName}
                </p>
                <p className="text-sm text-richblack-300">
                  {course?.category?.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-5">{avgReviewCount}</span>
                  <RatingStars Review_Count={avgReviewCount} />
                  <span className="text-richblack-400">
                    {course?.ratingAndReviews.length} Ratings
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-4 m-2">
              <button
                onClick={() => dispatch(removeFromCart(course?._id))}
                className="flex flex-col justify-center items-center text-pink-500"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>
              <p className="md:mb-6 text-3xl font-medium text-yellow-100">
                ₹ {course?.price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
