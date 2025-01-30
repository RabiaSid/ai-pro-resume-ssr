import React, { useEffect } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";

// Register the image resize module
Quill.register("modules/imageResize", ImageResize);

// Helper function to check if a URL is external
const isExternal = (url) => {
  try {
    const link = new URL(url);
    return link.hostname !== window.location.hostname;
  } catch (e) {
    return false;
  }
};

// Define the custom link format
const Link = Quill.import("formats/link");
class CustomLink extends Link {
  static create(value) {
    let node = super.create(value);
    if (isExternal(value)) {
      node.setAttribute("rel", "nofollow");
    } else {
      node.setAttribute("rel", "dofollow");
    }
    return node;
  }
}

const TextEditor = ({ contentHtml, value, InputClass }) => {
  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Ensure header options include level 3
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      [{ color: [] }],
    ],
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  const formats = [
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "header",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "video",
  ];

  useEffect(() => {
    // Register the custom link format
    Quill.register(CustomLink, true);
  }, []);

  const handleProcedureContentChange = (content) => {
    contentHtml(content);
  };

  return (
    <div>
      <ReactQuill
        className={InputClass ? InputClass : "h-[200px]"}
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="Write your content ...."
        onChange={handleProcedureContentChange}
        value={value}
      />
    </div>
  );
};

export default TextEditor;
