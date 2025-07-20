import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import Comments from "./pages/admin/Comments";
import BlogLists from "./pages/admin/BlogLists";
import Register from "./pages/auth/Register";
import CreatorLists from "./pages/admin/CreatorLists";
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import CreatorLayout from "./pages/creator/CreatorLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import Login from "./pages/auth/Login";
import Loader from "./components/Loader";
import PostBlog from "./pages/creator/PostBlog";
import CreatorBlogLists from "./pages/creator/CreatorBlogLists";

const App = () => {
  const { token, isLoading } = useAppContext();
  if (isLoading) return <Loader />;
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/creator"
          element={token ? <CreatorLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<CreatorDashboard />} />
          <Route path="postBlog" element={<PostBlog />} />
          <Route path="blogs" element={<CreatorBlogLists />} />
        </Route>

        <Route
          path="/admin"
          element={token ? <AdminLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<BlogLists />} />
          <Route path="comments" element={<Comments />} />
          <Route path="creators" element={<CreatorLists />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
