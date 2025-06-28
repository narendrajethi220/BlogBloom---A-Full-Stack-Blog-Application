import { IconContext } from "react-icons/lib";
import { RxCross2 } from "react-icons/rx";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    try {
      const { data } = await axios.delete(`/api/v1/blog/${blog._id}`);
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      const msg = err.response?.data.message || "Unable to Delete Blog";
      toast.error(msg);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/v1/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Error while Publishing Blog";
      toast.error(msg);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "UnPublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {blog.isPublished ? "UnPublish" : "Publish"}
        </button>
        <IconContext.Provider
          value={{
            className:
              "p-1 w-7 h-7 rounded-full hover:scale-110 transition-all cursor-pointer bg-red-100 text-red-300 ",
          }}
        >
          <RxCross2 onClick={deleteBlog} />
        </IconContext.Provider>
      </td>
    </tr>
  );
};

export default BlogTableItem;
