import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export const SkeletonBlock = ({ className, width, height, borderRadius, ...props }) => {
  return (
    <Skeleton
      className={cn("bg-muted/60", className)}
      style={{
        width: width || "100%",
        height: height || "100%",
        borderRadius: borderRadius || "0.5rem",
      }}
      {...props}
    />
  )
}

export const SkeletonText = ({ className, lines = 1, width = "100%", height = "1rem", ...props }) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="bg-muted/60"
          style={{
            width: lines > 1 && i === lines - 1 ? "60%" : width,
            height: height,
          }}
        />
      ))}
    </div>
  )
}

export const SkeletonAvatar = ({ className, size = "3rem", ...props }) => {
  return (
    <Skeleton
      className={cn("rounded-full bg-muted/60 flex-shrink-0", className)}
      style={{ width: size, height: size }}
      {...props}
    />
  )
}

export const SkeletonButton = ({ className, width = "6rem", height = "2.5rem", ...props }) => {
  return (
    <Skeleton
      className={cn("bg-muted/60", className)}
      style={{ width, height, borderRadius: "0.5rem" }}
      {...props}
    />
  )
}

export const SkeletonTableRow = ({ columns = 5, className, ...props }) => {
  return (
    <div className={cn("flex items-center space-x-4 py-4 px-2 border-b border-muted/20", className)} {...props}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1 bg-muted/40" />
      ))}
    </div>
  )
}

export const SkeletonCard = ({ className, children, ...props }) => {
  return (
    <div className={cn("rounded-xl border border-muted/20 bg-card p-4 space-y-4 shadow-sm", className)} {...props}>
      {children || (
        <>
          <SkeletonBlock height="12rem" />
          <div className="space-y-2">
            <SkeletonText height="1.25rem" width="80%" />
            <SkeletonText height="1rem" width="40%" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <SkeletonBlock width="4rem" height="1.5rem" />
            <SkeletonButton width="5rem" height="2rem" />
          </div>
        </>
      )}
    </div>
  )
}
