export default function FormatPrice(
  price: number,
  currency: "USD" | "EUR" | "MAD" = "USD" 
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}
