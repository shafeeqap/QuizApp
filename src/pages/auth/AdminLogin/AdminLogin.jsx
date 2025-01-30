import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidation } from "../../../utils/validation/loginValidation";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../../context/userContext";
import "./AdminLogin.css";
import Loading from "../../../components/Loading/Loading";
import Button from "../../../components/Button/Button"
const initialValues = {
  email: "",
  password: "",
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const { authUser, setIsLoading, isLoading } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const user = await authUser(values);

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        alert("Access denied. Not an admin.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <section>
        <div className="admin-container">
          <div className="title">
            <h4>Admin Login</h4>
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
                      <Button type="submit" disabled={isLoading} >
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

export default AdminLogin;
