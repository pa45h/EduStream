import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { convertSecondsToDuration } from "../../../utils/timeFormatter";

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className="flex justify-between py-2">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>
              <HiOutlineVideoCamera />
            </span>
            <span>{subSec?.title}</span>
          </div>
          <span>{convertSecondsToDuration(subSec?.timeDuration)}</span>
        </div>
      </div>
    </div>
  );
}

export default CourseSubSectionAccordion;
