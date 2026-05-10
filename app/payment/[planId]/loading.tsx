export default function PaymentLoading() {
  return (
    <div className="py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <div className="w-64 h-12 bg-white/5 rounded-lg mx-auto skeleton-shimmer" />
        <div className="w-96 h-6 bg-white/5 rounded-lg mx-auto skeleton-shimmer" />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="h-64 bg-white/5 rounded-[2rem] skeleton-shimmer" />
          <div className="h-48 bg-white/5 rounded-[2rem] skeleton-shimmer" />
        </div>
        <div className="bg-white/5 rounded-[2rem] h-[600px] skeleton-shimmer" />
      </div>
    </div>
  );
}
