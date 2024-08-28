import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { IUsers } from "../../types";

const getUser = async (userId: string): Promise<IUsers> => {
  return await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  ).then((resp) => {
    return resp.ok ? resp.json() : Promise.reject(resp.statusText);
  });
};

const userOptions = (userId: string) =>
  queryOptions({
    queryKey: ["userId", userId],
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
    <div className="bg-background flex h-[200px] w-full items-center justify-center">
      <div className="text-center">
        <Loader2 className="text-primary mx-auto h-8 w-8 animate-spin" />
        <p className="text-muted-foreground mt-2 text-sm">Loading...</p>
      </div>
    </div>
  ),
  notFoundComponent: NotFoundComp,
});

function NotFoundComp() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex h-[50%] w-screen flex-col items-center justify-start bg-gradient-to-r from-slate-500 to-slate-400 text-5xl font-bold text-white">
        <h1 className="text-3xl font-bold">Data failed to fetch.</h1>
      </section>
    </div>
  );
}

function User() {
  const getUserOptions = Route.useRouteContext({
    select: (s) => s.getUserOptions,
  });
  const userQuery = useSuspenseQuery(getUserOptions);

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="flex h-[360px] w-screen flex-col items-center justify-end bg-gradient-to-r from-slate-500 to-slate-400 text-5xl font-bold text-white">
        <h1 className="text-3xl font-bold">{userQuery.data?.name}</h1>

        <p>test</p>
      </span>
    </div>
  );
}
