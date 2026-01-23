import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { signInUser, signInWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  // console.log("in the login page", location);

  const handleLogin = (data) => {
    // console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        // console.log(result.user);
        toast.success("Welcome back!", {
          position: "top-center",
        });
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login Failed", {
          position: "top-center",
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle().then(() => {
      navigate(location.state || "/");
    });
  };

  const handleForgotPassword = () => {
    const email = getValues("email");

    navigate("/forgot-password", { state: { email } });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-[42px] font-black text-accent">
          Welcome Back
        </h1>
        <p className="text-granite-gray">Login with ZapShift</p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        {/* Email Field */}
        <div className="form-control w-full">
          <label className="label font-bold text-accent">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="input input-bordered w-full rounded-xl focus:outline-primary"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="form-control w-full relative">
          <label className="label font-bold text-accent">Password</label>
          <input
            type={show ? "text" : "password"}
            placeholder="Min 6 characters"
            className="input input-bordered w-full rounded-xl focus:outline-primary"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Too short!" },
            })}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="cursor-pointer absolute right-4 top-1/2"
          >
            {show ? <FaEye /> : <FaEyeSlash />}{" "}
          </button>
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="link link-hover text-accent font-semibold"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-dark-gray font-bold text-lg rounded-xl h-14 shadow-lg mt-4"
        >
          Login
        </button>

        <p className="text-granite-gray mt-4 flex items-center gap-2.5">
          <span>Don’t have any account?</span>
          <Link
            state={location.state}
            to="/register"
            className="text-accent font-bold hover:underline"
          >
            Register
          </Link>
        </p>
        <div className="relative flex py-3 items-center">
          <div className="grow border-t border-gray-300"></div>
          <span className="shrink mx-4 text-sonic-silver">Or</span>
          <div className="grow border-t border-gray-300"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="btn btn-blue-1 w-full text-dark-gray font-bold text-lg rounded-xl h-14 shadow-lg mt-4 gap-2.5 flex items-center"
        >
          <FcGoogle size="20" /> <span>Login with google</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
