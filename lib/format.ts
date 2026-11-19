 export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const rupeesExact = (n: number) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;