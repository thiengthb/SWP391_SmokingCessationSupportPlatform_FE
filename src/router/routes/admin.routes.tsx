import LazyLoad from "@/lazyload";
import { Navigate } from "react-router-dom";
import { Paths } from "../../constants/path";

const AdminDashboard = LazyLoad("./pages/dashboard/admin");
const BlogEditPage = LazyLoad("./pages/blog/management/tabs/edit");

export const adminRoutes = [
  { index: true, element: <Navigate to={Paths.ADMIN.DASHBOARD} /> },
  { path: Paths.ADMIN.DASHBOARD, element: <AdminDashboard /> },
  {
    path: Paths.ADMIN.MANAGEMENT.ROOT,
    children: [
      {
        index: true,
        element: <Navigate to={Paths.ADMIN.MANAGEMENT.BLOG.ROOT} />,
      },
      {
        path: Paths.ADMIN.MANAGEMENT.BLOG.ROOT,
        children: [
          {
            index: true,
            element: <Navigate to={Paths.ADMIN.MANAGEMENT.BLOG.MY_BLOG} />,
          },
          {
            path: Paths.ADMIN.MANAGEMENT.BLOG.MY_BLOG,
            element: <BlogEditPage />,
          },
          {
            path: Paths.ADMIN.MANAGEMENT.BLOG.CREATE,
            element: <BlogEditPage />,
          },
        ],
      },
    ],
  },
];
