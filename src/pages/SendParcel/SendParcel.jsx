import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderRegion: "",
      receiverRegion: "",
      senderDistrict: "",
      receiverDistrict: "",
    },
  });

  const serviceCenter = useLoaderData();
  const regionsDuplicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    if (!region || !serviceCenter) return [];
    return serviceCenter
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  const handleParcel = (data) => {
    // console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    // console.log(sameDistrict);
    const weight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (weight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = weight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : (extraWeight * 40) + 40;

        cost = minCharge + extraCharge;
      }
    }

    // console.log("cost", cost);
    Swal.fire({
      title: "Are you okay with the Cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-10 shadow-2xl">
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
          <div className="form-control fieldset">
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

          <div className="form-control fieldset">
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
              <div className="form-control fieldset">
                <label className="label font-bold text-accent text-sm">
                  Sender Name
                </label>
                <input
                  type="text"
                  {...register("senderName")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Sender Name"
                />
              </div>

              <div className="form-control fieldset">
                <label className="label font-bold text-accent text-sm">
                  Sender Email
                </label>
                <input
                  type="email"
                  {...register("senderEmail")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Sender Email"
                />
              </div>

              <div className="form-control fieldset">
                <label className="label font-bold text-accent text-sm">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Address"
                />
              </div>

              <div className="form-control fieldset">
                <label className="label text-sm text-accent font-bold ">
                  Sender Phone No
                </label>
                <input
                  type="tel"
                  {...register("senderPhoneNo")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="+880"
                />
              </div>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm text-accent font-bold">
                  Sender Region
                </legend>
                <select
                  {...register("senderRegion")}
                  defaultValue=""
                  className="select select-bordered"
                >
                  <option value="" disabled>
                    Select your Region
                  </option>
                  {regions.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </fieldset>

              {senderRegion && senderRegion !== "" && (
                <fieldset className="fieldset animate-in fade-in slide-in-from-top-2 duration-300">
                  <legend className="fieldset-legend text-sm text-accent font-bold">
                    Sender District
                  </legend>
                  <select
                    {...register("senderDistrict")}
                    defaultValue=""
                    className="select"
                  >
                    <option value="" disabled>
                      Select your District
                    </option>
                    {districtsByRegion(senderRegion).map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </fieldset>
              )}

              <div className="form-control fieldset">
                <label className="label text-sm font-bold text-accent">
                  Pickup Instruction
                </label>
                <textarea
                  type="text"
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
              <div className="form-control fieldset">
                <label className="label text-sm font-bold text-accent">
                  Receiver Name
                </label>
                <input
                  type="text"
                  {...register("receiverName")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Receiver's Name"
                />
              </div>

              <div className="form-control fieldset">
                <label className="label text-sm font-bold text-accent">
                  Receiver Email
                </label>
                <input
                  type="email"
                  {...register("receiverEmail")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Receiver's Email"
                />
              </div>

              <div className="form-control fieldset">
                <label className="label text-sm font-bold text-accent">
                  Receiver Address
                </label>
                <input
                  type="text"
                  {...register("receiverAddress")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="Receiver Address"
                />
              </div>

              <div className="form-control fieldset">
                <label className="label text-sm font-bold text-accent">
                  Receiver Contact No
                </label>
                <input
                  type="tel"
                  {...register("receiverContactNo")}
                  className="input input-bordered rounded-xl bg-gray-50/30"
                  placeholder="+880"
                />
              </div>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm text-accent font-bold">
                  Receiver Region
                </legend>
                <select
                  {...register("receiverRegion")}
                  defaultValue=""
                  className="select"
                >
                  <option value="" disabled>
                    Select your Region
                  </option>
                  {regions.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </fieldset>

              {receiverRegion && receiverRegion !== "" && (
                <fieldset className="fieldset animate-in fade-in slide-in-from-top-2 duration-300">
                  <legend className="fieldset-legend text-sm text-accent font-bold">
                    Receiver District
                  </legend>
                  <select
                    {...register("receiverDistrict")}
                    defaultValue="Select your District"
                    className="select"
                  >
                    <option value="" disabled>
                      Select your District
                    </option>
                    {districtsByRegion(receiverRegion).map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </fieldset>
              )}

              <div className="form-control fieldset">
                <label className="label text-sm font-bold text-accent">
                  Delivery Instruction
                </label>
                <textarea
                  type="text"
                  {...register("pickupInstruction")}
                  className="textarea textarea-bordered rounded-xl bg-gray-50/30 h-24"
                  placeholder="Pickup Instruction"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 p-3 md:p-6 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
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
