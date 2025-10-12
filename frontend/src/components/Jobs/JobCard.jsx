  import { useNavigate } from "react-router-dom";

  const JobCard = ({ _id, title, company, hrEmail, applyLink, description }) => {
    const navigate = useNavigate();

  const goToDetails = () => {
    console.log("ID:", _id);
    if (!_id) return;
    navigate(`/job/${_id}`);
  };


    return (
      <div className="w-96 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-500 transition-all duration-300 flex flex-col justify-between p-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        {company && <p>{company}</p>}
        <p className="text-gray-600 line-clamp-4">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <a href={`mailto:${hrEmail}`} className="text-blue-600 underline">{hrEmail}</a>
          <button
            onClick={goToDetails}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>
    );
  };

  export default JobCard;
