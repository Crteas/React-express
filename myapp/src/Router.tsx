import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorComponents from "./components/ErrorComponents";
import NotFound from "./components/NotFound";
import Book from "./screens/Book";
import Home from "./screens/Home";

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
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
