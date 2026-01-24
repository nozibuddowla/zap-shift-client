import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingPage from "../../../../components/LoadingPage/LoadingPage";
import Swal from "sweetalert2";

const Payment = () => {
  const { parcelId } = useParams();
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
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <h2>
        Please pay ${parcel.cost} for: {parcel.parcelName}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary text-accent">
        Pay
      </button>
    </div>
  );
};

export default Payment;
