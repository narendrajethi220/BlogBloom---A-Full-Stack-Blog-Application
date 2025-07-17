import { assets } from "../assets/assets";

const AppLogo = () => {
  return (
    <div
      onClick={() => (window.location.href = "/")}
      className="flex justify-between items-center cursor-pointer mt-[-2%] mb-[2%] "
    >
      <img
        src={assets.IconBlog}
        alt="Logo"
        className="w-9 sm:w-12 mr-[-.2rem] hover:scale-110 transition-all "
      />
      <p className="text-zinc-800 font-bold text-2xl sm:text-3xl">logBloom</p>
    </div>
  );
};

export default AppLogo;
