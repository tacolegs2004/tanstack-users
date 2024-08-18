import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { IUsers } from "../../types";

export const Route = createFileRoute("/users/$userId")({
  component: User,
});

const getUser = async (userId: string): Promise<IUsers> => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((resp) => resp.json())
    .catch((err) => console.error(err));
};

function User() {
  const params = useParams({ from: "/users/$userId" });

  const userQuery = useQuery({
    queryKey: ["userId", params.userId],
    queryFn: () => getUser(params.userId),
  });
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="flex flex-col justify-start items-center w-screen h-[50%] bg-gradient-to-r  from-slate-500 to-slate-400 text-white text-5xl font-bold">
        <h1 className="text-3xl font-bold">{userQuery.data?.name}</h1>
      </span>
    </div>
  );
}
