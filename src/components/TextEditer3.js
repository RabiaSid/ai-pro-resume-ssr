import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const TextEditor3 = ({ contentHtml, value, InputClass }) => {
    const handleContentChange = (content) => {
        contentHtml(content);
    };

    const editorOptions = {
        buttonList: [
            ["undo", "redo"],
            ["font", "fontSize"],
            ["bold", "underline", "italic", "strike", "subscript", "superscript"],
            ["fontColor", "hiliteColor"],
            ["align", "list", "lineHeight"],
            ["outdent", "indent"],
            ["table", "horizontalRule", "link", "image", "video"],
            ["preview", "print"],
            ["removeFormat"]
        ],
        defaultTag: "div",
        minHeight: "200px",
        showPathLabel: false,
    };

    return (
        <div>
            <SunEditor
                className={InputClass ? InputClass : "h-[200px]"}
                setContents={value}
                onChange={handleContentChange}
                setOptions={editorOptions}
                placeholder="Write your content ...."
            />
        </div>
    );
};

export default TextEditor3;
