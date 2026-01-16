import { SkeletonBlock, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTableRow } from "./Primitives"

export const ProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-8 py-8">
    <div className="flex flex-col md:flex-row items-center gap-8 px-4">
      <SkeletonAvatar size="120px" />
      <div className="flex-1 space-y-3 text-center md:text-left">
        <SkeletonText width="250px" height="2rem" className="mx-auto md:mx-0" />
        <SkeletonText width="180px" height="1rem" className="mx-auto md:mx-0" />
        <div className="flex gap-4 justify-center md:justify-start pt-2">
          <SkeletonButton width="120px" height="2.25rem" />
          <SkeletonButton width="120px" height="2.25rem" className="opacity-50" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="space-y-2">
          <SkeletonText width="100px" height="0.875rem" />
          <SkeletonBlock height="2.75rem" />
        </div>
      ))}
    </div>
  </div>
)

export const WalletSkeleton = () => (
  <div className="space-y-6">
    <SkeletonCard className="bg-primary/5 border-primary/20 p-8 text-center space-y-4">
      <SkeletonText width="120px" height="1rem" className="mx-auto" />
      <SkeletonText width="200px" height="3rem" className="mx-auto" />
      <div className="flex justify-center gap-4 pt-4">
        <SkeletonButton width="140px" height="3rem" />
        <SkeletonButton width="140px" height="3rem" className="opacity-50" />
      </div>
    </SkeletonCard>
    <div className="space-y-4">
      <SkeletonText width="180px" height="1.25rem" />
      <div className="rounded-xl border border-muted/20 overflow-hidden">
        {[1, 2, 3, 4, 5].map(i => (
           <SkeletonTableRow key={i} columns={4} />
        ))}
      </div>
    </div>
  </div>
)
