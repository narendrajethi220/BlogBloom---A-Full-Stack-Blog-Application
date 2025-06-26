import { assets } from "../assets/assets";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    // <div className="flex justify-between items-center py-5 mx-8 sm:mx-10 xl:mx-30">
    <div className="fixed top-0 left-0 w-[90%] bg-white/90 backdrop-blur-sm z-[99] border-b border-gray-200 flex justify-between items-center py-3 mx-8 sm:mx-10 xl:mx-15 ">
      <div
        onClick={() => navigate("/")}
        className="flex justify-between items-center cursor-pointer"
      >
        <img
          src={assets.IconBlog}
          alt="Logo"
          className="w-10 sm:w-12 mr-[-.3rem] hover:scale-110 transition-all "
        />
        <p className="text-zinc-800 text-3xl font-bold">logBloom</p>
      </div>
      <button
        onClick={() => navigate("/admin")}
        className="flex justify-between items-center gap-2 rounded-full cursor-pointer bg-primary text-white px-4 py-1 hover:bg-dark transition duration-300 ease-in-out"
      >
        {token ? "Dashboard" : "Login"}
        <FaArrowRightLong />
      </button>
    </div>
  );
};

export default Navbar;
