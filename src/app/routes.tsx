import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";
import { NotFound } from "./pages/NotFound";

import { Home } from "./pages/Home";
import { CollabHub } from "./pages/CollabHub";
import { Events } from "./pages/Events";
import { QnA } from "./pages/QnA";
import { Study } from "./pages/Study";
import { LostFound } from "./pages/LostFound";
import { UserProfile } from "./pages/UserProfile";

export const router =
  createBrowserRouter([
    {//need to modify this so that first ei feed na, first e login
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <Home /> },
        //every post under collab, events, lostfound and qna must have a link like uije "/abcshskdjhsjda" random ass link gulo otherwise uniquely identify kora possible na
        { path: "/collab", element: <CollabHub /> },
        { path: "/events", element: <Events /> },
        { path: "/qna", element: <QnA /> },
        { path: "/study", element: <Study /> }, //need to implement support for 1-1,1-2,2-1.. etc etc for EVERY department and EVERY batch, final route could be something like "localhost:5173/study/cse-23/1-1" -> dynamic link? dekhte hobe...
        { path: "/lost-and-found", element: <LostFound /> },
        {path: "/profile", element: <UserProfile />}
      ]
    }

  ]
)
