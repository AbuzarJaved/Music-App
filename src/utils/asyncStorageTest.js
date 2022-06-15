import AsyncStorage from '@react-native-async-storage/async-storage';


export default {
    get:  (key) => {
         return AsyncStorage.getItem(key).then((value) => {
           return JSON.parse(value);
         });
    }
}