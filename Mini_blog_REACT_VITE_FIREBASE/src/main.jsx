import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";


import App from "./App";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import About from "./routes/About";
import Login from "./routes/Login/Login";
import Register from "./routes/Login/Register";
import Dashboard from "./routes/Dashboard";
import CreatePost from "./routes/CreatePost";
import Search from "./routes/Search";
import Post from "./routes/Post";
import EditPost from "./routes/EditPost";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login", 
        element:<Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/createpost",
        element: <CreatePost />,
      },
      {
        path: '/search',
        element: <Search/>,
      },
      {
        path: '/posts/:id',
        element: <Post/>,
      },
      {
        path: '/posts/edit/:id',
        element: <EditPost/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
     <RouterProvider router={router} />
    
  </React.StrictMode>
);