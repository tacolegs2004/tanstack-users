import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import React from "react";
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
      `https://jsonplaceholder.typicode.com/users?username_like=${name}`,
    ).then((res) => res.json())) as IUsers[];

    if (users.length === 0) {
      throw notFound();
    }

    return {
      users,
    };
  },
  pendingComponent: () => (
    <div className="grid place-items-center">
      <p>Loading...</p>
    </div>
  ),
  notFoundComponent: () => "User not found",
});

function Users() {
  const name = Route.useSearch({
    select: (s) => s.name || "",
  });
  const users = Route.useLoaderData({ select: (s) => s.users });
  const navigate = Route.useNavigate();

  const fetchUsers = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = evt.currentTarget.username.value || "";

    navigate({ search: (s) => ({ ...s, name: username }) });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <form onSubmit={fetchUsers}>
        <input
          className="h-12 rounded-lg border-2 border-gray-100 bg-transparent p-4 text-center text-gray-700"
          type="text"
          placeholder="Find users"
          name="username"
          autoFocus
          defaultValue={name}
        />
      </form>

      <h1>Users</h1>
      <ul className="grid gap-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-2 rounded-lg bg-[#2fcfaf] p-4 text-center text-slate-200"
          >
            <Link
              to={`/users/$userId`}
              params={{ userId: user.id }}
              className="flex items-center gap-2"
            >
              <h2 className="font-semibold">{user.name}</h2>
              <b>@{user.username}</b>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
