import * as React from "react";
import { IUsers } from "../types";

export default function Users() {
  const [name, setName] = React.useState("");
  const [users, setUsers] = React.useState<IUsers[]>([]);
  const fetchUsers = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${name}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  return (
    <div>
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
          <li key={user.id}>
            <h2>{user.name}</h2>
            <b>@{user.username}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
