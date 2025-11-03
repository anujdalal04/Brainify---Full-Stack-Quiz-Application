export function Loader() {
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-2 text-sm">
      <span className="size-2 animate-pulse rounded-full bg-primary" />
      <span className="size-2 animate-pulse rounded-full bg-primary" />
      <span className="size-2 animate-pulse rounded-full bg-primary" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
