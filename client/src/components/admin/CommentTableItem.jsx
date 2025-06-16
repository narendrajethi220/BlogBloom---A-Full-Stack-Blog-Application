import { BsPatchCheckFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { MdDeleteForever } from "react-icons/md";

const CommentTableItem = ({comment, fetchComments}) => {
    
     const {blog, createdAt, _id}=comment;
     const blogDate=new Date(createdAt);
      
    return (
      <tr className="order-y border-gray-300">
        <td className="px-6 py-4">
          <b>Blog</b>: {blog.title}
          <br/>
          <br/>
          <b className="font-medium text-gray-600">Name</b>:{comment.name}
          <br/>
          <b className="font-medium text-gray-600">Comment</b>:{comment.content}
        </td>
        <td className="px-6 py-4 max-sm:hidden">
            {blogDate.toLocaleDateString()}
        </td>
        <td className="px-6 py-4">
            <div className="inline-flex items-center gap-4">
            {
                !comment.isApproved ?
              <IconContext.Provider value={{className:"text-xl hover:scale-110 transition-all cursor-pointer text-green-400"}}>
                 <BsPatchCheckFill />
              </IconContext.Provider> :<p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">Approved</p>    
             }
             <IconContext.Provider value={{className:"text-2xl hover:scale-110 transition-all cursor-pointer text-red-400"}}>
               <MdDeleteForever />
             </IconContext.Provider>

            </div> 

        </td>
      </tr>
  )
}

export default CommentTableItem