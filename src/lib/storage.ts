const useSessionStorage = (key) => {
  const sessionStorage = window.sessionStorage;
  return {
    get: () => sessionStorage.getItem(key),
    set: (value) => sessionStorage.setItem(key, value),
  };
};

const useLocalStorage = (key) => {
  const localStorage = window.localStorage;
  return {
    get: () => localStorage.getItem(key),
    set: (value) => localStorage.setItem(key, value),
  };
};

export { useSessionStorage, useLocalStorage };
