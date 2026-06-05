import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  //   return post ? (
  //     <div className="py-8">
  //       <Container>
  //         <PostForm post={post} />
  //       </Container>
  //     </div>
  //   ) : null;
  return post ? (
    <div className="min-h-screen bg-gray-50 py-10">
      <Container>
        <div
          className="
        max-w-5xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-gray-200
        overflow-hidden
      "
        >
          <div
            className="
          px-8
          py-8
          border-b
          border-gray-200
        "
          >
            <h1 className="text-4xl font-bold text-gray-900">Edit Blog Post</h1>

            <p className="mt-2 text-gray-500">
              Update your article and publish the latest changes.
            </p>
          </div>

          <div className="p-8">
            <PostForm post={post} />
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>

        <p className="mt-4 text-gray-500">Loading post...</p>
      </div>
    </div>
  );
}

export default EditPost;
