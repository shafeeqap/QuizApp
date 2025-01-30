import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidation } from "../../../utils/validation/registerValidation";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../../utils/config/firebase";
import {
  doc,
  setDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./RegisterUser.css";
import { useContext } from "react";
import UserContext from "../../../context/userContext";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";
import Button from "../../../components/Button/Button";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterUser = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(UserContext);

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const usersRef = collection(db, "users");
      const emailQuery = query(usersRef, where("email", "==", values.email));
      const querySnapshot = await getDocs(emailQuery);

      if (!querySnapshot.empty) {
        toast.error("A user with this email already exists. Please log in.");
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: values.name,
        email: user.email,
        role: "user",
      });

      console.log("User registered successfully:", user);
      toast.success("Registration successful");

      resetForm();
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <section>
        <div className="regi-container">
          <div className="title">
            <h4>User Registration</h4>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={registerValidation}
            onSubmit={handleSubmit}
          >
            {() => {
              return (
                <Form>
                  <div className="for">
                    <div className="input">
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="name-field"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error"
                      />
                    </div>
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
                    <div className="input">
                      <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Enter your confirm password"
                        className="field"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <Button type="submit">
                        {isLoading ? (
                          <Loading
                            height={"40px"}
                            width={"40px"}
                            color={"#fff"}
                          />
                        ) : (
                          "Register"
                        )}
                      </Button>
                    </div>
                    <div>
                      <p>
                        You have already an account?{" "}
                        <span
                          style={{ color: "blue" }}
                          onClick={() => navigate("/login")}
                        >
                          Login
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

export default RegisterUser;
