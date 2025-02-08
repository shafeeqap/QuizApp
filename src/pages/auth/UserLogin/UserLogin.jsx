import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidation } from "../../../utils/validation/loginValidation";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../../context/userContext";
import "./UserLogin.css";
import Loading from "../../../components/Loading/Loading";
import Button from "../../../components/Button/Button";

const initialValues = {
  email: "",
  password: "",
};

const UserLogin = () => {
  const navigate = useNavigate();
  const { authUser, isLoading, setIsLoading } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const user = await authUser(values);

      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    setIsLoading(false);
  };

  return (
    <main>
      <section>
        <div className="user-container">
          <div className="title">
            <h4>User Login</h4>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidation}
            onSubmit={handleSubmit}
          >
            {() => {
              return (
                <Form>
                  <div className="form">
                    <div className="input">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="field"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="input">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="field"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <Button
                        type={"submit"}
                        // disabled={isLoading}
                        variant="primary"
                      >
                        {isLoading ? (
                          <Loading
                            height={"40px"}
                            width={"40px"}
                            color={"#fff"}
                          />
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </div>
                    <div>
                      <p>
                        You don&apos;t have an account?{" "}
                        <span
                          style={{ color: "blue" }}
                          onClick={() => navigate("/register")}
                        >
                          Register
                        </span>
                      </p>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default UserLogin;
