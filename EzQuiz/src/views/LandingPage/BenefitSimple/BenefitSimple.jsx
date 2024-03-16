import PropTypes from "prop-types";

export default function BenefitSimple({ iconPath, heading, subheading, text }) {
  return (
    <div className="mb-16 lg:mb-0">
      <div className="block h-full rounded-lg bg-neutral-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="flex justify-center">
          <div className="-mt-8 inline-block rounded-full bg-yellow-400 p-4 text-primary shadow-md">
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 fill-white"
            >
              {iconPath}
            </svg>
          </div>
        </div>
        <div className="p-6">
          <h3 className="mb-4 text-2xl font-bold text-yellow-400">{heading}</h3>
          <h5 className="mb-4 text-lg font-medium text-neutral-600">
            {subheading}
          </h5>
          <p className="text-neutral-500">{text}</p>
        </div>
      </div>
    </div>
  );
}

BenefitSimple.propTypes = {
  iconPath: PropTypes.node,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  text: PropTypes.string,
};
