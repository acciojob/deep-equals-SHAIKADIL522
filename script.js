function deepEquals(a, b) {
  if (a === b) return true;                       // same primitive, null, undefined

  if (typeof a !== typeof b) return false;        // different types

  if (typeof a === "number") {
    return Number.isNaN(a) && Number.isNaN(b);    // NaN only equals NaN
  }

  // strings/booleans/undefined that were not === , or null vs object
  if (typeof a !== "object" || a === null || b === null) return false;

  const aIsArr = Array.isArray(a);
  const bIsArr = Array.isArray(b);
  if (aIsArr !== bIsArr) return false;            // array vs object

  if (aIsArr) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEquals(a[key], b[key])) return false;
  }
  return true;
}

module.exports = deepEquals;