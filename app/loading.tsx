// import { Skeleton } from "@/components/ui/skeleton"

// export default function Loading() {
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="space-y-8">
//         <Skeleton className="h-12 w-1/3 mx-auto" />
//         <Skeleton className="h-6 w-2/3 mx-auto" />
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="space-y-4">
//               <Skeleton className="h-48 w-full" />
//               <Skeleton className="h-6 w-3/4" />
//               <Skeleton className="h-4 w-full" />
//               <Skeleton className="h-10 w-full" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-webBlue mb-4"></div>
      <p className="text-webBlue text-lg font-semibold">Loading...</p>
    </div>
  );
}
