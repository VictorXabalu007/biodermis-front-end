

import "react-quill/dist/quill.snow.css";
import ReactQuill, { ReactQuillProps } from "react-quill";

export const QuillInput = ({...rest}:ReactQuillProps) => {

    const myColors = [
        "purple",
        "#785412",
        "#452632",
        "#856325",
        "#963254",
        "#254563",
        "white"
      ];


    const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ align: ["right", "center", "justify"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          [{ color: myColors }],
          [{background: myColors}]
        ]
      };

      const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align"
      ];
      
 
    

      return (
        <>
         
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            {...rest}
          />
        </>
      );
   
    
}