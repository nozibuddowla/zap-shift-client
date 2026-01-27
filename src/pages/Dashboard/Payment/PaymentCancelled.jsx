import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle, FaArrowLeft, FaHeadset } from "react-icons/fa";

const PaymentCancelled = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 bg-base-200/50">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border-t-4 border-warning">
        <div className="card-body items-center text-center">
          {/* Warning Icon */}
          <div className="p-4 bg-warning/10 rounded-full mb-4">
            <FaExclamationTriangle className="text-warning text-6xl animate-pulse" />
          </div>

          <h2 className="card-title text-3xl font-bold text-base-content">
            Payment Cancelled
          </h2>
          <p className="text-gray-500 mt-2">
            It looks like the payment process was interrupted or cancelled. No
            worries, your parcel details are still saved!
          </p>

          <div className="divider">What would you like to do?</div>

          <div className="flex flex-col w-full gap-3">
            {/* Primary Action */}
            <Link to="/dashboard/my-parcels" className="w-full">
              <button className="btn btn-warning btn-block text-white shadow-md">
                <FaArrowLeft /> View My Parcels
              </button>
            </Link>

            {/* Secondary Action/Support */}
            <button
              onClick={() => window.open("mailto:support@zapshift.com")}
              className="btn btn-outline btn-sm border-base-300 gap-2"
            >
              <FaHeadset /> Contact Support
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-6 italic">
            If you encountered an error, please try using a different payment
            method.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
