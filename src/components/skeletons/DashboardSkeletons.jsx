import { SkeletonBlock, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonTableRow, SkeletonCard } from "./Primitives"
import { cn } from "@/lib/utils"

export const DashboardHeaderSkeleton = () => (
  <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
    <div className="flex items-center gap-4">
      <SkeletonBlock width="40px" height="40px" borderRadius="10px" />
      <SkeletonText width="120px" height="1.5rem" />
    </div>
    <div className="flex items-center gap-4">
      <SkeletonBlock width="100px" height="32px" className="hidden sm:block" />
      <SkeletonAvatar size="36px" />
    </div>
  </header>
)

export const SidebarSkeleton = () => (
  <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r bg-background px-4 py-6">
    <div className="flex items-center gap-3 px-2 mb-8">
      <SkeletonBlock width="32px" height="32px" />
      <SkeletonText width="100px" height="1.5rem" />
    </div>
    <div className="flex-1 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3 px-2 py-2">
          <SkeletonBlock width="20px" height="20px" />
          <SkeletonText width="60%" height="1rem" />
        </div>
      ))}
    </div>
    <div className="mt-auto px-2 pt-4 border-t">
      <div className="flex items-center gap-3 py-2">
        <SkeletonAvatar size="32px" />
        <div className="space-y-1">
          <SkeletonText width="80px" height="0.75rem" />
          <SkeletonText width="100px" height="0.75rem" />
        </div>
      </div>
    </div>
  </aside>
)

export const StatsCardSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {[1, 2, 3, 4].map((i) => (
      <SkeletonCard key={i} className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <SkeletonText width="80px" height="1rem" />
          <SkeletonBlock width="16px" height="16px" />
        </div>
        <div className="space-y-2 mt-2">
          <SkeletonText width="100px" height="2rem" />
          <SkeletonText width="120px" height="0.75rem" />
        </div>
      </SkeletonCard>
    ))}
  </div>
)

export const TableSkeleton = ({ rows = 5, columns = 5 }) => (
  <div className="w-full space-y-4">
    <div className="flex items-center justify-between">
      <SkeletonBlock width="200px" height="2.5rem" />
      <SkeletonButton width="100px" />
    </div>
    <div className="rounded-md border border-muted/20 bg-card">
      <div className="bg-muted/5 flex items-center space-x-4 py-3 px-4 border-b">
        {Array.from({ length: columns }).map((_, i) => (
          <SkeletonBlock key={i} height="1rem" className="flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonTableRow key={i} columns={columns} className="px-4" />
      ))}
    </div>
  </div>
)

export const FormSkeleton = () => (
  <div className="space-y-6 max-w-2xl">
    <div className="space-y-2">
      <SkeletonText width="40%" height="1.5rem" />
      <SkeletonText width="60%" height="1rem" />
    </div>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="space-y-2">
        <SkeletonText width="100px" height="0.875rem" />
        <SkeletonBlock height="2.75rem" />
      </div>
    ))}
    <div className="pt-4 flex gap-4">
      <SkeletonButton width="120px" />
      <SkeletonButton width="120px" className="opacity-50" />
    </div>
  </div>
)

export const AnalyticsSkeleton = () => (
  <div className="space-y-8">
    <StatsCardSkeleton />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <SkeletonCard className="md:col-span-4 h-[400px]">
        <div className="space-y-2 mb-4">
          <SkeletonText width="150px" height="1.25rem" />
          <SkeletonText width="250px" height="1rem" />
        </div>
        <SkeletonBlock height="300px" className="mt-auto" />
      </SkeletonCard>
      <SkeletonCard className="md:col-span-3 h-[400px]">
          <div className="space-y-2 mb-4">
          <SkeletonText width="150px" height="1.25rem" />
          <SkeletonText width="100px" height="1rem" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <SkeletonAvatar size="40px" />
              <div className="flex-1 space-y-1">
                <SkeletonText width="120px" height="0.875rem" />
                <SkeletonText width="80px" height="0.75rem" />
              </div>
              <SkeletonText width="40px" height="1rem" />
            </div>
          ))}
        </div>
      </SkeletonCard>
    </div>
  </div>
)
