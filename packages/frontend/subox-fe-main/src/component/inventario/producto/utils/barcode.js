export function isValidEAN13(code = "") {
  const s = String(code).replace(/\D/g, "");
  if (s.length !== 13) return false;
  const digits = s.split("").map(Number);
  const check = digits.pop();
  const sum = digits.reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 1 : 3), 0);
  const calc = (10 - (sum % 10)) % 10;
  return calc === check;
}
