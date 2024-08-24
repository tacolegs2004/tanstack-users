import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

import TanStackRouterDevtools from "./-components/router-devtools";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <>
        <nav className="sticky mx-10 mb-12 mt-4 flex items-center justify-center gap-4 rounded-md bg-slate-800 px-4 text-center text-3xl text-slate-200 md:mx-auto md:max-w-2xl md:px-12">
          {[
            ["Home", "/"],
            ["Users", "/users"],
            ["About", "/about"],
          ].map(([title, url]) => (
            <Link
              to={url}
              className="rounded-lg px-12 py-2 text-slate-200 duration-200 hover:text-slate-400 [&.active]:bg-slate-700"
            >
              {title}
            </Link>
          ))}
        </nav>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    ),
  },
);
