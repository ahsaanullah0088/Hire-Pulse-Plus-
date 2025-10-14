import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/blogSlice";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading blogs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error.message || "Something went wrong!"}
      </div>
    );
  }

  return (
    <section className="py-10 px-4 md:px-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">All Blogs</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ← Back to Home
        </button>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No blogs available yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {blog.shortDescription.slice(0, 150)}...
                </p>
                <button
                  onClick={() => navigate(`/blogs/${blog._id}`)}

                  className="text-blue-600 font-semibold hover:underline"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllBlogs;
