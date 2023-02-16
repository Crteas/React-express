import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorComponents from "./components/ErrorComponents";
import NotFound from "./components/NotFound";
import Book from "./screens/Book";
import Community from "./screens/Community";
import Edit from "./screens/Edit";
import Home from "./screens/Home";
import UploadPage from "./screens/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorComponents />,
      },
      {
        path: "/book",
        element: <Book />,
      },
      {
        path: "/upload",
        element: <UploadPage />,
      },
      { path: "/community/:id", element: <Community /> },
      { path: "/community/:id/edit", element: <Edit /> },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
