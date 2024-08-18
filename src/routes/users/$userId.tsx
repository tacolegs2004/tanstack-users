import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { IUsers } from "../../types";

const getUser = async (userId: string): Promise<IUsers> => {
	return await fetch(
		`https://jsonplaceholder.typicode.com/users/${userId}`
	).then((resp) => {
		return resp.ok ? resp.json() : Promise.reject(resp.statusText);
	});
};

const userOptions = (userId: string) =>
	queryOptions({
		queryKey: ["users", userId],
		queryFn: () => getUser(userId),
	});

export const Route = createFileRoute("/users/$userId")({
	component: User,
	beforeLoad: ({ params }) => {
		return {
			getUserOptions: userOptions(params.userId),
		};
	},
	loader: async ({ context }) => {
		try {
			await context.queryClient.ensureQueryData(context.getUserOptions);
		} catch (_) {
			throw notFound();
		}
	},
	pendingComponent: () => (
		<div className='grid place-items-center'>
			<p>Customize this /users/$userId loading...</p>
		</div>
	),
	notFoundComponent: NotFoundComp,
});

function NotFoundComp() {
	const id = Route.useParams({ select: (s) => s.userId });

	return `User with id ${id} not found, you can implement your own 404 page or UI to handle resetting this page`;
}

function User() {
	const getUserOptions = Route.useRouteContext({
		select: (s) => s.getUserOptions,
	});
	const userQuery = useSuspenseQuery(getUserOptions);

	return (
		<div className='flex flex-col items-center justify-center'>
			<span className='flex flex-col justify-start items-center w-screen h-[50%] bg-gradient-to-r  from-slate-500 to-slate-400 text-white text-5xl font-bold'>
				<h1 className='text-3xl font-bold'>{userQuery.data?.name}</h1>
			</span>
		</div>
	);
}
