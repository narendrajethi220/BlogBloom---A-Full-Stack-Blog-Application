import { IconContext } from "react-icons/lib";
import { RxCross2 } from "react-icons/rx";

const BlogTableItem = ({blog,fetchBlogs, index}) => {

  const {title, createdAt}=blog;
  const BlogDate=new Date(createdAt);

  return (
    <tr className="border-y border-gray-300">
        <th className="px-2 py-4">{index}</th>
        <td className="px-2 py-4">{title}</td>
        <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
        <td className="px-2 py-4 max-sm:hidden">
            <p className={`${blog.isPublished ? 'text-green-600' : 'text-orange-700'}`}>
                {blog.isPublished ? 'Published' : 'UnPublished'}
            </p>
        </td>
    <td className="px-2 py-4 flex text-xs gap-3">
        <button className="border px-2 py-0.5 mt-1 rounded cursor-pointer">{blog.isPublished ? 'UnPublish' : 'Publish'}</button>
       <IconContext.Provider value={{className:"p-1 w-7 h-7 rounded-full hover:scale-110 transition-all cursor-pointer bg-red-100 text-red-300 "}}>
         <RxCross2 />
       </IconContext.Provider>
    </td>
    </tr>
  )
}

export default BlogTableItem