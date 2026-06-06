import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import appwriteService from "../appwrite/config";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              automatic_uploads: true,
              file_picker_types: "image",

              file_picker_callback: async (callback, value, meta) => {
                if (meta.filetype === "image") {
                  const input = document.createElement("input");

                  input.setAttribute("type", "file");
                  input.setAttribute("accept", "image/*");

                  input.onchange = async () => {
                    const file = input.files[0];

                    try {
                      const uploadedFile =
                        await appwriteService.uploadFile(file);

                      const imageUrl = appwriteService.getFilePreview(
                        uploadedFile.$id,
                      )?.href;

                      callback(imageUrl, {
                        title: file.name,
                      });
                    } catch (error) {
                      console.error(error);
                    }
                  };

                  input.click();
                }
              },
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
