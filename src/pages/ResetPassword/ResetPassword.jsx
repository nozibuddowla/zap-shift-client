import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const actionCode = searchParams.get("oobCode");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!actionCode) {
      return toast.error("Invalid or expired reset link.");
    }

    try {
      await confirmPasswordReset(auth, actionCode, data.newPassword);
      toast.success("Password updated! You can now login.");
      navigate("/signin");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-[42px] font-black text-accent">
          Reset Password
        </h1>
        <p className="text-granite-gray">Login with ZapShift</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label font-bold text-accent">New Password</label>
          <input
            {...register("newPassword", {
              required: "Required",
              minLength: 6,
            })}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full rounded-xl"
          />
        </div>

        <div className="form-control">
          <label className="label font-bold text-accent">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword", {
              validate: (val) =>
                val === watch("newPassword") || "Passwords do not match",
            })}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full rounded-xl"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button className="btn btn-primary w-full bg-[#D4E96D] border-none text-black font-bold h-14 rounded-xl mt-4">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
