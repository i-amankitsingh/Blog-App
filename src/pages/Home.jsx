import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((response) => {
        if (response) {
          setPosts(response.documents || []);
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-white">
        <Container>
          <div className="py-20 text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700 mb-6">
              🚀 Welcome to CodeBlog
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Share Your Ideas,
              <br />
              Stories & Knowledge
            </h1>

            <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
              Discover insightful articles, tutorials and stories written by
              developers, creators and passionate writers.
            </p>

            <div className="flex justify-center gap-8 mt-10">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {posts.length}
                </h3>
                <p className="text-gray-500">Articles</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">∞</h3>
                <p className="text-gray-500">Ideas</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
                <p className="text-gray-500">Reading</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Posts Section */}
      <section className="py-12">
        <Container>
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>

            <p className="text-gray-500 mt-2">
              Explore the latest articles from our community.
            </p>
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>

              <p className="mt-4 text-gray-500">Loading posts...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && posts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-200">
              <div className="text-6xl mb-4">📝</div>

              <h2 className="text-2xl font-bold text-gray-900">
                No Blogs Available
              </h2>

              <p className="text-gray-500 mt-2">
                Be the first one to publish a blog post.
              </p>
            </div>
          )}

          {/* Posts Grid */}
          {!loading && posts.length > 0 && (
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-8
              "
            >
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

export default Home;
