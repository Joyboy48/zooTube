import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import VideoDetail from "./pages/VideoDetail";
import ChannelProfile from "./pages/ChannelProfile";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import LikedVideos from "./pages/LikedVideos";
import Subscriptions from "./pages/Subscriptions";
import Shorts from "./pages/Shorts";
import PlaylistDetail from "./pages/PlaylistDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public Pages — no login needed */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/c/:username" element={<ChannelProfile />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/playlist/:id" element={<PlaylistDetail />} />

            {/* Private Pages — login required */}
            <Route element={<ProtectedRoute />}>
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/history" element={<History />} />
              <Route path="/liked" element={<LikedVideos />} />
              <Route path="/channel" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
