import { useState, useContext } from "react";
import { AuthContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import type { FormLoginValues } from "../../types/types";
import { Controller, useForm } from "react-hook-form";
import LogoWithText from "../../assets/svg/logo_with_text.svg?react";
import SupportIcon from "../../assets/svg/support.svg?react";
import FullScreenSpinner from "../../components/FullScreenSpinner";

const LoginForm = () => {
  const { handleSubmit, register, control } = useForm<FormLoginValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const onSubmit = async (data: FormLoginValues) => {
    setIsLoading(true);
    console.log("Submitting login form", data, data.remember);
    try {
      await context.login(data.name, data.password, data.remember);
      await delay(1000);
      navigate("/");
    } catch (error) {
      setErrorMsg((error as Error).message);
      console.log("authError", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex  mx-auto min-h-screen">
        {isLoading && <FullScreenSpinner />}

        <div className=" flex-1 flex flex-col  justify-center items-center relative w-1/2">
          <div className="w-[360px] mt-24 -ml-6">
            <div className="mb-10">
              <LogoWithText className=" dark:text-white" />
            </div>
            <div className="mb-8">
              <div className="font-bold text-4xl mb-3">LOGIN</div>
              <div className="text-gray-600">
                Welcome back! Please enter your details.
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2.5">
                <label className="">
                  <div className="mb-1.5 text-sm text-gray-600  font-semibold">
                    Email
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 bg-white dark:text-black"
                    {...register("name", {
                      required: true,
                    })}
                  />
                </label>
              </div>
              <div className="mb-2">
                <label className="">
                  <div className="mb-1.5 text-sm text-gray-600  font-semibold">
                    Password
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 bg-white dark:text-black"
                    {...register("password", {
                      required: true,
                    })}
                  />
                </label>
              </div>

              <div className="flex justify-between mb-6">
                <label className="flex items-center gap-2 text-sm">
                  <Controller
                    name="remember"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 bg-white"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-blue-700 font-bold hover:underline text-sm"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="text-white font-bold bg-blue-700 p-2.5 w-full rounded-lg"
              >
                Sign in
              </button>
              <div className="text-xs text-red-600 mt-2">
                {errorMsg && errorMsg}
              </div>
            </form>

            <div className="mt-9 text-sm text-gray-600 text-center">
              Don’t have an account?
              <a
                href="#"
                className="text-blue-700 font-bold hover:underline mx-2"
              >
                Sign up
              </a>
            </div>
          </div>

          <div className="font-medium text-sm text-gray-600  absolute bottom-8 left-1/2 transform -translate-x-1/2">
            © ALPHAS 2025
          </div>
        </div>

        <div className="bg-black flex-1 relative pt-8 pr-14  w-1/2">
          <div className="text-end">
            <button className="text-white inline-flex gap-2 items-center justify-center px-3 py-2 bg-gray-800 rounded-lg text-xs ">
              <SupportIcon />
              Need Help!
            </button>
          </div>

          <img
            src="/login_patteren_bg.svg"
            alt="Login Background"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          <img
            src="/login_lower_logo.png"
            alt="Login Background"
            className="absolute bottom-16 right-8"
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
