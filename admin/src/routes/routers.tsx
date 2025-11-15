import { createElement } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { Layout } from "@/components/layout";
import { type IRoute } from "@/types";
import { NotFoundPage } from "@/pages";
import { ProtectedRoute } from "./protected-route.tsx";
import { publicRoutes } from "./public-routes.ts";
import { authRoutes } from "./auth-routes.ts";
import { privateRoutes } from "./private-routes.ts";

const mapPublicRoutes = (routes: IRoute[]): RouteObject[] =>
  routes.map((route) => ({
    path: route.path,
    element: createElement(route.element),
  }));

const mapRoutes = (routes: IRoute[]): RouteObject => ({
  path: "/",
  element: <Layout />,
  children: routes.map((route) => ({
    path: route.path,
    element: (
      <ProtectedRoute allowRoles={route.allowRoles}>
        {createElement(route.element)}
      </ProtectedRoute>
    ),
  })),
});

export const routers = createBrowserRouter([
  ...mapPublicRoutes(publicRoutes),
  mapRoutes([...authRoutes, ...privateRoutes]),
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
