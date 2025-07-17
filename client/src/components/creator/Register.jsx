import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import AppLogo from "../AppLogo";

const Register = () => {
  const { navigate, axios } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        name,
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message, {
          duration: 4000,
        });
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
      const msg = err.response?.data?.message || "Unable to Register";
      toast.error(msg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AppLogo />
      <div className="w-full max-w-md p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold mb-1">
              <span className="text-primary">Creator</span> Registration
            </h1>
            <p className="font-light">
              Enter following details to register as a creator
            </p>
          </div>
          <form
            onSubmit={handleRegistration}
            className="mt-6 w-full sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label>Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
                placeholder="Enter your Name"
                className="border-b-2 border-gray-300 outline-none mb-6"
              />
            </div>
            <div className="flex flex-col">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="Enter your Email"
                className="border-b-2 border-gray-300 outline-none mb-6"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="Enter your Name"
                className="border-b-2 border-gray-300 outline-none mb-6"
              />
            </div>
            <div className="mb-[1rem]">
              <p>
                Already a creator?
                <button
                  onClick={() => navigate("/admin")}
                  className="text-primary px-2 font-bold cursor-pointer hover:text-lg transition-all ease-in-out"
                >
                  Login
                </button>
                and start creating.
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
