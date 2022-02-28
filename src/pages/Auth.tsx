import { FC, useState, useContext } from "react";
import { FieldValues, useForm } from "react-hook-form";

import Input from "../components/Utils/Input";
import useHttp from "../hooks/useHttp";
import authContext from "../contexts/authContext";
import Spinner from "../components/Utils/Spinner";
import { Request } from "../utils/request";

enum AuthModes {
  login,
  signup,
}

const AuthPage: FC = () => {
  const [authMode, setAuthMode] = useState(AuthModes.signup);
  const { isLoading, error, sendRequest } = useHttp();
  const { login } = useContext(authContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const switchAuthMode = () => {
    setAuthMode(
      authMode === AuthModes.login ? AuthModes.signup : AuthModes.login
    );
  };

  const authenticate = async (formData: FieldValues): Promise<any> => {
    const url = `${process.env.SERVER || "http://localhost:8000"}/auth/${
      authMode === AuthModes.login ? "login" : "signup"
    }`;

    return await Request.post(url, formData);
  };

  const onSubmit = (formData: FieldValues) => {
    sendRequest(authenticate, formData, (responseData: any) => {
      login(responseData.token, responseData.user);
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-5xl pt-5 text-center dark:text-blue-200 text-gray-800">
        Quick Chat
      </h1>
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-lg">
          <form
            className="dark:bg-slate-700 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-9"
            onSubmit={handleSubmit(onSubmit)}
          >
            {authMode === AuthModes.signup && (
              <Input
                label="Username"
                type="text"
                register={register("username", {
                  required: {
                    value: authMode === AuthModes.signup,
                    message: "Username is Required",
                  },
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                error={errors.username?.message}
              />
            )}
            <Input
              label="Email"
              type="email"
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: RegExp(
                    "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$"
                  ),
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password?.message}
            />
            {authMode === AuthModes.signup && (
              <Input
                label="Confirm Password"
                type="password"
                register={register("cpassword", {
                  required: "Password is required",
                  validate: value => {
                    return (
                      value === getValues("password") ||
                      "Passwords do not match"
                    );
                  },
                })}
                error={errors.cpassword?.message}
              />
            )}
            <p className="mt-2 dark:text-gray-200">
              {authMode === AuthModes.login
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                className="text-blue-500 dark:text-blue-400"
                onClick={switchAuthMode}
              >
                {authMode === AuthModes.login ? "Sign up" : "Login"}
              </button>
            </p>
            {error && (
              <div className="text-red-500 text-sm italic mt-2">{error}</div>
            )}
            <div className="mt-7 w-full bg-blue-700  rounded py-2 text-gray-100 cursor-pointer">
              <button className="flex justify-center w-full align-middle">
                {isLoading ? (
                  <Spinner />
                ) : authMode === AuthModes.login ? (
                  "Login"
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
