export const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});


export const formatPrice = (price?: number | null) =>
  typeof price === "number" &&
  Number.isFinite(price) &&
  price >= 0
    ? priceFormatter.format(price)
    : null;




export const normalizeLabel = (label?: string | null) => {
  const normalized = label?.trim().toLowerCase();

  if (!normalized) return null;

  const labels: Record<string, string> = {
    sale: "Sale",
    offer: "Sale",
    "best selling": "Best Selling",
    "best-seller": "Best Selling",
    bestseller: "Best Selling",
    trend: "Trending",
    trending: "Trending",
  };

  return labels[normalized] ?? null;
};



export const getDiscount = (
  price?: number | null,
  originalPrice?: number | null,
) => {
  if (
    typeof price !== "number" ||
    typeof originalPrice !== "number" ||
    !Number.isFinite(price) ||
    !Number.isFinite(originalPrice) ||
    price < 0 ||
    originalPrice <= price
  ) {
    return 0;
  }

  return Math.round(((originalPrice - price) / originalPrice) * 100);
};