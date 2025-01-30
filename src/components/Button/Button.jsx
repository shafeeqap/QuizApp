import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  type = "button",
  children,
  onClick = undefined,
  variant = "primary",
  size = "medium",
  isDisabled = false,
  className = "",
  ...props
}) => {
  const variantClass = `button-${variant}`;
  const sizeClass =
    size === "small" ? "button-small" : size === "large" ? "button-large" : "";
  const disabledClass = isDisabled ? "button-disabled" : "";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`button ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
