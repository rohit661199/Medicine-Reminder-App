import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalStorage = async (key, value) => {
  try {
    // Convert object to JSON string before storing
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error setting local storage:', error);
  }
};

export const getLocalStorage = async (key) => {
  try {
    const result = await AsyncStorage.getItem(key);
    // Return null if no data found
    if (result === null) {
      return null;
    }
    // Parse JSON string back to object
    return JSON.parse(result);
  } catch (error) {
    console.error('Error getting local storage:', error);
    return null;
  }
};

export const removeLocalStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing local storage:', error);
  }
};

export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};