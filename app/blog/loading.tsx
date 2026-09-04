export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-webBlue mb-4"></div>
      <p className="text-webBlue text-lg font-semibold">Loading...</p>
    </div>
  );
}
