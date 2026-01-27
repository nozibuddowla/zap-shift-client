import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaBoxOpen } from "react-icons/fa";
import { FaMagnifyingGlass, FaCreditCard } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-base-content flex items-center gap-2">
            <FaBoxOpen className="text-primary" /> My Parcels
          </h2>
          <p className="text-gray-500 text-sm">
            Manage and track your delivery requests
          </p>
        </div>
        <div className="stats shadow bg-base-100 border border-base-300">
          <div className="stat px-8">
            <div className="stat-title text-xs uppercase font-bold tracking-wider">
              Total Bookings
            </div>
            <div className="stat-value text-primary text-2xl">
              {parcels.length}
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-base-300/50">
              <tr>
                <th>#</th>
                <th>Parcel Details</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Delivery</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No parcels found. Start by booking a new one!
                  </td>
                </tr>
              ) : (
                parcels.map((parcel, index) => (
                  <tr
                    key={parcel._id}
                    className="hover:bg-base-200/50 transition-colors"
                  >
                    <td className="font-bold text-gray-400">{index + 1}</td>
                    <td>
                      <div className="font-bold">{parcel.parcelName}</div>
                      <div className="text-xs opacity-50 font-mono uppercase">
                        {parcel._id.slice(-8)}
                      </div>
                    </td>
                    <td className="font-semibold text-base-content">
                      ৳{parcel.cost}
                    </td>
                    <td>
                      {parcel.paymentStatus === "paid" ? (
                        <div className="badge badge-success gap-1 text-white py-3 px-4">
                          <FaCreditCard size={12} /> Paid
                        </div>
                      ) : (
                        <Link to={`/dashboard/payment/${parcel._id}`}>
                          <button className="btn btn-outline btn-primary text-accent text-xs md:text-lg gap-1">
                            Pay Now
                          </button>
                        </Link>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge badge-ghost font-medium ${
                          parcel.deliveryStatus === "delivered"
                            ? "text-success"
                            : "text-warning"
                        }`}
                      >
                        {parcel.deliveryStatus || "pending"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="btn btn-square btn-ghost btn-sm tooltip"
                          data-tip="Track"
                        >
                          <FaMagnifyingGlass className="text-info" />
                        </button>

                        {/* Disable edit/delete if paid */}
                        {parcel.paymentStatus !== "paid" ? (
                          <>
                            <button
                              className="btn btn-square btn-ghost btn-sm tooltip"
                              data-tip="Update"
                            >
                              <FaEdit className="text-warning" />
                            </button>
                            <button
                              onClick={() => handleParcelDelete(parcel._id)}
                              className="btn btn-square btn-ghost btn-sm tooltip"
                              data-tip="Cancel"
                            >
                              <MdDelete className="text-error" />
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] italic text-gray-400">
                            Locked
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
