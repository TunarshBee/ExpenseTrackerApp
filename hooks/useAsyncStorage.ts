import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const loadValue = async () => {
      const storedValue = await AsyncStorage.getItem(key);
      setValue(storedValue);
    };

    loadValue();
  }, [key]);

  const saveValue = async (newValue: string) => {
    await AsyncStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, saveValue] as const;
};
