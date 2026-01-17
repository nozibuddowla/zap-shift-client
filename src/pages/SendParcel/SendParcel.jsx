import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleParcel = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 p-5 md:p-10 shadow-2xl">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-accent text-3xl md:text-5xl font-black mb-4">
          Send A Parcel
        </h2>
        <p className="text-accent text-[28px] font-extrabold">
          Enter your parcel details
        </p>
      </div>

      <div className="divider my-8"></div>

      <form onSubmit={handleSubmit(handleParcel)}>
        {/* Parcel Type Selection */}
        <div className="mb-10">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                className="radio radio-primary group-hover:scale-110 transition-transform"
                defaultChecked
              />
              <span className="text-dark-gray font-medium">Document</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                {...register("parcelType")}
                value="not-document"
                className="radio radio-primary group-hover:scale-110 transition-transform"
              />
              <span className="text-dark-gray font-medium">Not-Document</span>
            </label>
          </div>
        </div>

        {/* parcel info: name, weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="form-control">
            <label className="label font-bold text-[#0F172A] text-sm ">
              Parcel Name
            </label>
            <input
              type="text"
              {...register("parcelName", { required: "Name is required" })}
              className="input input-bordered rounded-xl h-14 focus:outline-primary bg-gray-50/50"
              placeholder="e.g. Birthday Gift"
            />
          </div>

          <div className="form-control">
            <label className="label font-bold text-accent">
              Parcel Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              {...register("parcelWeight", { required: true })}
              className="input input-bordered rounded-xl h-14 focus:outline-primary bg-gray-50/50"
              placeholder="0.5"
            />
          </div>
        </div>

        <div className="divider my-8"></div>

        {/* Sender & Receiver Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender Column */}
          <div className="space-y-6">
            <h3 className="text-primary text-xl font-black flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                1
              </span>
              Sender Details
            </h3>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label font-bold text-accent text-sm">
                  Sender Name
                </label>
                <input
                  {...register("senderName")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Sender Name"
                />
              </div>

              <div className="form-control fieldset">
                <label className="label font-bold text-accent text-sm">
                  Address
                </label>
                <input
                  {...register("address")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Address"
                />
              </div>

              <div className="form-control">
                <label className="label text-sm text-accent font-bold ">
                  Sender Phone No
                </label>
                <input
                  {...register("senderPhoneNo")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="+880"
                />
              </div>

              <div className="form-control">
                <label className="label text-sm text-accent font-bold ">
                  Your District
                </label>
                <input
                  {...register("yourDistrict")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Your District"
                />
              </div>

              <div className="form-control">
                <label className="label text-sm font-bold text-accent">
                  Pickup Instruction
                </label>
                <textarea
                  {...register("pickupInstruction")}
                  className="textarea textarea-bordered rounded-xl bg-gray-50/30 h-24"
                  placeholder="Pickup Instruction"
                />
              </div>
            </div>
          </div>

          {/* Receiver Column */}
          <div className="space-y-6">
            <h3 className="text-accent text-xl font-black flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">
                2
              </span>
              Receiver Details
            </h3>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label text-sm font-bold text-accent">
                  Receiver Name
                </label>
                <input
                  {...register("receiverName")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Receiver's Name"
                />
              </div>
              <div className="form-control">
                <label className="label text-sm font-bold text-accent">
                  Receiver Address
                </label>
                <input
                  {...register("receiverAddress")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Receiver Address"
                />
              </div>
              <div className="form-control">
                <label className="label text-sm font-bold text-accent">
                  Receiver Contact No
                </label>
                <input
                  {...register("receiverContactNo")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="+880"
                />
              </div>

              <div className="form-control">
                <label className="label text-sm text-accent font-bold ">
                  Receiver District
                </label>
                <input
                  {...register("receiverDistrict")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Receiver District"
                />
              </div>
              <div className="form-control">
                <label className="label text-sm font-bold text-accent">
                  Pickup Instruction
                </label>
                <textarea
                  {...register("pickupInstruction")}
                  className="textarea textarea-bordered rounded-xl bg-gray-50/30 h-24"
                  placeholder="Pickup Instruction"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 p-3 md:p-6 bg-primary/10 rounded-2xl border border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-dark-gray font-medium italic text-sm">
            <span className="text-primary font-bold mr-2">ℹ</span>
            Pickup Time: 4pm - 7pm Approx.
          </p>
          <button
            type="submit"
            className="btn btn-primary px-5 lg:px-10 py-8 text-dark-gray font-bold text-sm lg:text-lg rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
