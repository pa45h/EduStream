import React from "react";

const SummaryCard = ({ icon, title, value }) => (
  <div className="greenBgShadow border border-richblack-700 rounded-2xl p-5 flex flex-col justify-center items-center gap-4 hover:scale-[1.02] transition-all duration-200">
    <div className="text-yellow-100 text-3xl text-center">{icon}</div>
    <div className="text-center">
      <p className="text-richblack-300 text-sm mb-4">{title}</p>
      <h3 className="text-richblack-5 text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

export default SummaryCard;
