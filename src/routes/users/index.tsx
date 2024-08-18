import { createFileRoute, Link } from "@tanstack/react-router";
import React from "react";
import { IUsers } from "../../types";

export const Route = createFileRoute("/users/")({
  component: () => <Users />,
});

function Users() {
  const [name, setName] = React.useState("");
  const [users, setUsers] = React.useState<IUsers[]>([]);

  const fetchUsers = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/users?username_like=${name}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4">
      <h1>Users</h1>

      <form onSubmit={fetchUsers}>
        <input
          type="text"
          placeholder="Find users"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      <ul>
        {users.map((user) => (
          <Link to={`/users/$userId`} params={{ userId: user.id }}>
            <li key={user.id}>
              <h2>{user.name}</h2>
              <b>@{user.username}</b>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
