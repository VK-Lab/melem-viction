import { parseJSON } from './parser';

export const readValue = <T>(key: string, initialValue = '') => {
  // Prevent build error "window is undefined" but keeps working
  if (typeof window === 'undefined') {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? (parseJSON(item) as T) : initialValue;
  } catch (error) {
    console.warn(`Error reading localStorage key “${key}”:`, error);
    return initialValue;
  }
};

export const setValue = <T>(key: string, value: T) => {
  // Prevent build error "window is undefined" but keeps working
  if (typeof window === 'undefined') {
    console.warn(
      `Tried setting localStorage key “${key}” even though environment is not a client`
    );
  }

  try {
    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(value));

    // Save state
    // We dispatch a custom event so every useLocalStorage hook are notified
    window.dispatchEvent(new Event('local-storage'));
  } catch (error) {
    console.warn(`Error setting localStorage key “${key}”:`, error);
  }
};
