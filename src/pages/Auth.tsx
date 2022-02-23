import { FC, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

enum AuthModes {
  login,
  signup,
}

const AuthPage: FC = () => {
  const [authMode, setAuthMode] = useState(AuthModes.signup);
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

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-5xl pt-5 text-center dark:text-blue-200 text-gray-800">
        Chat app
      </h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-sm">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-9"
            onSubmit={handleSubmit(onSubmit)}
          >
            {authMode === AuthModes.signup && (
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className={`w-full rounded ${
                    errors.username &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                  }`}
                  {...register("username", {
                    required: {
                      value: authMode === AuthModes.signup,
                      message: "Username is Required",
                    },
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs italic">
                    {errors.username.message}
                  </p>
                )}
              </div>
            )}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className={`w-full rounded ${
                  errors.email &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: RegExp(
                      "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$"
                    ),
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className={`w-full rounded foucs:outline-none ${
                  errors.password &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>
            {authMode === AuthModes.signup && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={`w-full rounded foucs:outline-none ${
                    errors.cpassword &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                  }`}
                  {...register("cpassword", {
                    required: "Password is required",
                    validate: value => {
                      return (
                        value === getValues("password") ||
                        "Passwords do not match"
                      );
                    },
                  })}
                />
                {errors.cpassword && (
                  <p className="text-red-500 text-xs italic">
                    {errors.cpassword.message}
                  </p>
                )}
              </div>
            )}
            <p className="mt-2">
              {authMode === AuthModes.login
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                className="text-blue-500"
                onClick={switchAuthMode}
              >
                {authMode === AuthModes.login ? "Sign up" : "Login"}
              </button>
            </p>
            <div className="text-center mt-7 w-full bg-blue-700 rounded py-2 text-gray-100 cursor-pointer">
              <button>
                {authMode === AuthModes.login ? "Login" : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
