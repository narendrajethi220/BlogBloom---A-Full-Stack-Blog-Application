import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import BlogTableItem from "../../components/admin/BlogTableItem";
import toast from "react-hot-toast";

const CreatorBlogLists = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/creator/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Unable to fetch Blog";
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1 className="">All Blogs</h1>
      <div className="relative h-9/10  mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scorllbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => {
              return (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                  setBlogs={setBlogs}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatorBlogLists;
