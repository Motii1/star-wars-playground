export const stripUndefinedProperties = (obj: Record<string, unknown>) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
};
