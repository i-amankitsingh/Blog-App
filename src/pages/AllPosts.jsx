import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((response) => {
        if (response) {
          setPosts(response.documents);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Container>
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">All Posts</h1>

          <p className="mt-2 text-gray-500">
            Explore articles shared by the community
          </p>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>

            <p className="mt-4 text-gray-500">Loading posts...</p>
          </div>
        )}

        {/* No Posts */}
        {!loading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-4 text-6xl">📝</div>

            <h2 className="text-2xl font-semibold text-gray-800">
              No Blogs Available
            </h2>

            <p className="mt-2 text-gray-500 text-center">
              No blog posts have been published yet.
            </p>
          </div>
        )}

        {/* Posts */}
        {!loading && posts.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
