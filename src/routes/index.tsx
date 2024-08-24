import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center text-5xl font-bold text-slate-200">
      <h1>Welcome to the React Router example</h1>

      <h1>
        This site is being used to test Tanstack Qyuery with Tanstack Router.
      </h1>
    </div>
  );
}
