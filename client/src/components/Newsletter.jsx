import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Newsletter = () => {
  const { axios } = useAppContext();
  const [email, setEmail] = useState("");

  const handleSubscription = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/newsletter/subscribe", {
        email: email,
      });

      if (data.success) {
        toast.success("User subscribed to Newsletter!");
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Unable to Add Email to Newsletter!";
      toast.error(msg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>
      <form
        onSubmit={handleSubscription}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
      >
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
