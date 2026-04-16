export function CardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-pulse">
      <div className="h-52 skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-5 skeleton w-3/4 rounded" />
        <div className="h-4 skeleton w-1/2 rounded" />
        <div className="flex gap-2">
          <div className="h-6 w-16 skeleton rounded-full" />
          <div className="h-6 w-20 skeleton rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 w-24 skeleton rounded" />
          <div className="h-8 w-8 skeleton rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-[400px] skeleton rounded-2xl" />
      <div className="space-y-4">
        <div className="h-8 skeleton w-2/3 rounded" />
        <div className="h-4 skeleton w-1/3 rounded" />
        <div className="space-y-2">
          <div className="h-4 skeleton rounded" />
          <div className="h-4 skeleton rounded" />
          <div className="h-4 skeleton w-3/4 rounded" />
        </div>
      </div>
    </div>
  );
}

export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-4 skeleton rounded ${i === lines - 1 ? 'w-2/3' : ''}`} />
      ))}
    </div>
  );
}
