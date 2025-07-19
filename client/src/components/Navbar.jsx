import { assets } from "../assets/assets";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  const handleDashboardClick = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const role = decoded.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "creator") {
        navigate("/creator");
      } else {
        toast.error("Invalid role, please login again.");
        navigate("/login");
      }
    } catch (err) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
    }
  };

  return (
    // <div className="flex justify-between items-center py-5 mx-8 sm:mx-10 xl:mx-30">
    <div className="fixed top-0 left-0 w-[100%] bg-white/90 backdrop-blur-sm z-[99] border-b border-gray-200 flex justify-between items-center py-3 px-5 sm:px-10 xl:px-25 ">
      <div
        onClick={() => (window.location.href = "/")}
        className="flex justify-between items-center cursor-pointer"
      >
        <img
          src={assets.IconBlog}
          alt="Logo"
          className="w-9 sm:w-12 mr-[-.2rem] hover:scale-110 transition-all "
        />
        <p className="text-zinc-800 font-bold text-2xl sm:text-3xl">logBloom</p>
      </div>
      <button
        onClick={handleDashboardClick}
        className="flex justify-between items-center gap-2 rounded-full cursor-pointer bg-primary text-white px-4 py-1 hover:bg-dark transition duration-300 ease-in-out text-sm sm:text-[1rem]"
      >
        {token ? "Dashboard" : "Login"}
        <FaArrowRightLong />
      </button>
    </div>
  );
};

export default Navbar;
