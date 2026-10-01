export const CURRENCY_SYMBOL = "৳";
export const CURRENCY_LOCALE = "en-IN";

export function formatPrice(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString(CURRENCY_LOCALE, { maximumFractionDigits: 2 })}`;
}
