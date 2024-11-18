function removeObjectKey<T, K extends keyof T>(
  obj: T,
  key: K | K[],
): Omit<T, K> {
  const keysToRemove = Array.isArray(key) ? key : [key];

  return Object.keys(obj).reduce((acc, currentKey) => {
    if (!keysToRemove.includes(currentKey as K)) {
      acc[currentKey] = obj[currentKey];
    }
    return acc;
  }, {} as Omit<T, K>);
}

export default removeObjectKey;
