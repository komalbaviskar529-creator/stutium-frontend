export const GRADIENTS = [
  "from-[#f59e0b] to-[#ef4444]",
  "from-[#10b981] to-[#0d9488]",
  "from-[#ec4899] to-[#8b5cf6]",
  "from-[#3b82f6] to-[#6366f1]",
  "from-[#f97316] to-[#e11d48]",
  "from-[#14b8a6] to-[#0ea5e9]",
];

export const gradientAt = (i: number) => GRADIENTS[i % GRADIENTS.length];