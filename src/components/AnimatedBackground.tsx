const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Slow-moving radial gradient orbs */}
      <div
        className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, hsl(0 0% 60%) 0%, transparent 70%)",
          animation: "drift-1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, hsl(0 0% 75%) 0%, transparent 70%)",
          animation: "drift-2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, hsl(0 0% 50%) 0%, transparent 70%)",
          animation: "drift-3 18s ease-in-out infinite",
        }}
      />

      {/* Fine grain noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
