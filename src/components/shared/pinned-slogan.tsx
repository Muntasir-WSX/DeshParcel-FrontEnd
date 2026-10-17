import { Box } from "lucide-react";

export default function PinnedSlogan() {
  return (
    <div className="pointer-events-none fixed right-4 top-[5.5rem] z-40 inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-r from-[#0b132b]/95 to-[#070b19]/90 px-4 py-2 text-[10px] font-bold tracking-wide text-white shadow-xl backdrop-blur-md sm:right-6 sm:px-5 sm:text-xs">
      <Box className="h-3.5 w-3.5 text-red-700 sm:h-4 sm:w-4" />
      <span>Book Your Delivery Now</span>
    </div>
  );
}
