import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../../common/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Everyone, Everywhere",
    description:
      "Join EduStream and access courses from 275+ top universities and companies, designed for flexible, affordable, and career-focused online learning.",
    BtnText: "Explore Courses",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Industry-Aligned Curriculum",
    description:
      "Our courses are tailored to meet current industry standards, helping you learn skills that employers value most.",
  },
  {
    order: 2,
    heading: "Interactive Learning",
    description:
      "Hands-on projects, quizzes, and collaborative exercises make learning practical, engaging, and fun.",
  },
  {
    order: 3,
    heading: "Official Certification",
    description:
      "Earn recognized certificates from top institutions to showcase your expertise and boost your career.",
  },
  {
    order: 4,
    heading: "Smart Auto-Grading",
    description:
      "Instant feedback and auto-graded assignments help you track progress efficiently and master each topic.",
  },
  {
    order: 5,
    heading: "Career-Ready Skills",
    description:
      "Learn real-world skills and tools to confidently take on professional challenges and grow your career.",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto lg:w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
      {LearningGridArray.map((card, index) => (
        <div
          key={index}
          className={`transition-all duration-200 ${
            index === 0 && "xl:col-span-2 xl:h-[294px]"
          }
             ${
               card.order % 2 === 1
                 ? "bg-richblue-800 h-[294px] border-richblack-400 border hover:skew-x-3 hover:scale-95"
                 : card.order % 2 === 0
                 ? "bg-richblack-800 h-[294px] border-richblack-400 border hover:-skew-x-3 hover:scale-95"
                 : "bg-transparent"
             }
             ${card.order === 3 && "xl:col-start-2"}
            `}
        >
          {card.order < 0 ? (
            <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
              <div className="text-4xl font-semibold">
                {card.heading}
                <HighlightText text={card.highlightText} />
              </div>
              <p className="text-richblack-300 font-medium">{card.description}</p>
              <div className="w-fit mt-2">
                <CTAButton active={true} linkto={card.BtnLink}>
                  {card.BtnText}
                </CTAButton>
              </div>
            </div>
          ) : (
            <div className="p-8 flex flex-col gap-8">
              <h1 className="text-richblack-5 text-lg">{card.heading}</h1>
              <p className="text-richblack-300 font-medium">{card.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningGrid;
