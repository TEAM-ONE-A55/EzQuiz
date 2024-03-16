import PropTypes from "prop-types";
export default function ButtonLanding({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-te-ripple-init
      data-te-ripple-color="light"
      className="mb-6 inline-block w-full rounded bg-yellow-400 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-800 focus:outline-none focus:ring-0 active:bg-yellow-500"
    >
      {children}
    </button>
  );
}

ButtonLanding.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
