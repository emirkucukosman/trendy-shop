import { Suspense, Fragment, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthGuard from "src/components/AuthGuard";
import GuestGuard from "src/components/GuestGuard";
import MainLayout from "src/layouts/MainLayout";
import LoadingScreen from "src/components/LoadingScreen";

export const renderRoutes = (routes: any[] = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            exact={route.exact}
            path={route.path}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? renderRoutes(route.routes) : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes: any[] = [
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("./views/errors/NotFoundView")),
  },
  {
    path: "/account",
    layout: MainLayout,
    guard: GuestGuard,
    routes: [
      {
        exact: true,
        path: "/account/register",
        component: lazy(() => import("./views/account/RegisterView")),
      },
      {
        exact: true,
        path: "/account/login",
        component: lazy(() => import("./views/account/LoginView")),
      },
    ],
  },
  {
    path: "/profile",
    layout: MainLayout,
    guard: AuthGuard,
    routes: [
      {
        exact: true,
        path: "/profile",
        component: lazy(() => import("./views/profile/ProfileView")),
      },
    ],
  },
  {
    path: "/product",
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: "/product/:slug",
        component: lazy(() => import("./views/products/ProductsDetailsView")),
      },
    ],
  },
  {
    path: "/cart",
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: "/cart",
        component: lazy(() => import("./views/cart/CartView")),
      },
    ],
  },
  {
    exact: true,
    path: "/order-success",
    component: lazy(() => import("./views/cart/CartView/OrderSuccess")),
  },
  {
    path: "*",
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: "/",
        component: lazy(() => import("./views/products/ListProductsView")),
      },
      {
        exact: true,
        path: "/:category",
        component: lazy(() => import("./views/products/ListProductsView")),
      },
      {
        component: () => <Redirect to="/404" />,
      },
    ],
  },
];

export default routes;
