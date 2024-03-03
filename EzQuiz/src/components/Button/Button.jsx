import PropTypes from "prop-types";
import "./Button.css";

export default function Button({ onClick, children }) {
  return <button className="button-comp" onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
