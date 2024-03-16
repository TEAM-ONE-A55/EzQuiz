import PropTypes from "prop-types";

export default function Benefits({ heading, children }) {
  return (
    <div className="container my-24 mx-auto md:px-6">
      <section className="mb-32 text-center">
        <h2 className="mb-20 text-3xl font-bold text-neutral-800">{heading}</h2>

        <div className="grid lg:grid-cols-3 lg:gap-x-12">{children}</div>
      </section>
    </div>
  );
}

Benefits.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node,
};
