import { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";
import { LiaComments } from "react-icons/lia";
import { RiDraftLine } from "react-icons/ri";
import { LuPanelTopClose } from "react-icons/lu";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CreatorDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    recentBlogs: [],
    totalBlog: 0,
    totalComment: 0,
    drafts: 0,
  });

  const { axios } = useAppContext();

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/v1/creator/dashboardData");

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      const msg =
        err.response?.data.message || "Unable to Fetch Dashboard Data";
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-3 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <IconContext.Provider
            value={{
              className:
                " w-[4rem] h-auto text-3xl text-primary m-2 p-4 bg-primary/10 rounded",
            }}
          >
            <MdOutlinePlaylistAddCheckCircle />
          </IconContext.Provider>
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.totalBlog}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-3 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <IconContext.Provider
            value={{
              className:
                " w-[4rem] h-auto text-3xl text-primary m-2 p-4 bg-primary/10 rounded",
            }}
          >
            <LiaComments />
          </IconContext.Provider>
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.totalComment}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-3 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <IconContext.Provider
            value={{
              className:
                " w-[4rem] h-auto text-3xl text-primary m-2 p-4 bg-primary/10 rounded",
            }}
          >
            <RiDraftLine />
          </IconContext.Provider>
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <IconContext.Provider value={{ className: "text-2xl text-primary" }}>
            <LuPanelTopClose />
          </IconContext.Provider>
          <p>Latest Blogs</p>
        </div>
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scorllbar-hide bg-white">
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
              {dashboardData.recentBlogs.map((blog, index) => {
                return (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboardData}
                    index={index + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
