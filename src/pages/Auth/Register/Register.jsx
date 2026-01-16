import { p } from "motion/react-client";
import React from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../../assets/image-upload-icon.png";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    console.log(data.photo[0]);
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Account created successfully", {
          position: "top-center",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error: ", err.message, {
          position: "top-center",
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-[42px] font-black text-accent">
          Create an Account
        </h1>
        <p className="text-granite-gray">Register with ZapShift</p>
      </div>

      <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-start gap-2">
          <label
            htmlFor="image_input"
            className="cursor-pointer group relative"
          >
            <div className="w-20 h-20 rounded-full bg-pale flex items-center justify-center border-2 border-dashed border-gray-300 group-hover:border-primary transition-colors overflow-hidden">
              <img
                src={imageUpload}
                alt="Upload"
                className="w-10 h-10 object-contain"
              />
            </div>
            <input
              type="file"
              id="image_input"
              accept="image/*"
              className="hidden"
              {...register("photo", { required: "Photo is required" })}
            />
            {errors.photo?.type === "required" && (
              <span className="text-red-500 text-sm mt-1">
                {errors.photo.message}
              </span>
            )}
          </label>
        </div>

        {/* Name Field */}
        <div className="form-control w-full">
          <label className="label font-bold text-accent">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            className={`input input-bordered w-full rounded-xl focus:outline-primary ${
              errors.name ? "border-red-500" : ""
            }`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name?.type === "required" && (
            <span className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-control w-full">
          <label className="label font-bold text-accent">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="input input-bordered w-full rounded-xl focus:outline-primary"
            {...register("email", { required: "Email is required" })}
          />

          {errors.email?.type === "required" && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="form-control w-full">
          <label className="label font-bold text-accent">Password</label>
          <input
            type="password"
            placeholder="Min 6 characters"
            className="input input-bordered w-full rounded-xl focus:outline-primary"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Too short!" },
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
          />
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Must have at least one uppercase, at least one lowercase, at least
              one number, at least one special characters.{" "}
            </p>
          )}
        </div>

        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-dark-gray font-bold text-lg rounded-xl h-14 shadow-lg mt-4"
        >
          Register
        </button>

        <p className="flex items-center gap-2.5 text-granite-gray mt-4">
          <span>Already have an account?</span>{" "}
          <Link to="/signin" className="text-accent font-bold hover:underline">
            Login
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
          <FcGoogle size="20" /> <span>Register with google</span>
        </button>
      </form>
    </div>
  );
};

export default Register;
