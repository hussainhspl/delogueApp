import AsyncStorage from "@react-native-community/async-storage";

const clearAsyncStorage = async () => {
  AsyncStorage.clear();
  console.log("async clear");
};
export default clearAsyncStorage;