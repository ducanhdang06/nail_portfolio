export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] py-12 px-4 flex justify-center items-center bg-gradient-to-b from-blush-light/50 to-white">
      <div className="w-full max-w-md bg-white rounded-xl shadow-soft p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-lilac/20 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-peach/20 rounded-full"></div>

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
