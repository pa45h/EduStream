import React from "react";
import { IoPeople } from "react-icons/io5";
import { FaNetworkWired } from "react-icons/fa";

const CourseCard = ({ cardData, currCard, setCurrCard }) => {
  return (
    <div className="w-[350px]">
      <div
        className={`flex flex-col gap-4 p-6 justify-between cursor-pointer h-[300px] transition-all duration-200 ${
          cardData.heading === currCard
            ? "bg-pure-greys-5 text-richblack-900 shadow-[15px_15px_10px_0px_rgb(255,214,10)]"
            : "bg-richblack-800 hover:shadow-[15px_15px_10px_0px_rgb(255,214,10)]"
        }`}
        onClick={() => setCurrCard(cardData.heading)}
      >
        <h2 className="text-xl font-semibold">{cardData.heading}</h2>
        <p className="text-richblack-500">{cardData.description}</p>
        <div className="flex items-center justify-between border-richblack-500 border-t-2 border-dotted mt-10 pt-5">
          <p
            className={`flex gap-3 items-center justify-center
          ${
            cardData.heading === currCard
              ? "text-blue-300"
              : "text-richblack-500"
          }`}
          >
            <IoPeople />
            {cardData.level}
          </p>
          <p
            className={`flex gap-3 items-center justify-center
          ${
            cardData.heading === currCard
              ? "text-blue-300"
              : "text-richblack-500"
          }`}
          >
            <FaNetworkWired />
            {cardData.lessionNumber} Lessons
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
