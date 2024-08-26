import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: () => (
    <div>
      <section className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-16 text-violet-600 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Test</h1>

        <p className="mt-6 text-xl">This is a test page.</p>
      </section>
    </div>
  ),
});
