import React from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { z } from "zod";
import { IUsers } from "../../types";

export const Route = createFileRoute("/users/")({
	component: Users,
	validateSearch: z.object({
		name: z.string().optional(),
	}),
	beforeLoad: ({ search }) => ({ queryName: search.name || "" }),
	loader: async ({ context }) => {
		const name = context.queryName;

		const users = (await fetch(
			`https://jsonplaceholder.typicode.com/users?username_like=${name}`
		).then((res) => res.json())) as IUsers[];

		if (users.length === 0) {
			throw notFound();
		}

		return {
			users,
		};
	},
	pendingComponent: () => (
		<div className='grid place-items-center'>
			<p>Customize this /users loading...</p>
		</div>
	),
	notFoundComponent: () =>
		"Users not found, you can implement your own 404 page or UI to handle resetting this page",
});

function Users() {
	const name = Route.useSearch({ select: (s) => s.name || "" });
	const users = Route.useLoaderData({ select: (s) => s.users });
	const navigate = Route.useNavigate();

	const fetchUsers = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		const username = evt.currentTarget.username.value || "";

		navigate({ search: (s) => ({ ...s, name: username }) });
	};

	return (
		<div className='flex flex-col justify-center items-center gap-4 p-4'>
			<h1>Users</h1>

			<form onSubmit={fetchUsers}>
				<input
					type='text'
					placeholder='Find users'
					name='username'
					defaultValue={name}
				/>
			</form>

			<ul className='grid gap-4'>
				{users.map((user) => (
					<li key={user.id}>
						<Link
							to={`/users/$userId`}
							params={{ userId: user.id }}
							className='flex gap-2 items-center'
						>
							<h2>{user.name}</h2>
							<b>@{user.username}</b>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
