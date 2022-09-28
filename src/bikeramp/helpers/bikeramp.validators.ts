export function validateCreateBody(
  start_address: string,
  destination_address: string,
  date: string,
  price: number,
) {
  if (!price) return false;
  if (!start_address) return false;
  if (!destination_address) return false;
  if (!date || date == '0') return false;
  return true;
}
