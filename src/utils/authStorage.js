import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {

      await AsyncStorage.setItem('access-token', value);
    } catch (e) {
        console.log('error storeData',e)
      // saving error
      
    }
  };

  export const removeData = async (value) => {
    try {
   
      await AsyncStorage.removeItem('access-token');
    } catch (e) {
        console.log('error removeItem',e)
      // saving error
      
    }
  };

  export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('access-token');
      console.log('value',value)
      if (value !== null) {
       return value;
      }
      return null;
    } catch (e) {
        console.log('error Get', e)
        return null;
    }
  };