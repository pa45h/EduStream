import React from "react";
import HighlightText from "./HighlightText";
import FeatureCard from "../HomePage/FeatureCard";
import { GiProgression } from "react-icons/gi";
import { MdCompareArrows } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";

const LearnLangSection = () => {
  return (
    <div className="mt-[130px] mb-32">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl font-semibold text-center">
          Your <HighlightText text={"all-in-one platform"} /> for{" "}
          <HighlightText text={"learning any language"} />
        </div>

        <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%] lg:w-[60%]">
          Learn multiple languages effortlessly with Spin — 20+ languages,
          realistic voice-overs, progress tracking, custom schedules, and more.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-16 px-4 max-w-7xl mx-auto">
          <FeatureCard
            title="Know Your Progress"
            description="Track your mastery and identify weak spots with detailed analytics. See your score history, time spent, and estimated completion dates."
            icon={GiProgression}
            accentColor="blue"
          />

          <FeatureCard
            title="Compare with Others"
            description="Benchmark your skills against peers globally or within your cohort. Participate in challenges and see where you rank in real-time."
            icon={MdCompareArrows}
            accentColor="pink"
          />

          <FeatureCard
            title="Plan Your Lessons"
            description="Customize your learning path with a flexible scheduler. Set goals, block out study time, and let our AI suggest optimal lesson plans."
            icon={FaRegCalendarCheck}
            accentColor="green"
          />
        </div>
      </div>
    </div>
  );
};

export default LearnLangSection;
