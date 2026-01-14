import React from "react";
import { FaQuoteLeft, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import reviewQuote from "../../../assets/reviewQuote.png";

const ReviewCard = ({ reviewInfo }) => {
  const { userName, user_photoURL, review, ratings, date } = reviewInfo;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-pale p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex flex-col h-full relative group hover:shadow-xl hover:border-primary/60 transition-all duration-500">
      {/* Quote Icon */}
      <div className="absolute top-5 right-8 text-primary/5 group-hover:text-primary/10 transition-colors">
        <img src={reviewQuote} alt="" />
      </div>

      {/* Star Rating & Value */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex text-sm">{renderStars(ratings)}</div>
        <span className="text-sm font-bold text-accent bg-pale px-2 py-0.5 rounded-lg">
          {ratings}
        </span>
      </div>

      {/* Feedback Text */}
      <p className="text-granite-gray font-medium text-base leading-relaxed mb-8 flex-1 italic">
        "{review}"
      </p>

      {/* Profile Section */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-dashed border-accent">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src={user_photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                alt={userName}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online status dot often seen in Figma */}
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          <div>
            <h4 className="font-bold text-accent text-lg leading-tight group-hover:text-primary transition-colors">
              {userName}
            </h4>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
