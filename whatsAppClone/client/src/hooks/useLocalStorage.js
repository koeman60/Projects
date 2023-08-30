import { useEffect, useState } from "react";

const PREFIX = "whatsapp-clone-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });
  useEffect(() => {
    value
      ? localStorage.setItem(prefixedKey, JSON.stringify(value))
      : localStorage.setItem(prefixedKey, 0);
  }, [value, prefixedKey]);
  return [value, setValue];
}
