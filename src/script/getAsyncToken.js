import AsyncStorage from "@react-native-community/async-storage";

const GetAsyncToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@token");
    if (token) return token;
  } catch (error) {
    if (error) {
      console.log("async token absent", error);
    }
  }
};
export default GetAsyncToken;
