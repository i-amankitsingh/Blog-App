import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";

function PostCard({ $id, title, slug, image, content }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const imageUrl = image
    ? appwriteService.getFilePreview(image)?.href
    : "https://placehold.co/600x400?text=Blog+Image";

  const previewText = content?.replace(/<[^>]*>/g, "")?.substring(0, 120);

  const handleDelete = async () => {
    const deleted = await appwriteService.deletePost($id);

    if (deleted) {
      if (image) {
        await appwriteService.deleteFile(image);
      }

      navigate("/all-posts");
    }
  };

  return (
    <div
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      border
      border-gray-200
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      flex
      flex-col
      h-full
    "
    >
      <Link to={`/post/${$id}`}>
        <img
          src={imageUrl}
          alt={title}
          className="
          w-full
          h-56
          object-cover
        "
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400?text=Image+Unavailable";
          }}
        />
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/post/${$id}`}>
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
            {title}
          </h2>

          <p className="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-3">
            {previewText}
          </p>
        </Link>

        <div className="mt-auto pt-6 flex gap-3">
          <button
            onClick={() => navigate(`/edit-post/${$id}`)}
            className="
            flex-1
            py-2.5
            rounded-xl
            bg-black
            text-white
            font-medium
            hover:bg-gray-800
            transition
          "
          >
            Edit
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="
    flex-1
    py-2.5
    rounded-xl
    bg-red-50
    text-red-600
    font-medium
    hover:bg-red-100
    transition
  "
          >
            Delete
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900">Delete Post</h3>

            <p className="mt-3 text-gray-600">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="
            flex-1
            py-2.5
            rounded-xl
            border
            border-gray-300
            hover:bg-gray-100
            transition
          "
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="
            flex-1
            py-2.5
            rounded-xl
            bg-red-600
            text-white
            hover:bg-red-700
            transition
          "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCard;
