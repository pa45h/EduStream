import React from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Button from "./Button";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  button1,
  button2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex flex-col ${position} my-20 justify-between gap-10`}>
      <div className="lg:w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblue-200 font-bold">{subheading}</div>
        <div className="flex gap-7 mt-7 mx-auto">
          <Button active={button1.active} linkto={button1.linkto}>
            <div className="flex gap-2 items-center">
              {button1.btnText}
              <FaRegArrowAltCircleRight />
            </div>
          </Button>
          <Button active={button2.active} linkto={button2.linkto}>
            {button2.btnText}
          </Button>
        </div>
      </div>

      <div>
        <div
          className={`h-fit flex flex-row text-[14px] w-[100%] py-4 md:w-[500px] mx-auto relative ${backgroundGradient} rounded-lg`}
        >
          <div className={` absolute w-[100%] h-[100%]`}></div>

          <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
          </div>

          <div
            className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1 select-none`}
          >
            <TypeAnimation
              sequence={[codeblock, 5000, ""]}
              repeat={Infinity}
              curser={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
