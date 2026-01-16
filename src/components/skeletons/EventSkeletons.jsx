import { SkeletonBlock, SkeletonText, SkeletonButton, SkeletonCard } from "./Primitives"

export const EventCardSkeleton = () => (
  <SkeletonCard className="overflow-hidden p-0 border-0 bg-transparent flex flex-col h-full">
    <SkeletonBlock height="240px" className="rounded-2xl" />
    <div className="py-4 space-y-3">
      <SkeletonText width="120px" height="0.75rem" />
      <SkeletonText width="100%" height="1.5rem" />
      <div className="flex gap-2">
         <SkeletonBlock width="80px" height="1.5rem" borderRadius="999px" />
         <SkeletonBlock width="60px" height="1.5rem" borderRadius="999px" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <SkeletonText width="100px" height="1.25rem" />
        <SkeletonButton width="100px" height="2.25rem" borderRadius="999px" />
      </div>
    </div>
  </SkeletonCard>
)

export const EventDetailsSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <SkeletonBlock height="450px" borderRadius="1.5rem" />
        <div className="space-y-4">
          <SkeletonText width="60%" height="2.5rem" />
          <div className="flex gap-4">
             {[1, 2, 3].map(i => <SkeletonBlock key={i} width="120px" height="2rem" borderRadius="999px" />)}
          </div>
          <SkeletonText lines={6} />
        </div>
      </div>
      <div className="space-y-6">
        <SkeletonCard className="p-6">
          <SkeletonText width="80px" height="1.25rem" />
          <SkeletonBlock height="3.5rem" className="mt-4" />
          <div className="space-y-3 mt-6">
            <div className="flex gap-3">
              <SkeletonBlock width="24px" height="24px" />
              <SkeletonText width="150px" />
            </div>
            <div className="flex gap-3">
              <SkeletonBlock width="24px" height="24px" />
              <SkeletonText width="150px" />
            </div>
          </div>
          <SkeletonButton className="w-full mt-8" height="3rem" />
        </SkeletonCard>
        <SkeletonCard className="p-6">
          <SkeletonText width="120px" />
          <div className="flex gap-4 items-center mt-4">
            <SkeletonBlock width="40px" height="40px" borderRadius="12px" />
            <SkeletonBlock width="40px" height="40px" borderRadius="12px" />
            <SkeletonBlock width="40px" height="40px" borderRadius="12px" />
          </div>
        </SkeletonCard>
      </div>
    </div>
  </div>
)

export const TicketListSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <SkeletonCard key={i} className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="space-y-2">
          <SkeletonText width="200px" height="1.25rem" />
          <SkeletonText width="300px" height="0.875rem" />
        </div>
        <div className="flex items-center gap-6 w-full md:w-auto">
          <SkeletonText width="80px" height="1.5rem" />
          <SkeletonButton width="100px" />
        </div>
      </SkeletonCard>
    ))}
  </div>
)
