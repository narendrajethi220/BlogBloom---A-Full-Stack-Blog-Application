import { useState, useRef, useEffect } from "react";
import { IconContext } from "react-icons/lib";
import { RiFolderUploadFill } from "react-icons/ri";
import Quill from "quill";
import { blogCategories } from "../../assets/assets";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublisehd, setIsPublised] = useState(false);

  const generateContent = async () => {};

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-8 shadow rounded">
        <p className="text-md font-bold">Upload thumbnail</p>
        <label htmlFor="image">
          {!image ? (
            <IconContext.Provider
              value={{
                className:
                  "mt-2 text-md text-primary h-16 w-25 text-2xl p-4 rounded cursor-pointer border-1 border-dashed",
              }}
            >
              <RiFolderUploadFill />
            </IconContext.Provider>
          ) : (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="mt-2 h-16 rounded cursor-pointer"
            />
          )}
          <input
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-2"
            type="file"
            id="image"
            required
          />
        </label>

        <p className="mt-4 font-bold">Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className="mt-4 font-bold">Sub Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        <p className="mt-4 font-bold">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>

          <button
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        <p className="mt-5 font-bold">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <div className="flex gap-2 mt-4">
          <p className="font-bold">Publish Now</p>
          <input
            type="checkbox"
            checked={isPublisehd}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublised(e.target.checked)}
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
