import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaHistory, FaRegCalendarAlt } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const userLocale = navigator.language || "en-US";

    const formattedDate = date.toLocaleDateString(userLocale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const formattedTime = date.toLocaleDateString(userLocale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const diffHours = Math.floor((new Date() - date) / 3600000);
    const isRecent = diffHours < 24;

    return {
      date: formattedDate,
      time: formattedTime,
      full: `${formattedDate} at ${formattedTime}`,
      isRecent,
    };
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="mb-6 flex items-center gap-3">
        <FaHistory className="text-4xl text-primary" />
        <h2 className="text-4xl font-bold">Payment History</h2>
      </div>

      <div className="stats shadow mb-6">
        <div className="stat">
          <div className="stat-title">Total Payments</div>
          <div className="stat-value text-primary">{payments.length}</div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-base-300 shadow-md">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 opacity-50">
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => {
                const dateTime = formatDateTime(payment.paidAt);
                return (
                  <tr key={payment._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="font-bold">{payment.parcelName}</div>
                      <div className="text-xs opacity-50 font-mono">
                        Tracking: {payment.trackingId || "N/A"}
                      </div>
                    </td>
                    <td className="font-mono text-sm">
                      {payment.transactionId}
                    </td>
                    <td className="font-semibold text-success">
                      ৳{payment.amount}
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex flex-col gap-1">
                          <div
                            className={`flex items-center gap-2 text-sm font-bold ${
                              dateTime.isRecent ? "text-primary" : ""
                            }`}
                          >
                            <FaRegCalendarAlt />
                            {dateTime.date}
                          </div>
                          <div className="text-xs opacity-60">
                            {dateTime.time}
                          </div>
                          {dateTime.isRecent && (
                            <div className="badge badge-xs badge-primary text-accent">
                              New
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-primary text-accent">
                        {payment.paymentStatus}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
