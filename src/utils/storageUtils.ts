// src/utils/storageUtils.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save an item in AsyncStorage.
 * @param key - The key under which the item should be saved.
 * @param value - The value to save. It will be stringified.
 */
export const setStorage = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`Data saved with key "${key}":`, jsonValue);
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
  }
};

/**
 * Retrieve an item from AsyncStorage.
 * @param key - The key of the item to retrieve.
 * @returns The retrieved value or null if not found.
 */
export const getStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log(`Data retrieved with key "${key}":`, jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
    return null;
  }
};

/**
 * Remove an item from AsyncStorage.
 * @param key - The key of the item to remove.
 */
export const removeStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data removed with key "${key}"`);
  } catch (error) {
    console.error('Error removing data from AsyncStorage:', error);
  }
};
