import { useNavigate } from "react-router";
import LPForm from "./LPForm/LPForm";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="background-radial-gradient mb-40 overflow-hidden">
        <div className="px-6 py-12 text-center md:px-12 lg:py-24 lg:text-left">
          <div className="w-100 mx-auto text-neutral-800 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="mt-12 lg:mt-0" style={{ zIndex: "10" }}>
                <h1 className="mt-0 mb-12 text-5xl font-bold font-custom tracking-tight md:text-6xl xl:text-6xl text-gray-200">
                  Craft, Share, and Assess with Ease <br />
                  <span className="text-[hsl(218,81%,75%)]">
                    Welcome to EzQuiz
                  </span>
                </h1>
                <h3 className="mt-0 mb-12 text-xl font-custom tracking-tight md:text-xl xl:text-xl text-[hsl(218,81%,85%)]">
                  Empower Your Teaching and Learning Experience with EzQuiz -
                  Where Crafting Quizzes and Assessing Knowledge is Effortless
                </h3>
                <p className="opacity-70 text-[hsl(218,81%,85%)] font-custom">
                  Whether you&apos;re an educator, recruiter, or student,
                  explore a range of benefits tailored to enhance your
                  experience. Sign up today!
                </p>
                {/* <Button>Take</Button> */}
                <div className="mb-6 flex min-h-[1.5rem] justify-center pl-[1.5rem] font-sans"></div>
                <button
                  type="button"
                  onClick={() => navigate("/sample-quiz")}
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mb-6 inline-block w-full rounded bg-[hsl(218,81%,75%)] px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-primary shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Get Started with a Sample Quiz
                </button>
              </div>

              <div className="relative mb-12 lg:mb-0">
                <div
                  id="radius-shape-1"
                  className="absolute rounded-full shadow-lg"
                ></div>
                <div id="radius-shape-2" className="absolute shadow-lg"></div>
                <div className="relative bg-[hsla(0,0%,100%,0.9)] backdrop-blur-[25px] backdrop-saturate-[200%] block rounded-lg px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,15%,0.9)] dark:shadow-black/20 md:px-12">
                  <LPForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
