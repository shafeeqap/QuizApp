import * as Yup from "yup";

export const registerValidation = Yup.object({
  name: Yup.string()
  .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
  .min(3)
  .required("Please enter your name"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your email"),
  password: Yup.string()
    .matches(/^[^\s]+$/, "Password cannot contain spaces")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(6)
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
