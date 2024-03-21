import PropTypes from "prop-types";
export default function ButtonLanding({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-te-ripple-init
      data-te-ripple-color="light"
      className="max-w-96 mx-auto block rounded bg-yellow-400 px-6 pt-2.5 pb-2 text-md font-medium uppercase leading-normal text-neutral-800 shadow-lg shadow-neutral-400 transition duration-150 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-500 focus:outline-none focus:ring-0 active:bg-yellow-500"
    >
      {children}
    </button>
  );
}

ButtonLanding.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
