export const cleanObject = <T extends object>(obj: T): Partial<T> => {
  const newObj: Partial<T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === "string" && value.trim() !== "") {
        newObj[key] = value;
      } else if (typeof value === "number" && value !== 0) {
        newObj[key] = value;
      } else if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const cleanedSubObject = cleanObject(value as object);
        if (Object.keys(cleanedSubObject).length > 0) {
          newObj[key] = cleanedSubObject as T[Extract<keyof T, string>];
        }
      }
    }
  }
  return newObj;
};
