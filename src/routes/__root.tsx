import React from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

const TanStackRouterDevtools = React.lazy(
	() => import("./-components/router-devtools")
);

export const Route = createRootRoute({
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
});
