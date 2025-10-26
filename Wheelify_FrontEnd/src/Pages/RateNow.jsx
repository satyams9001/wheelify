import React, { useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const RateNowForm = ({
  bikeName = "KTM 200 Duke",
  ownerName = "Anshu Raj",
  bikeImg,
  bookingId,
  bikeId,
  onCancel,
  onSubmit,
}) => {
  const { token } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || review.trim() === "") {
      alert("Please provide both rating and review.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/create-rating",
        {
          bookingId,
          bikeId,
          rating,
          review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Rating submitted successfully!");
        onSubmit && onSubmit(response.data); // callback to refresh list or close form
      } else {
        alert(response.data.message || "Failed to submit rating.");
      }
    } catch (error) {
      console.error("Rating error:", error);
      alert(error.response?.data?.message || "Server error while submitting rating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Rate Your Experience</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-xl">
            &times;
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={bikeImg || "https://via.placeholder.com/80"}
            alt={bikeName}
            className="w-20 h-20 rounded object-cover"
          />
          <div>
            <h3 className="font-semibold">{bikeName}</h3>
            <p className="text-gray-500 text-sm">Owner: {ownerName}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="font-medium block mb-1">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${
                  (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="font-medium block mb-1">
            Review <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            rows={4}
            placeholder="Share your experience with this bike..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="border px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Rating"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateNowForm;
