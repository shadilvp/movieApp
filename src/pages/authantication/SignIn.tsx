import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { RegisterResponse } from "../../Types/auth";
import loginIMG from "../../assets/loginIMG.jpg";
import { login } from "../../services/authService";
import toast from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();

  const mutation = useMutation<
    RegisterResponse,
    AxiosError<{ message?: string }>,
    { email: string; password: string }
  >({
    mutationFn: login,
    onSuccess: (response) => {
      toast.success(response.message || "User logined succesfully")
      navigate("/");
    },
    onError: (error) => {
      toast.error("Something went wrong")
      console.error("Registration failed:", error);
    },
  });

  return (
    <div className="flex h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${loginIMG})` }} >
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-sm shadow-lg rounded-[50px] p-6">
          <h2 className="text-2xl font-bold text-black text-center mb-6">
            Sign In
          </h2>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
              password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
            })}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              console.log("Form values:", values);
              setSubmitting(false);

              mutation.mutate(values, {
                onError: (error) => {
                  setErrors({
                    email: error.response?.data?.message || "Registration failed",
                  });
                  setSubmitting(false);
                },
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">

                <div>
                  <label className="block text-black">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px]"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-black">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px]"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 bg-[#343434bd] text-white py-2 rounded-lg"
                  >
                    {isSubmitting ? "Logining..." : "Login"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="flex flex-col items-center m-4">
            <p className="p-4">
              Don't Have An Account{" "}
              <a className="text-[#ffffff] hover:underline" href="/register">
                Sign UP
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
