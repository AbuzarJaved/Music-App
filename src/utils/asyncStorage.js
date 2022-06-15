import AsyncStorage from '@react-native-async-storage/async-storage';

const saveDataToStorage = async (name, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(name, jsonValue);
  } catch (e) {
    console.log('Error saving data', e);
  }
  return console.log('Done saving ur data to storage');
};
const loadDataFromStorage = async (val) => {
  try {
    const data = await AsyncStorage.getItem(val);
    const parsedData = data != null ? JSON.parse(data) : null;
    // console.log('Loaded Data from store');
    // console.log(parsedData);
    return parsedData;
  } catch (e) {
    console.log('Error loading data', e);
  }
};
const clearDataFromStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('Error clearing data', e);
  }
};
const removeDataFromStorage = async (value) => {
  try {
    if (value) {
      await AsyncStorage.removeItem(value);
    }
  } catch (e) {
    console.log('Error removing data', e);
  }
};

export {
  saveDataToStorage,
  loadDataFromStorage,
  clearDataFromStorage,
  removeDataFromStorage,
};
