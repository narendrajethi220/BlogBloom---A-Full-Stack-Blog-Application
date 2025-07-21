import { BsPatchCheckFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { MdDeleteForever } from "react-icons/md";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  console.log(blog);
  const blogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/v1/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        data.error(data.message);
      }
    } catch (err) {
      const msg = err.response?.data.message || "Error in approving Comment";
      toast.error(msg);
    }
  };

  const deleteComment = async () => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    try {
      const { data } = await axios.delete(`/api/v1/admin/comment/${_id}`);
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      const msg = err.response?.data.message || "Error while deleting comment";
      toast.error(msg);
    }
  };

  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b>Blog</b>: {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b>:{comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b>:{comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {blogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <IconContext.Provider
              value={{
                className:
                  "text-xl hover:scale-110 transition-all cursor-pointer text-green-400",
              }}
            >
              <BsPatchCheckFill onClick={approveComment} />
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
            <MdDeleteForever onClick={deleteComment} />
          </IconContext.Provider>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
