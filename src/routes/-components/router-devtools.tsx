import React from "react";

export default import.meta.env.DEV
	? React.lazy(() =>
			import("@tanstack/router-devtools").then((res) => ({
				default: res.TanStackRouterDevtools,
			}))
		)
	: () => null;
