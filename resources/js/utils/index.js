export const keyMirror = obj => {
  const ret = {};
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    ret[key] = key;
  }
  return ret;
};
