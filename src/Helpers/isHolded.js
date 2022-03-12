export default function isHolded(ISOTimeString) {
  const now = new Date().toLocaleString(undefined);
  const passedTime = new Date(ISOTimeString).toLocaleString(undefined);

  if (now > passedTime) {
    return true;
  }

  return false;
}
