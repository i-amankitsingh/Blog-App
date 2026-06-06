import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const [preview, setPreview] = useState(
    post?.image ? appwriteService.getFilePreview(post.image) : null,
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // const submit = async (data) => {
  //   if (post) {
  //     const file = data.image?.[0]
  //       ? await appwriteService.uploadFile(data.image[0])
  //       : null;

  //     if (file && post.image) {
  //       await appwriteService.deleteFile(post.image);
  //     }

  //     const dbPost = await appwriteService.updatePost(post.$id, {
  //       title: data.title,
  //       content: data.content,
  //       featuredImage: file ? file.$id : post.image,
  //       status: data.status,
  //     });

  //     if (dbPost) {
  //       navigate(`/post/${dbPost.$id}`);
  //     }
  //   } else {
  //     const file = await appwriteService.uploadFile(data.image[0]);

  //     if (!file) return;

  //     const dbPost = await appwriteService.createPost({
  //       title: data.title,
  //       slug: data.slug,
  //       content: data.content,
  //       featuredImage: file.$id,
  //       status: data.status,
  //       userId: userData.$id,
  //     });

  //     if (dbPost) {
  //       navigate(`/post/${dbPost.$id}`);
  //     }
  //   }
  // };

  const submit = async (data) => {
    try {
      setLoading(true);

      if (post) {
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file && post.image) {
          await appwriteService.deleteFile(post.image);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          featuredImage: file ? file.$id : post.image,
          status: data.status,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (!file) {
          setLoading(false);
          return;
        }

        const dbPost = await appwriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          featuredImage: file.$id,
          status: data.status,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            {post ? "Edit Article" : "Create New Article"}
          </h1>

          <p className="mt-2 text-gray-500">
            Share your ideas, stories and knowledge with the world.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submit)}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {/* Left Section */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-8 text-2xl font-semibold text-gray-800">
                Article Details
              </h2>

              <div className="space-y-6">
                <Input
                  label="Title"
                  placeholder="Enter article title..."
                  {...register("title", { required: true })}
                />

                <Input
                  label="Slug"
                  placeholder="article-slug"
                  {...register("slug", { required: true })}
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {
                      shouldValidate: true,
                    });
                  }}
                />

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Content
                  </label>

                  <RTE
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-800">
                Publish Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Featured Image
                  </label>

                  <div className="relative">
                    <label
                      htmlFor="image-upload"
                      className="
      flex
      flex-col
      items-center
      justify-center
      w-full
      h-64
      border-2
      border-dashed
      border-gray-300
      rounded-3xl
      cursor-pointer
      bg-gray-50
      hover:bg-gray-100
      transition-all
      duration-300
      group
    "
                    >
                      <svg
                        className="w-12 h-12 text-gray-400 group-hover:scale-110 transition"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                        />
                      </svg>

                      <p className="mt-4 text-lg font-medium text-gray-700">
                        Upload Featured Image
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Drag & Drop or Click to Browse
                      </p>

                      <p className="mt-2 text-xs text-gray-400">
                        PNG, JPG, JPEG, GIF
                      </p>
                    </label>

                    <input
                      id="image-upload"
                      type="file"
                      accept="image/png,image/jpg,image/jpeg,image/gif"
                      className="hidden"
                      {...register("image", {
                        required: !post,
                        onChange: (e) => {
                          const file = e.target.files?.[0];

                          if (file) {
                            setPreview(URL.createObjectURL(file));
                          }
                        },
                      })}
                    />
                  </div>
                  {preview && (
                    <div className="mt-5 overflow-hidden rounded-3xl border border-gray-200">
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-64 w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {post && (
                  <div>
                    <p className="mb-3 text-sm font-medium text-gray-700">
                      Current Image
                    </p>

                    <div className="overflow-hidden rounded-2xl border border-gray-200">
                      <img
                        src={appwriteService.getFilePreview(post.image)?.href}
                        alt={post.title}
                        className="h-56 w-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <Select
                    options={["active", "inactive"]}
                    {...register("status", {
                      required: true,
                    })}
                  />
                </div>

                <div className="pt-2">
                  {/* <Button
                    type="submit"
                    className={`w-full rounded-2xl py-4 text-base font-semibold text-white transition-all duration-200 ${
                      post
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-black hover:bg-gray-800"
                    }`}
                  >
                    {post ? "Update Article" : "Publish Article"}
                  </Button> */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full rounded-2xl py-4 text-base font-semibold text-white transition-all duration-200 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : post
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : "bg-black hover:bg-gray-800"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>
                          {post
                            ? "Updating Article..."
                            : "Publishing Article..."}
                        </span>
                      </div>
                    ) : post ? (
                      "Update Article"
                    ) : (
                      "Publish Article"
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold text-gray-800">Writing Tips</h3>

              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Use a clear and descriptive title.</li>
                <li>• Add a featured image for better engagement.</li>
                <li>• Keep paragraphs short and readable.</li>
                <li>• Review content before publishing.</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
