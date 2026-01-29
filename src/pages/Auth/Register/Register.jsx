import { p } from "motion/react-client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../../assets/image-upload-icon.png";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, signInWithGoogle, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(imageUpload);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  // console.log("in register", location);

  const IMGBB_API_KEY = import.meta.env.VITE_IMAGEBB_API_KEY;
  const hosting_url = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

  const handleRegistration = async (data) => {
    setIsSubmitting(true);
    try {
      // console.log("after register", data.photo[0]);
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await axios.post(hosting_url, formData);

      if (res.data.success) {
        const photoURL = res.data.data.display_url;

        await registerUser(data.email, data.password);

        await updateUserProfile(data.name, photoURL);

        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: photoURL,
        };

        const dbRes = await axiosSecure.post("/users", userInfo);
        if (dbRes.data.insertedId) {
          // console.log("user created in the database");
          toast.success("Account created successfully!");
          navigate(location.state || "/");
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error(err.response?.data?.error?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const userInfo = {
        email: result.user?.email,
        displayName: result.user?.displayName,
        photoURL: result.user?.photoURL,
      };

      await axiosSecure.post("/users", userInfo);

      toast.success("Logged in with Google!");
      navigate(location.state || "/");
    } catch (error) {
      console.error("Google login error:", err);
      toast.error("Failed to login with Google");
    }
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
                src={preview}
                alt="Upload"
                className="w-full h-full object-contain"
              />
            </div>
            <input
              type="file"
              id="image_input"
              accept="image/*"
              className="hidden"
              {...register("photo", {
                required: "Photo is required",
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) setPreview(URL.createObjectURL(file));
                },
              })}
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
        <div className="form-control w-full relative">
          <label className="label font-bold text-accent">Password</label>
          <input
            type={show ? "text" : "password"}
            placeholder="Min 6 characters"
            className="input input-bordered w-full rounded-xl focus:outline-primary"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Too short!" },
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="cursor-pointer absolute right-4 top-1/2"
          >
            {show ? <FaEye /> : <FaEyeSlash />}{" "}
          </button>
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Must have at least one uppercase, at least one lowercase, at least
              one number, at least one special characters.{" "}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full text-dark-gray font-bold text-lg rounded-xl h-14 shadow-lg mt-4"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Register"
          )}
        </button>

        <p className="flex items-center gap-2.5 text-granite-gray mt-4">
          <span>Already have an account?</span>{" "}
          <Link
            state={location.state}
            to="/signin"
            className="text-accent font-bold hover:underline"
          >
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
