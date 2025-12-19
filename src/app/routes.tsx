import { createBrowserRouter, Navigate } from "react-router-dom";

// layouts
import Layout from "./Layout";

// pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import { CollabHub } from "./pages/CollabHub";
import { Events } from "./pages/Events";
import { QnA } from "./pages/QnA";
import { Study } from "./pages/Study";
import { LostFound } from "./pages/LostFound";
import { UserProfile } from "./pages/UserProfile";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  /* ---------- AUTH ROUTES (NO LAYOUT) mane signup login e layout er kaaj nai and layout imports TopBotNav ---------- */
  {
    path: "/",
    element: <Navigate to="/signup" />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },

  /* ---------- APP ROUTES (WITH LAYOUT) ekhaner page gulay layout use korbo ---------- */
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/collab", element: <CollabHub /> },
      { path: "/events", element: <Events /> },
      { path: "/qna", element: <QnA /> },
      { path: "/study", element: <Study /> },
      { path: "/lost-and-found", element: <LostFound /> },
      { path: "/profile", element: <UserProfile /> }
    ]
  }
]);
