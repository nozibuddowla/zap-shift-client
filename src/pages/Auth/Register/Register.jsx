import { p } from "motion/react-client";
import React from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../../assets/image-upload-icon.png";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => console.log(data);

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
              {...register("photo")}
            />
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
          {errors.name && (
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

          {errors.email && (
            <p className="text-red-500">
              {errors.email.message}
            </p>
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

        <p className="text-center text-sm text-granite-gray mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-accent font-bold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
