import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const Layout = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-[90%] bg-white/90 backdrop-blur-sm z-[99] border-b border-gray-200 flex justify-between items-center py-3 mx-8 sm:mx-10 xl:mx-15">
        <img
          src={assets.IconBlog}
          alt=""
          className="w-10 sm:w-12 mr-[-.3rem]"
          onClick={() => navigate("/")}
        />
        <button
          onClick={logout}
          className="flex justify-between items-center gap-2 rounded-full cursor-pointer bg-primary text-white px-4 py-1 hover:bg-dark transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
      <div className="flex h-[calc(98vh-70px)] mt-[5rem]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
