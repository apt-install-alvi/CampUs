import { createBrowserRouter, Navigate } from "react-router";

import { Layout } from "./Layout";

import { Signup } from "./pages/Registration/Signup";
import { SignupOCR } from "./pages/Registration/SignupOCR";
import { Login } from "./pages/Registration/Login";
import { Login2FA } from "./pages/Registration/Login2FA";
import { Home } from "./pages/Home/Home";
import { CollabHub } from "./pages/CollabHub/CollabHub";
import  Events  from "./pages/Events/Events";
import QnA from "./pages/QnA/QnA";
import { Study } from "./pages/Study/Study";
import { LostFound } from "./pages/LostAndFound/LostFound";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { NotFound } from "./pages/Error_NotFound";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/signup" replace /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signup/ocr", element: <SignupOCR /> },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />, // handle login errors
  },
  {
    path: "/login/2fa/:userId",
    element: <Login2FA />,
    errorElement: <NotFound />,
  },

  /* ---------- APP ROUTES (WITH LAYOUT) ---------- */
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
      { path: "/profile", element: <UserProfile /> },
    ],
  },

  // Catch-all route
  { path: "*", element: <NotFound /> },
]);
