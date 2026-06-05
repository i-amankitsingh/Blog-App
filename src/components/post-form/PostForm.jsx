import React, { useCallback } from "react";
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
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log("Post: ", post);
  const submit = async (data) => {
    console.log("Data ", data);
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
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

                  <div className="rounded-2xl border-2 border-dashed border-gray-300 p-4">
                    <Input
                      type="file"
                      accept="image/png, image/jpg, image/jpeg, image/gif"
                      {...register("image", {
                        required: !post,
                      })}
                    />
                  </div>
                </div>

                {post && (
                  <div>
                    <p className="mb-3 text-sm font-medium text-gray-700">
                      Current Image
                    </p>

                    <div className="overflow-hidden rounded-2xl border border-gray-200">
                      <img
                        src={appwriteService.getFilePreview(post.image)}
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
                  <Button
                    type="submit"
                    className={`w-full rounded-2xl py-4 text-base font-semibold text-white transition-all duration-200 ${
                      post
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-black hover:bg-gray-800"
                    }`}
                  >
                    {post ? "Update Article" : "Publish Article"}
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
