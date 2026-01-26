import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingPage from "../../../../components/LoadingPage/LoadingPage";
import { FaCheckCircle, FaReceipt, FaTruck } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get("session_id");
  // console.log(sessionId);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          // console.log(res.data);
          setPaymentInfo(res.data);
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure]);

  if (loading) return <LoadingPage />;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border-t-4 border-green-500">
        <div className="card-body items-center text-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
          <h2 className="card-title text-3xl font-bold">Payment Received!</h2>
          <p className="text-gray-500">Thank you for choosing zapShift.</p>

          <div className="divider">Details</div>

          <div className="w-full space-y-3 text-left">
            <div className="flex justify-between items-center bg-base-200 p-3 rounded-lg">
              <span className="flex items-center gap-2 font-semibold">
                <FaReceipt /> Transaction
              </span>
              <span className="text-xs font-mono">
                {paymentInfo?.transactionId}
              </span>
            </div>
            <div className="flex justify-between items-center bg-primary/10 p-3 rounded-lg border border-primary/20">
              <span className="flex items-center gap-2 font-semibold text-accent">
                <FaTruck /> Tracking ID
              </span>
              <span className="font-bold text-accent">
                {paymentInfo?.trackingId}
              </span>
            </div>
          </div>

          <div className="card-actions mt-6 w-full">
            <Link
              to="/dashboard/my-parcels"
              className="btn btn-primary text-accent w-full"
            >
              Back to My Parcels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
