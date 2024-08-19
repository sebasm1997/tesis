import {LogBox} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import Toast from "react-native-toast-message"
import { AppNavegetion } from "./src/navegation/AppNavegetion";
import {ApolloWrapper}  from "./src/utils/apollo-provider";
import "react-native-get-random-values";

LogBox.ignoreAllLogs();
export default function App() {
  return (
    <>
    <ApolloWrapper>
    <NavigationContainer>
      <AppNavegetion/>
    </NavigationContainer>
    <Toast/>
    </ApolloWrapper>

    </>
  )

}
