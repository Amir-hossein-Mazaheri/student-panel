export default function convertHardness(hardnessLevel) {
  let hardness;
  switch (hardnessLevel) {
    case 1:
      hardness = "آسان";
      break;
    case 2:
      hardness = "متوسط";
      break;
    case 3:
      hardness = "سخت";
      break;
    default:
      hardness = "نامشخص";
      break;
  }

  return hardness;
}
