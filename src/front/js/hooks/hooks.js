import React, { useEffect, useState } from "react";

export function useLocalStorage(key, initvalue) {
  const [value, setValue] = useState(() => {
    return getLocalStorage(key, initvalue);
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
}

function getLocalStorage(key, initValue) {
  const storeLocalValue = localStorage.getItem(key);
  if (storeLocalValue) return storeLocalValue;
  return initValue;
}
