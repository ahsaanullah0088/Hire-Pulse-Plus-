import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/blogs/${id}`);
        setBlog(data);
      } catch (err) {
        setError("Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading blog...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  if (!blog) return null;

  return (
    <section className="py-10 px-4 md:px-20 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {blog.title}
          </h1>

          <hr className="mb-6 border-gray-300" />

          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {blog.longDescription}
          </p>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/blogs")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              ← Back to All Blogs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
