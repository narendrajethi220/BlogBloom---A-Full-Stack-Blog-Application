import { BsPatchCheckFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { MdDeleteForever } from "react-icons/md";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CreatorTableItem = ({ creator, fetchCreators }) => {
  const { name, email, role, _id } = creator;

  const { axios } = useAppContext();

  const approveCreator = async () => {
    const confirm = window.confirm("Are you sure want to approve?");
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/v1/admin/approve-creator", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchCreators();
      } else {
        data.error(data.message);
      }
    } catch (err) {
      const msg = err.response?.data.message || "Error while approving Creator";
      toast.error(msg);
    }
  };

  const revokeCreator = async () => {
    const confirm = window.confirm("Are you sure want to revoke approval ?");
    if (!confirm) return;

    try {
      const { data } = await axios.post("/api/v1/admin/revoke-creator", {
        id: _id,
      });
      if (data.success) {
        toast(data.message);
        fetchCreators();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      const msg = err.response?.data.message || "Error while revoking approval";
      toast.error(msg);
    }
  };

  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4 max-sm:hidden">{email}</td>
      <td className="px-6 py-4 max-sm:hidden">{role}</td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!creator.isApproved ? (
            <IconContext.Provider
              value={{
                className:
                  "text-xl hover:scale-110 transition-all cursor-pointer text-green-400",
              }}
            >
              <BsPatchCheckFill onClick={approveCreator} />
            </IconContext.Provider>
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <IconContext.Provider
            value={{
              className:
                "text-2xl hover:scale-110 transition-all cursor-pointer text-red-400",
            }}
          >
            <MdDeleteForever onClick={revokeCreator} />
          </IconContext.Provider>
        </div>
      </td>
    </tr>
  );
};

export default CreatorTableItem;
