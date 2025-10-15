import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLimitedBlogs } from "../../redux/blogSlice";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { limitedBlogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchLimitedBlogs());
  }, [dispatch]);

  return (
    <section className="py-10 px-4 md:px-10 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Latest Blogs
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {limitedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* ✅ Fixed image container */}
              <div className="w-full h-56 md:h-64 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-5 flex flex-col justify-between h-[220px]">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {blog.shortDescription.slice(0, 100)}...
                  </p>
                </div>
                <button
                  onClick={() => navigate("/blogs")}
                  className="text-blue-600 font-semibold hover:underline mt-auto"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/blogs")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          See More
        </button>
      </div>
    </section>
  );
};

export default Blogs;
