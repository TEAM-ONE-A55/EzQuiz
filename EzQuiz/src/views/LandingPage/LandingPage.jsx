import { useNavigate } from "react-router";
import LPForm from "./LPForm/LPForm";
import Benefits from "./Benefits/Benefits";
import BenefitSimple from "./BenefitSimple/BenefitSimple";
import ButtonLanding from "./ButtonLanding/ButtonLanding";
import { useState } from "react";
import Button from "../../components/Button/Button";
import Testimonials from "./Testimonial/Testimonials";

export default function LandingPage() {
  const [seeEducatorBenefits, setSeeEducatorBenefits] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <section className="background-radial-gradient mb-40 overflow-hidden">
        <div className="px-6 py-12 text-center md:px-12 lg:py-24 lg:text-left">
          <div className="w-100 mx-auto text-neutral-800 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="mt-12 lg:mt-0" style={{ zIndex: "10" }}>
                <h1 className="mt-0 mb-12 text-5xl font-bold font-custom tracking-tight md:text-6xl xl:text-6xl text-neutral-800">
                  Craft, Share, and Assess with Ease <br />
                  <span className="text-yellow-400">Welcome to EzQuiz</span>
                </h1>
                <h3 className="mt-0 mb-12 text-xl font-custom tracking-tight md:text-xl xl:text-xl text-neutral-600">
                  Empower Your Teaching and Learning Experience with EzQuiz -
                  Where Crafting Quizzes and Assessing Knowledge is Effortless
                </h3>
                <p className="opacity-70 text-neutral-600 font-custom">
                  Whether you&apos;re an educator, recruiter, or student,
                  explore a range of benefits tailored to enhance your
                  experience. Sign up today!
                </p>
                <div className="mb-6 flex min-h-[1.5rem] justify-center pl-[1.5rem]"></div>
                <ButtonLanding onClick={() => navigate("/sample-quiz")}>
                  Get Started with a Sample Quiz
                </ButtonLanding>
              </div>

              <div className="relative mb-12 lg:mb-0">
                <div
                  id="radius-shape-1"
                  className="absolute rounded-full shadow-lg"
                ></div>
                <div id="radius-shape-2" className="absolute shadow-lg"></div>
                <div className="relative bg-neutral-50 backdrop-blur-[25px] backdrop-saturate-[200%] block rounded-lg px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)">
                  <LPForm />
                </div>
              </div>
            </div>
          </div>
          <Benefits heading="Why EzQuiz?">
            <BenefitSimple
              iconPath={
                <path
                  d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm-1.5.5v2h-5v-2zm-9.4-6v8h-5.6v-8zm10.9-7.5c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-1.5.5v8.6h-5v-8.6zm-7.9-.5c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6zm-1.5.5v2.6h-5.6v-2.6z"
                  fillRule="nonzero"
                />
              }
              heading="Experience Sample Quizzes"
              subheading="Introductory Exploration"
              text="Embark on your journey to knowledge discovery with a sample random
            quiz right from our landing page. Get started now!"
            />
            <BenefitSimple
              heading="Unlock Customized Features"
              subheading="Tailored Access"
              text="Register as an educator, recruiter, or student to unlock
                  tailored features. Start your journey today!"
              iconPath={
                <path d="M11.5 23l-8.5-4.535v-3.953l5.4 3.122 3.1-3.406v8.772zm1-.001v-8.806l3.162 3.343 5.338-2.958v3.887l-8.5 4.534zm-10.339-10.125l-2.161-1.244 3-3.302-3-2.823 8.718-4.505 3.215 2.385 3.325-2.385 8.742 4.561-2.995 2.771 2.995 3.443-2.242 1.241v-.001l-5.903 3.27-3.348-3.541 7.416-3.962-7.922-4.372-7.923 4.372 7.422 3.937v.024l-3.297 3.622-5.203-3.008-.16-.092-.679-.393v.002z" />
              }
            />
            <BenefitSimple
              iconPath={
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z" />
              }
              heading="Explore Global Rankings"
              subheading="Ascend the Leaderboard"
              text="Browse all public quizzes and track your progress on the
            global scoreboard. See how you measure up and challenge
            yourself to climb higher!"
            />
          </Benefits>
          <Benefits>
            <BenefitSimple
              iconPath={
                <path d="M24 21h-3l1-3h1l1 3zm-12.976-4.543l8.976-4.575v6.118c-1.007 2.041-5.607 3-8.5 3-3.175 0-7.389-.994-8.5-3v-6.614l8.024 5.071zm11.976.543h-1v-7.26l-10.923 5.568-11.077-7 12-5.308 11 6.231v7.769z" />
              }
              heading="Engage in Interactive Learning"
              subheading="Interactive Discovery"
              text="Dive into a world of knowledge with popular public quizzes or challenge yourself with random quizzes. Start your learning journey now!"
            />
            <BenefitSimple
              heading="Join Exclusive Invitations"
              subheading="Exclusive Access"
              text="Gain access to private quizzes by joining classrooms with exclusive invitations. Stay in the loop with our seamless notification system. Join now!"
              iconPath={
                <path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 9.236 2.247 15.968-3.405 15.968-9.457 0-5.812-5.701-10.007-12-10.007zm1 15h-2v-6h2v6zm-1-7.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
              }
            />
            <BenefitSimple
              iconPath={
                <path
                  d="m2.014 11.998c0 5.517 4.48 9.997 9.998 9.997s9.997-4.48 9.997-9.997c0-5.518-4.479-9.998-9.997-9.998s-9.998 4.48-9.998 9.998zm6.211-1.524s1.505-1.501 3.259-3.254c.146-.147.338-.22.53-.22s.384.073.53.22c1.754 1.752 3.258 3.254 3.258 3.254.145.145.217.335.217.526 0 .192-.074.384-.221.53-.292.293-.766.295-1.057.004l-1.977-1.977v6.693c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-6.693l-1.979 1.978c-.289.289-.761.287-1.054-.006-.147-.147-.221-.339-.222-.53 0-.191.071-.38.216-.525z"
                  fillRule="nonzero"
                />
              }
              heading="Monitor Your Growth"
              subheading="Track Progress"
              text="Track your performance over time and stay motivated by monitoring your progress and seeing how you improve with each quiz you take."
            />
          </Benefits>
          
          <ButtonLanding
            onClick={() => setSeeEducatorBenefits(!seeEducatorBenefits)}
          >
            Discover the Educator Advantage
          </ButtonLanding>
          {seeEducatorBenefits && (
            <Benefits>
              <BenefitSimple
                iconPath={
                  <path
                    d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm7.25-4.75h-2.5c-.414 0-.75.336-.75.75s.336.75.75.75h2.5v2.5c0 .414.336.75.75.75s.75-.336.75-.75v-2.5h2.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-2.5v-2.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm3.25-7.25v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z"
                    fillRule="nonzero"
                  />
                }
                heading="Craft Quizzes with Ease"
                subheading="Effortless Creation"
                text="Create quizzes effortlessly with our intuitive interface. Get started now!"
              />
              <BenefitSimple
                heading="Assess Knowledge Seamlessly"
                subheading="Seamless Evaluation"
                text="Assess your students' knowledge with ease, review their results, and provide valuable feedback."
                iconPath={
                  <path d="M5.641 22.569l-5.641 1.431 1.397-5.674 4.244 4.243zm-2.829-5.657l4.243 4.243 16.945-16.913-4.242-4.242-16.946 16.912zm14.114-2.783l-1.414 1.414.708.708 1.414-1.414 1.414 1.414-2.122 2.122.707.707 2.122-2.122 1.417 1.385-2.829 2.829-4.232-4.233-1.415 1.413 5.648 5.648 5.656-5.657-5.643-5.643-1.431 1.429zm-9.887-4.261l-4.21-4.21 2.828-2.829 1.369 1.401-2.121 2.121.707.707 2.121-2.122 1.414 1.415-1.414 1.414.707.707 1.414-1.414 1.432-1.429-5.629-5.629-5.657 5.657 5.623 5.624 1.416-1.413z" />
                }
              />
              <BenefitSimple
                iconPath={
                  <path d="M1.981 8.444h20.038c.398 0 .747.264.856.648l1.105 3.904.02.139c0 .209-.127.402-.33.48l-.001.001c-.24.092-.511-.005-.635-.231l-1.144-2.071-.328 7.967c-.017.403-.347.719-.749.719h-.001c-.393 0-.716-.306-.746-.698-.068-.865-.249-2.933-.304-3.752-.022-.34-.271-.54-.541-.54-.242 0-.514.2-.537.54-.055.819-.236 2.887-.304 3.752-.03.392-.352.698-.746.698h-.001c-.402 0-.732-.316-.749-.719-.086-2.08-.435-8.736-.435-8.736h-1.669s-.349 6.656-.435 8.736c-.017.402-.347.719-.749.719h-.001c-.394 0-.716-.306-.746-.698-.068-.865-.249-2.933-.304-3.752-.023-.34-.295-.54-.537-.54h-.004c-.242 0-.515.2-.537.54-.055.819-.236 2.887-.304 3.752-.03.392-.353.698-.746.698h-.001c-.402 0-.732-.316-.749-.719-.086-2.08-.435-8.736-.435-8.736h-1.681s-.349 6.656-.435 8.736c-.017.403-.347.719-.749.719h-.001c-.394 0-.716-.306-.746-.698-.068-.865-.249-2.933-.304-3.752-.023-.34-.295-.54-.537-.54-.27 0-.519.2-.541.54-.055.819-.236 2.887-.304 3.752-.03.392-.353.698-.746.698h-.001c-.402 0-.732-.316-.749-.719l-.328-7.967-1.144 2.071c-.124.226-.395.323-.635.231l-.001-.001c-.203-.078-.33-.271-.33-.48l.02-.139 1.105-3.904c.109-.384.458-.648.856-.648zm3.019-4.444c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm14 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-6.994 0c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z" />
                }
                heading="Collaborate with Educators"
                subheading="Collaborative Networking"
                text="Create classrooms, share quizzes, and join educator groups for collaborative quiz creation and assessments."
              />
            </Benefits>
          )}
          <Benefits heading="What People Are Saying About EzQuiz"></Benefits>
        </div>
        <Testimonials />
      </section>
    </>
  );
}
