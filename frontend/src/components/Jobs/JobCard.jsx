import { useNavigate } from "react-router-dom";

const JobCard = ({ _id, title, company, applyLink, description }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    if (!_id) return;
    navigate(`/job/${_id}`);
  };

  return (
    <div
      className="
        w-90 max-w-sm md:max-w-md 
        bg-white rounded-2xl shadow-sm 
        border border-gray-200 
        hover:shadow-lg hover:border-blue-500 
        transition-all duration-300 
        flex flex-col justify-between 
        p-6 h-[200px] md:h-[230px]
      "
    >
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-1">
          {title}
        </h2>
        {company && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-1">
            {company}
          </p>
        )}
        <p className="text-gray-600 text-sm md:text-base mt-3 line-clamp-4">
          {description}
        </p>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={goToDetails}
          className="
            bg-blue-600 text-white 
            px-5 py-2 
            rounded-lg 
            hover:bg-blue-700 
            transition-all duration-200 
            text-sm md:text-base
          "
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
