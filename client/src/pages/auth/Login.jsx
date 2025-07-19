import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import AppLogo from "../../components/AppLogo";

const Login = () => {
  const { navigate, axios, setToken } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/creator/login", {
        email,
        password,
      });
      if (data.success) {
        const { token, user } = data;
        setToken(token);
        localStorage.setItem("token", token);

        axios.defaults.headers.common["Authorization"] = token;
        toast.success("Login successfull!");

        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "creator") {
          navigate("/creator");
        } else {
          navigate("/login");
          setEmail("");
          setPassword("");
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
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
              <span className="text-primary">User</span> Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="Enter your Email"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="Enter your Password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <div className="mb-[1rem]">
              <p>
                Got something to say?
                <button
                  onClick={() => navigate("/register")}
                  className="text-primary px-2 font-bold cursor-pointer hover:text-lg transition-all ease-in-out"
                >
                  Register Now
                </button>
                and start creating.
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
