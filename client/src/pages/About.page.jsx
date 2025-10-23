import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.jpg";
import BannerImage2 from "../assets/Images/aboutus2.jpg";
import BannerImage3 from "../assets/Images/aboutus3.jpg";
import FoundingStory from "../assets/Images/FoundingStory.jpg";

import Footer from "../components/common/Footer";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import ReviewSlider from "../components/common/ReviewSlider";

const About = () => {
  return (
    <div>
      {/* Section-1 */}
      <section className="bg-richblue-900 border-y border-richblack-400">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Shaping the Future of Online Learning for a{" "}
            <HighlightText text={"Brighter Tomorrow"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              EduStream leads the way in online education, offering innovative
              courses, using the latest technologies, and building a vibrant
              learning community for a brighter future.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>

          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} className="w-[350px] rounded-full" />
            <img src={BannerImage2} className="w-[350px] rounded-full" />
            <img src={BannerImage3} className="w-[350px] rounded-full" />
          </div>
        </div>
      </section>

      {/* Section-2*/}
      <section className="border-b border-richblack-400">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px]"></div>
          <Quote />
        </div>
      </section>

      {/* Section-3 */}
      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                EduStream was created from a shared vision to transform
                learning. A team of educators, technologists, and lifelong
                learners recognized the need for flexible, high-quality
                education accessible to everyone.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Having seen the limits of traditional classrooms, we wanted to
                break barriers of geography and accessibility. Our platform
                empowers learners everywhere to reach their full potential.
              </p>
            </div>
            <div>
              <img
                src={FoundingStory}
                className="shadow-[0_0_20px_0px] shadow-pink-600 w-[555px] rounded-3xl"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="mb-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                We aim to transform learning with an intuitive platform that
                blends advanced technology and engaging content, creating an
                interactive and dynamic experience for every learner.
              </p>
            </div>

            <div className="mb-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%]">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our mission is to build a thriving learning community where
                learners connect, collaborate, and grow together. We foster
                knowledge sharing through forums, live sessions, and networking
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section-4 */}
      <StatsComponent />

      {/* Section-5 */}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* Section-6 -> Review */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Review from other learners
        </h1>
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  );
};

export default About;
