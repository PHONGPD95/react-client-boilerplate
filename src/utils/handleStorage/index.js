export function readStorage(key) {
  try {
    const value = localStorage.getItem(key);

    return JSON.parse(value);
  } catch (err) {
    removeStorage(key);
    return '';
  }
}

export function writeStorage(key) {
  return function (value) {
    const stringifiedValue = JSON.stringify(value);

    localStorage.setItem(key, stringifiedValue);
  };
}

export function removeStorage(key) {
  localStorage.removeItem(key);
}

export function clearStorage() {
  localStorage.clear();
}
