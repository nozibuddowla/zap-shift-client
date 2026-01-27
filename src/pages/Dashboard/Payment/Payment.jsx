import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import Swal from "sweetalert2";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaCreditCard,
  FaShieldAlt,
} from "react-icons/fa";

const Payment = () => {
  const { parcelId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const amount = parcel.cost ? parseInt(parcel.cost) : 0;
    if (amount <= 0) {
      Swal.fire("Error", "This parcel has no calculated cost!", "error");
      return;
    }

    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      successUrl: `${window.location.origin}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/dashboard/payment-cancelled`,
    };
    // console.log(paymentInfo);

    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );

      // console.log(res.data);

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire(
        "Error",
        "Something went wrong with the payment gateway.",
        "error",
      );
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-base-200/50">
      {/* Header Info */}
      <div className="w-full max-w-lg mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm gap-2"
        >
          <FaArrowLeft /> Back
        </button>
        <div className="badge badge-outline gap-2 p-3">
          <FaShieldAlt className="text-primary" /> Secure Checkout
        </div>
      </div>

      {/* Payment Card */}
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl overflow-hidden border border-base-300">
        <div className="bg-primary p-6 text-accent">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaCreditCard /> Checkout
          </h2>
          <p className="opacity-90">
            Complete your payment to ship your parcel
          </p>
        </div>

        <div className="card-body p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <FaBoxOpen size={30} />
            </div>
            <div>
              <p className="text-sm font-semibold opacity-60 uppercase tracking-wider">
                Parcel Name
              </p>
              <h3 className="text-xl font-bold">{parcel.parcelName}</h3>
            </div>
          </div>

          <div className="space-y-4 bg-base-200 p-6 rounded-2xl">
            <div className="flex justify-between items-center">
              <span className="text-lg">Delivery Charge</span>
              <span className="text-lg font-bold">${parcel.cost}</span>
            </div>
            <div className="flex justify-between items-center border-t border-base-300 pt-4">
              <span className="text-xl font-bold">Total Amount</span>
              <span className="text-2xl font-black text-primary">
                ${parcel.cost}
              </span>
            </div>
          </div>

          <div className="card-actions mt-8">
            <button
              onClick={handlePayment}
              className="btn btn-primary btn-block text-accent text-lg shadow-lg hover:shadow-primary/20 transition-all"
            >
              Pay Now with Stripe
            </button>
          </div>

          <p className="text-center text-xs mt-6 opacity-50 italic">
            By clicking "Pay Now", you agree to zapShift's shipping terms and
            conditions.
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 flex gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
          alt="Stripe"
          className="h-6"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
          alt="Visa"
          className="h-4"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
          alt="Mastercard"
          className="h-6"
        />
      </div>
    </div>
  );
};

export default Payment;
