import React from "react";

const StatsComponent = () => {
  const stats = [
    { value: "5K", label: "Active Learners" },
    { value: "10+", label: "Expert Mentors" },
    { value: "200+", label: "Courses" },
    { value: "50+", label: "Awards Won" },
  ];

  return (
    <div className="bg-richblue-900 border-y border-richblack-400">
      <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col py-10">
              <h1 className="text-[30px] font-bold text-richblack-5">
                {stat.value}
              </h1>
              <h2 className="font-semibold text-[16px] text-richblack-500">
                {stat.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
