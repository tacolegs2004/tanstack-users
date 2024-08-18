import React from "react";
import {
	createRootRouteWithContext,
	Link,
	Outlet,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";

import TanStackRouterDevtools from "./-components/router-devtools";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		component: () => (
			<>
				<div className='w-screen'>
					<nav className='flex justify-center items-center sticky p-2 gap-4 bg-sky-500 text-white'>
						<Link to='/' className='[&.active]:font-bold'>
							Home
						</Link>{" "}
						<Link to='/about' className='[&.active]:font-bold'>
							About
						</Link>
						<Link to='/users' className='[&.active]:font-bold'>
							Users
						</Link>
					</nav>{" "}
				</div>
				<Outlet />
				<React.Suspense fallback={null}>
					<TanStackRouterDevtools />
				</React.Suspense>
			</>
		),
	}
);
