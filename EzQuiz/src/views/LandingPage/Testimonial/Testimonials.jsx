import { useState } from "react";
import { testimonals } from "../../../constants/constants";

export default function Testimonials() {
  const [activeUser, setActiveUser] = useState(0);

  const handleNext = () => {
    setActiveUser((prev) => (prev === testimonals.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveUser((prev) => (prev === 0 ? testimonals.length - 1 : prev - 1));
  };

  return (
    <section style={{ marginTop: "-220px" }}>
      <div
        id="carouselExampleCaptions"
        className="relative"
        data-te-carousel-init
        data-te-carousel-slide
      >
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <div
            className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-active
            data-te-carousel-item
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              className="mx-auto mb-6 rounded-full shadow-neutral-800 border-none shadow-lg w-[150px] h-[150px]"
              src={testimonals[activeUser].image}
              alt="avatar"
            />
            <div className="flex flex-wrap justify-center">
              <div className="w-full shrink-0 grow-0 basis-auto px-3 lg:w-8/12">
                <h5 className="mb-2 text-lg font-bold">
                  {testimonals[activeUser].name}
                </h5>
                <p className="mb-4 font-medium text-neutral-700">
                  {testimonals[activeUser].role}
                </p>
                <p className="mb-6 text-neutral-400">
                  {testimonals[activeUser].description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="absolute top-0 bottom-0 left-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="prev"
          onClick={handlePrev}
        >
          <span className="inline-block h-8 w-8">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="text-neutral-800 dark:text-neutral-400"
            >
              <path
                fill="currentColor"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Previous
          </span>
        </button>
        <button
          className="absolute top-0 bottom-0 right-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="next"
          onClick={handleNext}
        >
          <span className="inline-block h-8 w-8">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="text-neutral-800 dark:text-neutral-400"
            >
              <path
                fill="currentColor"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Next
          </span>
        </button>
      </div>
    </section>
  );
}
