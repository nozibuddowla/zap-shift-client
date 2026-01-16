import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const { register, handleSubmit } = useForm({
    defaultValues: { email: location.state?.email || "" },
  });

  const onSubmit = async (data) => {
    try {
      await resetPassword(data.email);
      toast.success("Reset link sent! Please check your email. ");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-[42px] font-black text-accent">
          Forgot Password
        </h1>
        <p className="text-granite-gray">
          Enter your email and we'll send a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary w-full bg-[#D4E96D] border-none text-black">
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
