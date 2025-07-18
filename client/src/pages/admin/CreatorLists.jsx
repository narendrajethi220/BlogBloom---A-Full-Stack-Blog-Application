import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import CreatorTableItem from "../../components/admin/CreatorTableItem";

const CreatorLists = () => {
  const [creatorsData, setCreatorData] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const { axios } = useAppContext();

  const fetchCreators = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/creators");
      if (data.success) {
        setCreatorData(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      const msg = err.response?.data.message || "Unable to Fetch Comment Data";
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Creators</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Not Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {creatorsData
              .filter((creator) => {
                if (filter === "Approved") return creator.isApproved === true;
                else return creator.isApproved === false;
              })
              .map((creator, index) => (
                <CreatorTableItem
                  key={creator._id}
                  creator={creator}
                  index={index + 1}
                  fetchCreators={fetchCreators}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatorLists;
