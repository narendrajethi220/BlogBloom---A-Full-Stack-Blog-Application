import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoIosAddCircle } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";

const CreatorSidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <NavLink
        end={true}
        to="/creator"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          } `
        }
      >
        <IconContext.Provider value={{ className: "text-2xl" }}>
          <TbLayoutDashboardFilled />
        </IconContext.Provider>
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink
        to="/creator/postBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          } `
        }
      >
        <IconContext.Provider value={{ className: "text-2xl" }}>
          <IoIosAddCircle />
        </IconContext.Provider>
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>

      <NavLink
        to="/creator/blogs"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          } `
        }
      >
        <IconContext.Provider value={{ className: "text-2xl" }}>
          <FaClipboardList />
        </IconContext.Provider>
        <p className="hidden md:inline-block">Blog Lists</p>
      </NavLink>
    </div>
  );
};

export default CreatorSidebar;
