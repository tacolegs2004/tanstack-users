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
        <nav className="sticky mx-10 mb-12 mt-4 flex items-center justify-center gap-4 rounded-md bg-none text-center text-3xl font-semibold text-[#EF767A] md:mx-auto md:w-fit">
          {[
            ["Home", "/"],
            ["Users", "/users"],
            ["About", "/about"],
          ].map(([title, url]) => (
            <Link
              to={url}
              className="[& rounded-lg px-12 py-2 duration-200 hover:scale-105 hover:text-violet-400 [&.active]:bg-[#31AFD4]"
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
