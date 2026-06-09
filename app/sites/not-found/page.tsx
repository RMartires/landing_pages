export default function SiteNotFound() {
  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-medium text-zinc-500">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
        Landing page not found
      </h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        This subdomain is not registered yet. Add it to the landing page registry
        to make it live.
      </p>
    </main>
  );
}
