import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import type { FormLoginValues } from "../../types/types";
import { Controller, useForm } from "react-hook-form";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const context = useContext(AuthContext);

  const { control, handleSubmit } = useForm<FormLoginValues>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: FormLoginValues) => {
    setIsLoading(true);
    console.log("Submitting login form", data, data.remember);
    try {
      await context.login(data.name, data.password, data.remember);
      console.log("Login successful", data);

      toast("Welcome!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        closeButton: false,
        hideProgressBar: true,
        style: { background: "transparent", boxShadow: "none", padding: 0 },
      });
    } catch (error) {
      console.log("authError", error);
      const errorMessage = {
        title: "Auth Error",
        body: (error as Error).message,
      };
      toast(`${errorMessage.title}: ${errorMessage.body}`, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        closeButton: false,
        hideProgressBar: true,
        style: { background: "transparent", boxShadow: "none", padding: 0 },
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="name">Username: </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <input id="name" {...field} />}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password: </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input type="password" id="password" {...field} />
              )}
            />
          </div>
          <div className="input-group">
            <label htmlFor="remember">Remember me: </label>
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  id="remember"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              )}
            />
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
