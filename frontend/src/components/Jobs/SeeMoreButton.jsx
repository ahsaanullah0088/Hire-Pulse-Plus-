import React from "react";
import { useNavigate } from "react-router-dom";

const SeeMoreButton = ({ text = "See More Jobs", link = "allUserJobs" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-3 bg-gray-100 text-gray-700 text-base font-medium rounded-lg hover:bg-gray-200 transition-all"
    >
      {text}
    </button>
  );
};

export default SeeMoreButton;
