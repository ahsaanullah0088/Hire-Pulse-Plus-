import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../redux/blogSlice";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.blogs);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    // ✅ FormData for file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("image", image); // ✅ must match multer field name

    dispatch(createBlog(formData));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Short Description"
          className="w-full border p-2 rounded"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
        />

        <textarea
          placeholder="Long Description"
          className="w-full border p-2 rounded"
          rows="6"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Create Blog"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
